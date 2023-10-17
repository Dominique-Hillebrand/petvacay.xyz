// @ts-nocheck

import { houseById } from "@/app/queries";
import Link from "next/link";

export default async function BookSitter({
  params,
}: {
  params: { id: string };
}) {
  let house = await houseById(params.id);
  return (
    <main>
      <h2 className="text-green-700">You have sent a booking request to:</h2>
      <h3 className="text-green-700">{house.name}</h3>
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
      <p className="mb-10 button-gray w-[100px] text-center">
        {house.status.name}
      </p>
      {/* <Link href={`/pet-owner/book/${house.id}`} className="button-green">
        Contact 
      </Link> */}
      <h4 className="text-orange-700">
        Wait for the confirmation of {house.profiles.first_name}{" "}
        {house.profiles.last_name}
      </h4>
    </main>
  );
}
