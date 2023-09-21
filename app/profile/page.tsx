// @ts-nocheck

import { currentUserProfiles } from "@/app/queries";

export default async function Profile() {
  const userData = await currentUserProfiles();

  const petOrHomeDetails =
    userData[0].role_id == 1 ? (
      <p>You are a pet owner</p>
    ) : userData[0].role_id == 2 ? (
      <p>You are a home owner</p>
    ) : (
      console.log("Error getting current user auth:", error.message)
    );

  return (
    <main>
      <h1>Your Data</h1>
      <p>{userData[0].first_name}</p>
      <p>{userData[0].last_name}</p>
      <p>{userData[0].address}</p>
      <p>{userData[0].role_id}</p>

      {petOrHomeDetails}
    </main>
  );
}
