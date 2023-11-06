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
      <p className="italic">Description:</p>
      <p className="ml-6">{house.description}</p>
      <p className="ml-6">
        {house.m2} m<span className="align-super text-xs">2</span>
      </p>

      {house.profiles && (
        <>
          <p className="italic mt-4">Contact Details:</p>
          <p className="ml-6">
            {house.profiles.first_name} {house.profiles.last_name}
          </p>
          <p className="ml-6">{house.profiles.address}</p>
          <p className="ml-6">{house.profiles.number}</p>
        </>
      )}
      <p className="text-2xl mt-6">price/night: {house.price} €</p>
      <Book houseId={params.id} />
    </main>
  )
}
