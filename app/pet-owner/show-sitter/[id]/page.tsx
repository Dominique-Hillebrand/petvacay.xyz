// @ts-nocheck

import { houseById } from "@/app/queries";

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
      <p>Description:</p>
      <p>{house[0].description}</p>
      {house[0].profiles && (
        <>
          <p>{house[0].profiles.first_name}</p>
          <p>{house[0].profiles.last_name}</p>
          <p>{house[0].profiles.address}</p>
          <p>{house[0].profiles.number}</p>
        </>
      )}
      <p>m2: {house[0].m2}</p>
      <p>price/night: {house[0].price}</p>
      <p>{house[0].status}</p>
    </main>
  );
}
