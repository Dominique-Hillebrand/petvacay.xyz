'use client'

import Link from 'next/link'
import arrow from '@/app/img/arrow.png'
import arrowprev from '@/app/img/arrowprev.png'
import { useState } from 'react'
import Image from 'next/image'

// @ts-nocheck
export default function CardFotos({ allData }: any) {
  return (
    <>
      {/* <h2>
        <i>{sculpture.name} </i>
        by {sculpture.artist}
      </h2>
      <h3>
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? 'Hide' : 'Show'} details
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img src={sculpture.url} alt={sculpture.alt} /> */}

      {allData?.map((house: any) => {
        const [index, setIndex] = useState(0)
        function handleNextClick() {
          setIndex((prevIndex) => (prevIndex + 1) % house.fotos.length)
        }

        function handlePrevClick() {
          setIndex(
            (prevIndex) =>
              (prevIndex - 1 + house.fotos.length) % house.fotos.length
          )
        }
        const isNextDisabled = index === house.fotos.length - 1
        const isPrevDisabled = index === 0
        const profile = house.profiles
        return (
          <div key={house.id} className="">
            <Link href={`/pet-owner/show-sitter/${house.id}`}>
              <section>
                {house.fotos && house.fotos.length > 0 ? (
                  <>
                    {/* {house.profileFotos.map((url, index) => ( */}
                    <div className="w-72 h-72 object-cover p-2 relative border border-gray-300 rounded-3xl">
                      <img
                        key={`profile-${index}`}
                        src={house.fotos[index]}
                        alt={`Profile Image ${index}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          margin: '5px',
                          objectFit: 'contain',
                          verticalAlign: 'bottom',
                        }}
                      />
                    </div>
                    <div className="w-72 bottom-[155px] opacity-25 absolute flex">
                      {index > 0 && (
                        <button
                          onClick={handlePrevClick}
                          disabled={isPrevDisabled}
                        >
                          <Image
                            src={arrowprev}
                            alt="prev-arrow"
                            className="rounded-3xl w-6 h-6"
                          />
                        </button>
                      )}
                      <div className="ml-auto">
                        {index < house.fotos.length - 1 && (
                          <button
                            onClick={handleNextClick}
                            disabled={isNextDisabled}
                          >
                            <Image
                              src={arrow}
                              alt="next-arrow"
                              className="rounded-3xl w-6 h-6"
                            />
                          </button>
                        )}
                      </div>
                    </div>
                    {/* ({index + 1} of {house.fotos.length}) */}
                  </>
                ) : (
                  <div className="w-72 h-72"></div>
                )}
              </section>

              <section className="">
                <p className="text-3xl">{house.name}</p>
                <p className="text-gray-500 truncate ...">
                  {house.description}
                </p>
                <p className="text-gray-500 mb-6">size: {house.m2} m2</p>
                <p className="text-xl mb-8">price/night: {house.price} €</p>
              </section>

              {/* <section>
              {profile && (
                <>
                  <p>
                    {profile.first_name} {profile.last_name}
                  </p>
                  <p>{profile.address}</p>
                  <p>{profile.number}</p>
                </>
              )}
            </section> */}

              {/* <Link
                  href={`/pet-owner/show-sitter/${house.id}`}
                  className="button-gray"
                >
                  Check out Profile
                </Link> */}
            </Link>
          </div>
        )
      })}
    </>
  )
}
