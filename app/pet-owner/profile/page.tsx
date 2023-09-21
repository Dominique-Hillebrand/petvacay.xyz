// @ts-nocheck

import { currentUserProfiles } from "@/app/queries";
import { petDetailsFromCurrentUser } from "@/app/queries";

export default async function ProfilePetOwner() {
  const userData = await currentUserProfiles();
  const petData = await petDetailsFromCurrentUser();

  return (
    <main>
      <h1>Your Data</h1>
      <p>First Name: {userData[0].first_name}</p>
      <p>Last Name: {userData[0].last_name}</p>
      <p>Address: {userData[0].address}</p>
      <h2>Your pets Data</h2>
      <p>Pet Name: {petData[0].name}</p>
      <p>Foto: {petData[0].foto}</p>
      <p>Age: {petData[0].age}</p>
      <p>Description: {petData[0].description}</p>
      <p>Breed: {petData[0].breed}</p>
    </main>
  );
}
