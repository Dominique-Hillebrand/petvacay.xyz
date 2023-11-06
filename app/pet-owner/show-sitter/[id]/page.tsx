// @ts-nocheck

import { houseById } from '@/app/queries'
import Book from './Book'
import ShowPetSitter from '@/app/components/ShowPetSitter'

export default async function ShowSitter({
  params,
}: {
  params: { id: string }
}) {
  let house = await houseById(params.id)
  return (
    <main>
      <p className="text-5xl md:text-7xl mb-4"> {house.name}</p>

      <ShowPetSitter item={house} />

      {/* {house.profileFotos && house.profileFotos.length > 0 && (
        <div className="flex">
          {house.profileFotos.map((url, index) => (
            <img
              key={`profile-${index}`}
              src={url}
              alt={`Profile Image ${index}`}
              style={{ width: '100px', height: '100px', margin: '5px' }}
              className="object-cover"
            />
          ))}
        </div>
      )} */}
      <p className="text-2xl mt-6">price/night: {house.price} €</p>
      <Book houseId={params.id} />
    </main>
  )
}
