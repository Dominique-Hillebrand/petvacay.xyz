// @ts-nocheck

import { allHouses } from "@/app/queries";

export default async function Home() {
  let houses = await allHouses();
  console.log("allhouses", houses);
  let cardHouses = houses?.map((house) => (
    <div key={house.id}>
      <p className="text-xl font-bold">{house.name}</p>
      <p>{house.foto}</p>
      <p>{house.m2}</p>
      <p>{house.description}</p>
      <p>{house.price}</p>
      <p>{house.status}</p>
      <p>Owner Name and Info</p>
    </div>
  ));

  return (
    <main>
      <h1 className="mb-4">Find Pet-Sitters nearby!</h1>
      <p className="mb-4">---show houses and persons --</p>
      <div className="grid grid-cols-5 gap-8">{cardHouses}</div>
    </main>
  );
}
