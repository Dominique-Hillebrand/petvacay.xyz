// @ts-nocheck

import { houseById } from "@/app/queries";
import Link from "next/link";

export default async function BookSitter({
  params,
}: {
  params: { id: string };
}) {
  let house = await houseById(params.id);
  console.log(house, params);
  return (
    <main>
      <h1 className="text-green-700">You have successfully booked</h1>
      <h3 className="text-green-700">{house[0].name}</h3>
      <p>{house[0].foto}</p>
      <p className="italic">Description:</p>
      <p className="ml-6">{house[0].description}</p>
      {house[0].profiles && (
        <>
          <br />
          <p className="italic">Contact Details:</p>
          <p className="ml-6">
            {house[0].profiles.first_name} {house[0].profiles.last_name}
          </p>
          <p className="ml-6">{house[0].profiles.address}</p>
          <p className="ml-6">{house[0].profiles.number}</p>
        </>
      )}
      <br />
      <p>{house[0].m2} m2</p>
      <h4 className="text-green-700">price/night: {house[0].price} €</h4>
      {/* <p className="mb-10 button-gray w-[100px] text-center">
        {house[0].status}
      </p> */}
      {/* <Link href={`/pet-owner/book/${house.id}`} className="button-green">
        Contact 
      </Link> */}
    </main>
  );
}
