// @ts-nocheck

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import ConfirmDenyButton from "./ConfirmDenyButton";
import { listAllFileUrlsFromBucket } from "@/app/queries";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase.auth.getUser();
  const { data: currentUser, error: currentUserError } = await supabase
    .from(`profiles`)
    .select(`*, houses (id)`)
    .eq("id", data.user.id);

  const { data: datesAndPetsData, error: datesAndPetsDataError } =
    await supabase
      .from("requests")
      .select(`*, pets (*)`)
      .eq("house_id", currentUser[0]?.houses[0].id);
  const { data: petOwnerData, error: petOwnerError } = await supabase
    .from(`profiles`)
    .select(`*`)
    .eq("id", datesAndPetsData[0]?.pets.owner_id);

  if (error) throw new Error(error.message);

  function formatDateString(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }

  const startDate = formatDateString(datesAndPetsData[0]?.start);
  const endDate = formatDateString(datesAndPetsData[0]?.end);
  const fotos = await listAllFileUrlsFromBucket("pets", petOwnerData[0]?.id);
  console.log("fotos", fotos[0]);

  return (
    <div>
      {datesAndPetsData?.length > 0 ? (
        <>
          <h1>You have a new booking request</h1>
          <p>
            from {startDate} - {endDate}
          </p>
          {datesAndPetsData && (
            <div className="my-6">
              <p>{datesAndPetsData[0]?.pets.name}</p>
              <p>{datesAndPetsData[0]?.pets.age}</p>
              <p>{datesAndPetsData[0]?.pets.description}</p>
              <p>{datesAndPetsData[0]?.pets.breed}</p>
            </div>
          )}

          {fotos && fotos.length > 0 && (
            <div className="flex">
              {fotos.map((url, index) => (
                <img
                  key={`pet-${index}`}
                  src={url}
                  alt={`Pet Image ${index}`}
                  style={{ width: "100px", height: "100px", margin: "5px" }}
                  className="object-cover"
                />
              ))}
            </div>
          )}

          {petOwnerData && (
            <div>
              <p>Owner:</p>
              <p>
                {petOwnerData[0]?.first_name} {petOwnerData[0]?.last_name}
              </p>
              <p>{petOwnerData[0]?.address}</p>
              <p>{petOwnerData[0]?.number}</p>
            </div>
          )}
          <ConfirmDenyButton requestId={datesAndPetsData[0]?.id} />
        </>
      ) : (
        <p>No new message.</p>
      )}
    </div>
  );
}
