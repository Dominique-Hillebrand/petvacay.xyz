// @ts-nocheck

import CardHouses from "@/components/CardHouses";
import DateCalender from "@/components/DateCalender";

export default async function Home() {
  return (
    <main>
      <h1 className="">Book your Pet-Sitter!</h1>
      <p className="">Select Date:</p>
      {/* <DateCalender /> */}
      <div className="grid grid-cols-4 box-shadow1 rounded-xl">
        <CardHouses />
      </div>
    </main>
  );
}
