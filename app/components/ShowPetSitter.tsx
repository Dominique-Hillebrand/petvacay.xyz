'use client'

import arrow from '@/app/img/arrow.png'
import arrowprev from '@/app/img/arrowprev.png'
import { useState } from 'react'
import Image from 'next/image'

export default function ShowPetSitter({ item }: any) {
  const [index, setIndex] = useState(0)

  function handleNextClick() {
    setIndex((prevIndex) => (prevIndex + 1) % item.fotos.length)
  }

  function handlePrevClick() {
    setIndex(
      (prevIndex) => (prevIndex - 1 + item.fotos.length) % item.fotos.length
    )
  }
  const isNextDisabled = index === item.fotos.length - 1
  const isPrevDisabled = index === 0

  return (
    <>
      {item.fotos && item.fotos.length > 0 ? (
        <div className="relative">
          <div className="w-72 h-72 object-cover relative border border-gray-300">
            <img
              src={item.fotos[index]}
              alt={`Image ${index}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
              className="image-transition"
            />
          </div>
          <div className="w-72 absolute bottom-14 flex justify-between items-center p-2">
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
    </>
  )
}
