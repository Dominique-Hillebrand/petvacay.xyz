// @ts-nocheck

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { listAllFileUrlsFromBucket } from "@/app/queries";

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
      <h1>Reservation History</h1>
      <section>
        {requestDataWithAdditionalInfo.map((item) => (
          <div
            key={item.id}
            className="border-2 border-gray-700 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 p-4 "
          >
            <div className="flex">
              <div className="mr-4">
                {item.ownerFotos.map((url, fotoIndex) => (
                  <img
                    key={`owner-image-${fotoIndex}`}
                    src={url}
                    alt={`owner Image ${fotoIndex}`}
                    style={{
                      width: "100px",
                      height: "100px",
                      margin: "5px",
                    }}
                    className="object-cover flex"
                  />
                ))}
              </div>
              <div>
                {item.houseFotos.map((url, fotoIndex) => (
                  <img
                    key={`house-image-${fotoIndex}`}
                    src={url}
                    alt={`house Image ${fotoIndex}`}
                    style={{
                      width: "100px",
                      height: "100px",
                      margin: "5px",
                    }}
                    className="object-cover flex"
                  />
                ))}
              </div>
            </div>

            <div className="mb-6">
              <p className="text-3xl">{item.house.name}</p>
              <p>{item.house.m2} m2</p>
              {/* <p>{item.house.description}</p> */}
              <p className="italic text-gray-500">Description:</p>
              <p>{item.house.description}</p>
            </div>
            <div className="mb-6">
              <p className="italic text-gray-500">Owner:</p>
              <p>
                {item.owner.first_name} {item.owner.last_name}
              </p>
              <p>{item.owner.address}</p>
              <p>{item.owner.number}</p>
            </div>
            <div>
              <p
                className={`text-${
                  item.status.id === 2 ? "green" : "gray"
                }-500 text-xl`}
              >
                {item.startDate} - {item.endDate}
              </p>
              <p
                className={`text-${
                  item.status.id === 2 ? "green" : "gray"
                }-500 mb-6`}
              >
                {item.house.price} €
              </p>
              {/* <p className="text-green-500 w-24">{item.name}</p> */}
              <p
                className={`w-[100px] ${
                  item.status.id === 2
                    ? "button-green"
                    : item.status.id === 3 || 1
                    ? "button-gray"
                    : ""
                }`}
              >
                {item.status.name}
              </p>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
