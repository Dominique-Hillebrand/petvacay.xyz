// @ts-nocheck

import { currentUserProfiles } from '@/app/queries'
import { houseDetailsFromCurrentUser } from '@/app/queries'
import Avatar from '@/app/components/Avatar'
import FotosHouses from '@/app/components/FotosHouses'

export default async function ProfilePetSitter() {
  const userData = await currentUserProfiles()
  let houseData
  if (userData) {
    houseData = await houseDetailsFromCurrentUser()
  }
  return (
    <main>
      <h1 className="mb-6">Your Profile</h1>
      <div className="grid grid-cols-[240px_1fr] mb-6 ">
        <p>First Name:</p> <p> {userData[0]?.first_name}</p>
        <p>Last Name: </p> <p>{userData[0]?.last_name}</p>
        <p>Address: </p> <p> {userData[0]?.address}</p>
        <p>Tel. Nr.: </p> <p> {userData[0]?.number}</p>
      </div>
      {/* <h4 className="mb-6">House Data</h4> */}
      <div className="grid grid-cols-[240px_1fr] mb-8">
        <p>House Name: </p> <p>{houseData[0]?.name}</p>
        <p>Available space for pet:</p>{' '}
        <p>
          {' '}
          {houseData[0]?.m2} m <span className="align-super text-xs">2</span>
        </p>
        <p>Description:</p> <p> {houseData[0]?.description}</p>
        <p>Price:</p> <p> {houseData[0]?.price} €</p>
      </div>
      <Avatar userId={userData[0]?.id} />
      <FotosHouses userId={userData[0]?.id} />
    </main>
  )
}
