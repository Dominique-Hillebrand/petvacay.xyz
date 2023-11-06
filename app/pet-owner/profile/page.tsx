// @ts-nocheck

import { currentUserProfiles } from '@/app/queries'
import { petDetailsFromCurrentUser } from '@/app/queries'
import FotosPets from '@/app/components/FotosPets'

export default async function ProfilePetOwner() {
  const userData = await currentUserProfiles()
  let petData
  if (userData) {
    petData = await petDetailsFromCurrentUser()
  }

  return (
    <main>
      <h1 className="mb-6">Your Profile</h1>
      <div className="grid grid-cols-[240px_1fr] mb-6">
        <p>First Name:</p> <p> {userData[0].first_name}</p>
        <p>Last Name: </p> <p>{userData[0].last_name}</p>
        <p>Address: </p> <p> {userData[0].address}</p>
        <p>Tel. Nr.: </p> <p> {userData[0].number}</p>
      </div>
      {/* <h4 className="mb-6">Pet Information</h4> */}
      <div className="grid grid-cols-[240px_1fr] mb-8">
        <p>Pet Name: </p> <p>{petData[0].name}</p>
        <p>Pet Age:</p> <p> {petData[0].age} years</p>
        <p>Description:</p> <p> {petData[0].description}</p>
        <p>Breed:</p> <p> {petData[0].breed}</p>
      </div>
      <div className="">
        <FotosPets userId={userData[0]?.id} />
      </div>
    </main>
  )
}