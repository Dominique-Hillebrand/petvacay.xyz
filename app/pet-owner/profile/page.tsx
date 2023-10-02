// @ts-nocheck

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Avatar from "@/components/Avatar";

export const dynamic = "force-dynamic";

export default async function ProfilePetOwner() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  console.log(user?.id);

  let profileData;

  if (user) {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id);
    profileData = { data }.data[0];
  }
  console.log(profileData.first_name);

  let petData;
  if (user) {
    const { data: pet, error } = await supabase
      .from("pets")
      .select("*")
      .eq("owner_id", user.id);
    petData = { pet }.pet[0];
    console.log(petData);
  }

  return (
    <main>
      <h1 className="mb-6">Your Data</h1>
      <div className="grid grid-cols-2 max-w-[300px] mb-6">
        <p>First Name:</p> <p> {profileData.first_name}</p>
        <p>Last Name: </p> <p>{profileData.last_name}</p>
        <p>Address: </p> <p> {profileData.address}</p>
        <p>Tel. Nr.: </p> <p> {profileData.number}</p>
      </div>
      <h2 className="mb-6">Your pets Data</h2>
      <div className="grid grid-cols-2 max-w-[300px]">
        <p>Pet Name: </p> <p>{petData.name}</p>
        <p>Age:</p> <p> {petData.age} years</p>
        <p>Description:</p> <p> {petData.description}</p>
        <p>Breed:</p> <p> {petData.breed}</p>
      </div>
      <Avatar userId={profileData.id} />
    </main>
  );
}
