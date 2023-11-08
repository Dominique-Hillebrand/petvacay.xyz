'use client'

import Link from 'next/link'
import arrow from '@/app/img/arrow.png'
import arrowprev from '@/app/img/arrowprev.png'
import { useState } from 'react'
import Image from 'next/image'

// @ts-nocheck
export default function PetSitterCard({ house }: any) {
  const [index, setIndex] = useState(0)

  function handleNextClick() {
    setIndex((prevIndex) => (prevIndex + 1) % house.fotos.length)
  }

  function handlePrevClick() {
    setIndex(
      (prevIndex) => (prevIndex - 1 + house.fotos.length) % house.fotos.length
    )
  }
  const isNextDisabled = index === house.fotos.length - 1
  const isPrevDisabled = index === 0

  return (
    <div className="">
      <section>
        {house.fotos && house.fotos.length > 0 ? (
          // <div className="relative">
          //   <div className="w-72 h-72 object-cover p-2 relative border border-gray-300 rounded-3xl">
          <div className="relative">
            <div className="w-72 h-72 object-cover relative border border-gray-300">
              <img
                src={house.fotos[index]}
                alt={`Profile Image ${index}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
                className="image-transition"
              />
            </div>
            {/* <div className=""> */}
            <div className="w-72 absolute bottom-0 flex justify-between items-center p-2">
              <button
                onClick={handlePrevClick}
                disabled={isPrevDisabled}
                className="disabled:opacity-0"
              >
                <Image
                  src={arrowprev}
                  alt="prev-arrow"
                  width={24}
                  height={29.5}
                />
              </button>
              <button
                onClick={handleNextClick}
                disabled={isNextDisabled}
                className="disabled:opacity-0"
              >
                <Image src={arrow} alt="next-arrow" width={24} height={29.5} />
              </button>
            </div>
          </div>
        ) : (
          <div className="w-72 h-72"></div>
        )}
      </section>
      <Link href={`/pet-owner/show-sitter/${house.id}`}>
        <section className="p-4">
          <h3 className="text-3xl">{house.name}</h3>
          <p className="text-gray-500 truncate">{house.description}</p>
          <p className="text-gray-500">
            size: {house.m2} m<span className="align-super text-xs">2</span>
          </p>
          <p className="text-xl">price/night: {house.price} €</p>
        </section>
      </Link>
    </div>
  )
}
