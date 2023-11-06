'use client'

import PetSitterCard from './PetSitterCard'

// @ts-nocheck
export default function CardsGallery({ allData }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 rounded-xl">
      {allData?.map((house: any) => (
        <PetSitterCard key={house.id} house={house} />
      ))}
    </div>
  )
}
