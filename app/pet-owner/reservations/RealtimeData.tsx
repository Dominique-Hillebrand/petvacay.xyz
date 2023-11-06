"use client";

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ShowPetSitter from '@/app/components/ShowPetSitter'

export default function RealtimeData({ allData }: any) {
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
      {allData.map((item: any) => (
        <div
          key={item.id}
          // className={` border-2 ${
          //   item.status.id === 2 ? 'border-green-500' : 'border-gray-400'
          // } grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 p-4`}
          className="border border-gray-700 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 md:gap-8 mb-8 p-4 "
        >
          {/* <div className="flex">
            <div className="mr-4">
              {item.fotos.map((url: any, fotoIndex: any) => (
                <img
                  key={`image-${fotoIndex}`}
                  src={url}
                  alt={`Image ${fotoIndex}`}
                  style={{
                    width: '100px',
                    height: '100px',
                    margin: '5px',
                  }}
                  className="object-cover flex"
                />
              ))}
            </div>
          </div> */}
          <ShowPetSitter item={item} />
          <div className="mb-6">
            <p className="text-3xl">{item.house.name}</p>
            <p>
              {item.house.m2} m<span className="align-super text-xs">2</span>
            </p>
            {/* <p>{item.house.description}</p> */}
            <p className="italic text-gray-500 mt-6 md:mt-0">Description:</p>
            <p>{item.house.description}</p>
          </div>
          <div className="mb-6">
            <p className="italic text-gray-500">Owner:</p>
            <p>
              {item.owner.first_name} {item.owner.last_name}
            </p>
            <p>{item.owner.address}</p>
            <p>{item.owner.number}</p>
          </div>
          <div>
            <p
              className={`text-${
                item.status.id === 2 ? 'green' : 'gray'
              }-500 font-medium text-lg mb-4 md:text-xl`}
            >
              {item.startDate} - {item.endDate}
            </p>
            <p
              className={`text-${
                item.status.id === 2 ? 'green' : 'gray'
              }-500 font-medium text-lg md:text-xl mb-6`}
            >
              {item.house.price} €
            </p>
            {/* <p className="text-green-500 w-24">{item.name}</p> */}
            <p
              className={`w-[100px] ${
                item.status.id === 2
                  ? 'status-green'
                  : item.status.id === 3 || 1
                  ? 'status-gray'
                  : ''
              }`}
            >
              {item.status.name}
            </p>
          </div>
        </div>
      ))}
    </>
  )
}
