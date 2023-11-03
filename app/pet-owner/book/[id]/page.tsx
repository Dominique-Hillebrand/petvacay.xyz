// @ts-nocheck

import { houseById } from '@/app/queries'

export default async function BookSitter({
  params,
}: {
  params: { id: string }
}) {
  let house = await houseById(params.id)
  return (
    <main>
      <h2 className="text-4xl md:text-6xl text-green-700">
        You have sent a booking request to:
      </h2>
      <p className="text-2xl md:text-5xl text-green-700">{house.name}</p>
      <p className="italic">Description:</p>
      <p className="ml-6">{house.description}</p>
      {house.profiles && (
        <>
          <br />
          <p className="italic">Contact Details:</p>
          <p className="ml-6">
            {house.profiles.first_name} {house.profiles.last_name}
          </p>
          <p className="ml-6">{house.profiles.address}</p>
          <p className="ml-6">{house.profiles.number}</p>
        </>
      )}
      <br />
      <p>{house.m2} m2</p>
      <p>price/night: {house.price} €</p>
      <p className="text-2xl md:text-4xl text-orange-700">
        Wait for the confirmation of {house.profiles.first_name}{' '}
        {house.profiles.last_name}
      </p>
    </main>
  )
}
