// @ts-nocheck

import { houseById } from "@/app/queries";
import Link from "next/link";


export default async function ShowSitter({
  params,
}: {
  params: { id: string };
}) {
  let house = await houseById(params.id);
  return (
    <main>
      <h1> {house[0].name}</h1>
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
      <p>price/night: {house[0].price} €</p>
      <p className="mb-10 button-gray w-[100px] text-center">
        {house[0].status}
      </p>
      <Link href={`/pet-owner/book/${house[0].id}`} className="button-green">
        Book
      </Link>
    </main>
  );
}
