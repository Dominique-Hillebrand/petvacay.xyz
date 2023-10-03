import { allHouses } from "@/app/queries";
import Link from "next/link";

export default async function CardHouses() {
  let houses = await allHouses();

  return (
    <>
      {houses?.map((house) => {
        const profile = house.profiles;
        return (
          <div key={house.id} className="box-shadow1 rounded-xl p-4">
            <p className="text-2xl">{house.name}</p>
            <p>{house.foto}</p>
            <br />
            <p>Description:</p>
            <p className="h-14">{house.description}</p>
            <p>{house.m2} m2</p>
            <br />
            {profile && (
              <>
                <p>Sitter Details:</p>
                <p>
                  {profile.first_name} {profile.last_name}
                </p>
                <p>{profile.address}</p>
                <p>{profile.number}</p>
              </>
            )}
            <br />
            <p>price/night: {house.price} €</p>
            <p>{house.status}</p>
            <Link
              href={`/pet-owner/show-sitter/${house.id}`}
              className="button-black"
            >
              Check out Profile
            </Link>
          </div>
        );
      })}
    </>
  );
}
