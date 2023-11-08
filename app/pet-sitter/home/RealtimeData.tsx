'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import ConfirmDenyButton from './ConfirmDenyButton'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ShowPetSitter from '@/app/components/ShowPetSitter'

export default function RealtimeData({ allData }: { allData: any }) {
  const supabase = createClientComponentClient()
  const router = useRouter()

  useEffect(() => {
    const channel = supabase
      .channel('realtime status data')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'requests',
        },
        () => {
          router.refresh()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, router])

  return (
    <>
      <section>
        <h2 className="">Reservations</h2>
        {allData.some((item: any) => item.status.id === 1) ? (
          <div>
            <h5 className="text-green-500">You have new booking requests:</h5>
            <p>--hit confirm or deny --</p>
            {allData
              .filter((item: any) => item.status.id === 1)
              .map((item: any) => (
                <div
                  key={item.id}
                  className="border border-gray-700  grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 md:gap-8 mb-8 p-4"
                >
                  {/* <div className="">
                    {item.fotos.map((url: any, fotoIndex: number) => (
                      <img
                        key={`pet-image-${fotoIndex}`}
                        src={url}
                        alt={`Pet Image ${fotoIndex}`}
                        style={{
                          width: '100px',
                          height: '100px',
                          margin: '5px',
                        }}
                        className="object-cover flex"
                      />
                    ))}
                  </div> */}
                  <ShowPetSitter item={item} />
                  <div className="mb-6">
                    <p className="text-3xl">{item.pets.name}</p>
                    <p>{item.pets.age} year/s old</p>
                    <p>{item.pets.breed}</p>
                    <p className="italic text-gray-500 mt-6">Description:</p>
                    <p>{item.pets.description}</p>
                  </div>
                  <div className="mb-6">
                    <p className="italic text-gray-500">Owner:</p>
                    <p>
                      {item.petOwner.first_name} {item.petOwner.last_name}
                    </p>
                    <p>{item.petOwner.address}</p>
                    <p>
                      <span className="italic text-gray-500">Phone: </span>{' '}
                      {item.petOwner.number}
                    </p>
                  </div>
                  <div>
                    <p className="text-green-500 font-medium text-lg md:text-xl mb-4">
                      {item.startDate} - {item.endDate}
                    </p>
                    <p className="mb-6 text-green-500 text-lg md:text-xl">
                      {item.price} €
                    </p>
                    <p className="text-green-500 w-24">{item.name}</p>
                    <ConfirmDenyButton requestId={item.id} />
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <p className="text-gray-500 mb-6">-- No open booking requests. --</p>
        )}
      </section>
      <section>
        {
          allData.some((item: any) => item.status.id !== 1) && (
            <div>
              <h4 className="mt-20 text-2xl md:text-4xl">
                Reservation History:
              </h4>
              {allData
                .filter((item: any) => item.status.id !== 1)
                .map((item: any) => (
                  <div
                    key={item.id}
                    className="border-2 border-gray-700 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-8 p-4 "
                  >
                    {/* <div className="">
                    {item.fotos.map((url: any, fotoIndex: Number) => (
                      <img
                        key={`pet-image-${fotoIndex}`}
                        src={url}
                        alt={`Pet Image ${fotoIndex}`}
                        style={{
                          width: '100px',
                          height: '100px',
                          margin: '5px',
                        }}
                        className="object-cover flex"
                      />
                    ))}
                  </div> */}
                    <ShowPetSitter item={item} />

                    <div className="mb-6">
                      <p
                        className={`text-${
                          item.status.id === 2 ? 'green' : 'gray'
                        }-500 text-3xl`}
                      >
                        {item.pets.name}
                      </p>
                      <p
                        className={`text-${item.status.id === 3 && 'gray'}-500`}
                      >
                        {item.pets.age} year/s
                      </p>
                      <p
                        className={`text-${item.status.id === 3 && 'gray'}-500`}
                      >
                        {item.pets.breed}
                      </p>
                      <p className="italic text-gray-500">Description:</p>
                      <p
                        className={`text-${item.status.id === 3 && 'gray'}-500`}
                      >
                        {item.pets.description}
                      </p>
                    </div>
                    <div className="mb-6">
                      <p className="italic text-gray-500">Owner:</p>
                      <p
                        className={`text-${item.status.id === 3 && 'gray'}-500`}
                      >
                        {item.petOwner.first_name} {item.petOwner.last_name}
                      </p>
                      <p
                        className={`text-${item.status.id === 3 && 'gray'}-500`}
                      >
                        {item.petOwner.address}
                      </p>
                      <p
                        className={`text-${item.status.id === 3 && 'gray'}-500`}
                      >
                        {item.petOwner.number}
                      </p>
                    </div>
                    <div>
                      <p
                        className={`text-${
                          item.status.id === 2 ? 'green' : 'gray'
                        }-500 text-lg md:text-xl`}
                      >
                        {item.startDate} - {item.endDate}
                      </p>
                      <p
                        className={`text-${
                          item.status.id === 2 ? 'green' : 'gray'
                        }-500 mb-6`}
                      >
                        {item.price} €
                      </p>
                      <p className="text-green-500 w-24">{item.name}</p>
                      <p
                        className={`w-[100px] ${
                          item.status.id === 2
                            ? 'status-green'
                            : item.status.id === 3
                            ? 'status-gray'
                            : ''
                        }`}
                      >
                        {item.status.name}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          )
          // : (
          //   <p className="text-gray-900">-- No booking history. --</p>
          // )
        }
      </section>
    </>
  )
}
