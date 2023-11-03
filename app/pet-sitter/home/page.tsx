// @ts-nocheck

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { listAllFileUrlsFromBucket } from '@/app/queries'
import RealtimeData from './RealtimeData'

export default async function Home() {
  const supabase = createServerComponentClient({ cookies })

  const { data, error } = await supabase.auth.getUser()
  if (error) throw new Error(error.message)

  const { data: currentUser, error: currentUserError } = await supabase
    .from(`profiles`)
    .select(`*, houses (*)`)
    .eq('id', data.user.id)
  if (currentUserError) throw new Error(currentUserError.message)

  const { data: datesAndPetsData, error: datesAndPetsDataError } =
    await supabase
      .from('requests')
      .select(`*, pets (*)`)
      .eq('house_id', currentUser[0]?.houses[0].id)
  if (datesAndPetsDataError) throw new Error(datesAndPetsDataError.message)

  function formatDateString(dateString) {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  }
  const consolidatedData = await Promise.all(
    datesAndPetsData.map(async (item) => {
      const { data: petOwnerData, error: petOwnerError } = await supabase
        .from(`profiles`)
        .select(`*`)
        .eq('id', item.pets.owner_id)
      if (petOwnerError) throw new Error(petOwnerError.message)

      const owner = petOwnerData[0]
      const fotos = await listAllFileUrlsFromBucket('pets', owner.id)

      // Fetch the status data for the current request
      const { data: statusData, error: statusError } = await supabase
        .from('status')
        .select('*')
        .eq('id', item.status)
      if (statusError) throw new Error(statusError.message)

      const { data: houseData, error: houseDataError } = await supabase
        .from('houses')
        .select('price')
        .eq('id', item.house_id)
      if (houseDataError) throw new Error(houseDataError.message)

      const startDate = formatDateString(item.start)
      const endDate = formatDateString(item.end)
      return {
        ...item,
        petOwner: owner,
        fotos: fotos,
        status: statusData[0],
        price: houseData[0].price,
        startDate: startDate,
        endDate: endDate,
      }
    })
  )
  return (
    <main>
      <RealtimeData allData={consolidatedData} />
    </main>
  )
}
