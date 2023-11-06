// @ts-nocheck

// import DateCalender from '@/app/components/DateCalender'
import { allHouses } from '@/app/queries'
import { getFotosUrl } from '@/app/queries'
import Link from 'next/link'
import CardsGallery from '@/app/components/CardsGallery'

export default async function Home() {
  const houses = await allHouses()
  const allData = await getFotosUrl(houses)

  return (
    <main>
      <h1 className="text-5xl md:text-7xl">Book your Pet-Sitter!</h1>
      {/* <p className="">Select Date:</p> */}
      {/* <DateCalender /> */}
      <div className="">
        <CardsGallery allData={allData} />
      </div>
    </main>
  )
}
