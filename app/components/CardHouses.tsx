// @ts-nocheck

import { allHouses } from '@/app/queries'
import { getFotosUrl } from '@/app/queries'
import Link from 'next/link'
import CardFotos from './CardFotos'

export default async function CardHouses() {
  const houses = await allHouses()
  const allData = await getFotosUrl(houses)
  return (
    <>
      <CardFotos allData={allData} />
      {/* {allData?.map((house) => {
        const profile = house.profiles
        return (
          <div key={house.id} className="">
            <section className="">
              <p className="text-3xl">{house.name}</p>
              <p className="h-14">{house.description}</p>
              <p className="mb-6">{house.m2} m2</p>
            </section>

            <section>
              {profile && (
                <>
                  <p>
                    {profile.first_name} {profile.last_name}
                  </p>
                  <p>{profile.address}</p>
                  <p>{profile.number}</p>
                </>
              )}
            </section>

            <section>
              {house.houseFotos && house.houseFotos.length > 0 && (
                <div className="flex">
                  {house.houseFotos.map((url, index) => (
                    <img
                      key={`house-${index}`}
                      src={url}
                      alt={`House Image ${index}`}
                      style={{ width: '90px', height: '90px', margin: '5px' }}
                      className="object-cover"
                    />
                  ))}
                </div>
              )}
              {house.profileFotos && house.profileFotos.length > 0 && (
                <div className="flex">
                  {house.profileFotos.map((url, index) => (
                    <img
                      key={`profile-${index}`}
                      src={url}
                      alt={`Profile Image ${index}`}
                      style={{ width: '90px', height: '90px', margin: '5px' }}
                    />
                  ))}
                </div>
              )}
            </section>

            <section>
              <p className="text-xl mb-8">price/night: {house.price} €</p>
              <Link
                href={`/pet-owner/show-sitter/${house.id}`}
                className="button-gray"
              >
                Check out Profile
              </Link>
            </section>
          </div>
        )
      })} */}
    </>
  )
}
