// @ts-nocheck

import CardHouses from "@/components/CardHouses";

export default async function Home() {
  return (
    <main>
      <h1 className="">Find Pet-Sitters nearby!</h1>
      <p className="">---show houses and persons --</p>
      <div className="grid grid-cols-4 box-shadow1 rounded-xl">
        <CardHouses />
      </div>
    </main>
  );
}
