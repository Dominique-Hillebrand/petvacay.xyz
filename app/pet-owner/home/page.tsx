// @ts-nocheck

import CardHouses from '@/app/components/CardHouses'
// import DateCalender from '@/app/components/DateCalender'

export default async function Home() {
  return (
    <main>
      <h1 className="">Book your Pet-Sitter!</h1>
      {/* <p className="">Select Date:</p> */}
      {/* <DateCalender /> */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 box-shadow1 rounded-xl">
        <CardHouses />
      </div>
    </main>
  )
}
