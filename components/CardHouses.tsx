import { allHouses } from "@/app/queries";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function CardHouses() {
  let houses = await allHouses();

  let cardHouses = houses?.map((house) => {
    const profile = house.profiles;

    return (
      <div key={house.id} className="box-shadow1 rounded-md p-4">
        <p>{house.name}</p>
        <p>{house.foto}</p>
        <p>Description:</p>
        <p>{house.description}</p>
        {profile && (
          <>
            <p>{profile.first_name}</p>
            <p>{profile.last_name}</p>
            <p>{profile.address}</p>
            <p>{profile.number}</p>
          </>
        )}
        <p>m2: {house.m2}</p>
        <p>price/night: {house.price}</p>
        <p>{house.status}</p>
        <Link
          href={`/pet-owner/show-sitter/${house.id}`}
          className="button-black"
        >
          Check out Profile
        </Link>
      </div>
    );
  });

  return <>{cardHouses}</>;
}
