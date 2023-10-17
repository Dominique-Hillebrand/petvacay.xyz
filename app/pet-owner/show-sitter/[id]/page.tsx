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
      <h1> {house.name}</h1>

      {house.houseFotos && house.houseFotos.length > 0 && (
        <div className="flex">
          {house.houseFotos.map((url, index) => (
            <img
              key={`house-${index}`}
              src={url}
              alt={`House Image ${index}`}
              style={{ width: "100px", height: "100px", margin: "5px" }}
              className="object-cover"
            />
          ))}
        </div>
      )}
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
      {house.profileFotos && house.profileFotos.length > 0 && (
        <div className="flex">
          {house.profileFotos.map((url, index) => (
            <img
              key={`profile-${index}`}
              src={url}
              alt={`Profile Image ${index}`}
              style={{ width: "100px", height: "100px", margin: "5px" }}
              className="object-cover"
            />
          ))}
        </div>
      )}
      <br />
      <p>{house.m2} m2</p>
      <p>price/night: {house.price} €</p>
      <p className="mb-10 button-gray w-[100px] text-center">{house.status}</p>
      <Link href={`/pet-owner/book/${house.id}`} className="button-green">
        Book
      </Link>
    </main>
  );
}
