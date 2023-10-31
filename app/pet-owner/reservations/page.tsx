// @ts-nocheck

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { listAllFileUrlsFromBucket } from "@/app/queries";
import RealtimeData from "./RealtimeData";

export default async function Reservations() {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase.auth.getUser();
  const { data: pet_id, error: currentUserError } = await supabase
    .from(`pets`)
    .select(`id`)
    .eq("owner_id", data.user.id);

  const { data: requestsData, error: requestsDataError } = await supabase
    .from("requests")
    .select(`*`)
    .eq("pet_id", pet_id[0].id);
  const dataRequests = requestsData;

  const requestDataWithAdditionalInfo = await Promise.all(
    dataRequests.map(async (request) => {
      const houseData = await supabase
        .from("houses")
        .select("*")
        .eq("id", request.house_id);

      const ownerData = await supabase
        .from("profiles")
        .select("*")
        .eq("id", houseData.data[0].owner_id);

      const { data: statusData, error: statusError } = await supabase
        .from("status")
        .select("*")
        .eq("id", request.status);
      const fotosHouse = await listAllFileUrlsFromBucket(
        "houses",
        houseData.data[0].owner_id
      );
      const fotosPerson = await listAllFileUrlsFromBucket(
        "avatars",
        houseData.data[0].owner_id
      );
      const startDate = formatDateString(request.start);
      const endDate = formatDateString(request.end);
      return {
        request_id: request.id,
        startDate: startDate,
        endDate: endDate,
        status: statusData[0],
        house: houseData.data[0],
        houseFotos: fotosHouse,
        owner: ownerData.data[0],
        ownerFotos: fotosPerson,
      };
    })
  );

  if (error) throw new Error(error.message);

  function formatDateString(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }

  return (
    <main>
      <h1 className="text-5xl md:text-7xl">Reservation History</h1>
      <RealtimeData allData={requestDataWithAdditionalInfo} />
    </main>
  );
}
