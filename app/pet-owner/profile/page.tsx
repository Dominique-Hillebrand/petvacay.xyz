// @ts-nocheck

import { currentUserProfiles } from "@/app/queries";
import { petDetailsFromCurrentUser } from "@/app/queries";
import Avatar from "@/components/Avatar";

export default async function ProfilePetOwner() {
  const userData = await currentUserProfiles();
  let petData;
  if (userData) {
    petData = await petDetailsFromCurrentUser();
  }

  return (
    <main>
      <h1 className="mb-6">Your Data</h1>
      <div className="grid grid-cols-2 max-w-[300px] mb-6">
        <p>First Name:</p> <p> {userData[0].first_name}</p>
        <p>Last Name: </p> <p>{userData[0].last_name}</p>
        <p>Address: </p> <p> {userData[0].address}</p>
        <p>Tel. Nr.: </p> <p> {userData[0].number}</p>
      </div>
      <h2 className="mb-6">Your pets Data</h2>
      <div className="grid grid-cols-2 max-w-[300px] mb-8">
        <p>Pet Name: </p> <p>{petData[0].name}</p>
        <p>Age:</p> <p> {petData[0].age} years</p>
        <p>Description:</p> <p> {petData[0].description}</p>
        <p>Breed:</p> <p> {petData[0].breed}</p>
      </div>
      <div className="">
        <Avatar userId={userData[0].id} />
      </div>
    </main>
  );
}