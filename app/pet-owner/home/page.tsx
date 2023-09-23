// @ts-nocheck

import CardHouses from "@/components/CardHouses";

export default async function Home() {
  return (
    <main>
      <h1 className="mb-4">Find Pet-Sitters nearby!</h1>
      <p className="mb-4">---show houses and persons --</p>
      <CardHouses />
    </main>
  );
}
