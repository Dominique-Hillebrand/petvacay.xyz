// @ts-nocheck

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase.auth.getUser();
  const { data: currentUser, error: currentUserError } = await supabase
    .from(`profiles`)
    .select(`*, houses (id)`)
    .eq("id", data.user.id);

  const { data: datesAndPetsData, error: datesAndPetsDataError } =
    await supabase
      .from("dates")
      .select(`*, pets (*)`)
      .eq("house_id", currentUser[0].houses[0].id);

  const { data: petOwnerData, error: petOwnerError } = await supabase
    .from(`profiles`)
    .select(`*`)
    .eq("id", datesAndPetsData[0].pets.owner_id);

  if (error) throw new Error(error.message);

  function formatDateString(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }

  const startDate = formatDateString(datesAndPetsData[0].start);
  const endDate = formatDateString(datesAndPetsData[0].end);
  return (
    <div>
      <h1>You have a new booking request</h1>
      <p>
        from {startDate} - {endDate}
      </p>
      <div className="my-6">
        <p>{datesAndPetsData[0].pets.name}</p>
        <p>{datesAndPetsData[0].pets.age}</p>
        <p>{datesAndPetsData[0].pets.description}</p>
        <p>{datesAndPetsData[0].pets.breed}</p>
      </div>
      <div>
        <p>Owner:</p>
        <p>
          {petOwnerData[0].first_name} {petOwnerData[0].last_name}
        </p>
        <p>{petOwnerData[0].address}</p>
        <p>{petOwnerData[0].number}</p>
      </div>
      <button className="button-green">Confirm!</button>
    </div>
  );
}
