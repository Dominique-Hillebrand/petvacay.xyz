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
    .select(`*, houses (*)`)
    .eq("id", data.user.id);

  const { data: datesAndPetsData, error: datesAndPetsDataError } =
    await supabase
      .from("requests")
      .select(`*, pets (*)`)
      .eq("house_id", currentUser[0]?.houses[0].id);

  if (error) throw new Error(error.message);

  function formatDateString(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }
  const consolidatedData = await Promise.all(
    datesAndPetsData.map(async (item) => {
      const { data: petOwnerData, error: petOwnerError } = await supabase
        .from(`profiles`)
        .select(`*`)
        .eq("id", item.pets.owner_id);

      const owner = petOwnerData[0];
      const fotos = await listAllFileUrlsFromBucket("pets", owner.id);

      // Fetch the status data for the current request
      const { data: statusData, error: statusError } = await supabase
        .from("status")
        .select("*")
        .eq("id", item.status);

      const { data: houseData } = await supabase
        .from("houses")
        .select("price")
        .eq("id", item.house_id);

      const startDate = formatDateString(item.start);
      const endDate = formatDateString(item.end);
      return {
        ...item,
        petOwner: owner,
        fotos: fotos,
        status: statusData[0],
        price: houseData[0].price,
        startDate: startDate,
        endDate: endDate,
      };
    })
  );
  return (
    <main>
      <section>
        {consolidatedData.some((item) => item.status.id === 1) ? (
          <div>
            <h1>You have new booking requests</h1>
            <p>--hit confirm or deny --</p>
            {consolidatedData
              .filter((item) => item.status.id === 1)
              .map((item) => (
                <div
                  key={item.id}
                  className="border-2 border-gray-700 grid grid-cols-4 gap-8 mb-8 p-4 "
                >
                  <div className="">
                    {item.fotos.map((url, fotoIndex) => (
                      <img
                        key={`pet-image-${fotoIndex}`}
                        src={url}
                        alt={`Pet Image ${fotoIndex}`}
                        style={{
                          width: "100px",
                          height: "100px",
                          margin: "5px",
                        }}
                        className="object-cover flex"
                      />
                    ))}
                  </div>

                  <div className="mb-6">
                    <p className="text-3xl">{item.pets.name}</p>
                    <p>{item.pets.age} year/s</p>
                    <p>{item.pets.breed}</p>
                    <p className="italic text-gray-500">Description:</p>
                    <p>{item.pets.description}</p>
                  </div>
                  <div className="mb-6">
                    <p className="italic text-gray-500">Owner:</p>
                    <p>
                      {item.petOwner.first_name} {item.petOwner.last_name}
                    </p>
                    <p>{item.petOwner.address}</p>
                    <p>{item.petOwner.number}</p>
                  </div>
                  <div>
                    <p className="text-green-500 text-xl">
                      {item.startDate} - {item.endDate}
                    </p>
                    <p className="mb-6 text-green-500">{item.price} €</p>
                    <p className="text-green-500 w-24">{item.name}</p>
                    <ConfirmDenyButton requestId={item.id} />
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <p className="text-gray-500">-- No open booking requests. --</p>
        )}
      </section>
      <section>
        {consolidatedData.some((item) => item.status.id !== 1) ? (
          <div>
            <h4 className="mt-16">Reservation History:</h4>
            {consolidatedData
              .filter((item) => item.status.id !== 1)
              .map((item) => (
                <div
                  key={item.id}
                  className="border-2 border-gray-700 grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 p-4 "
                >
                  <div className="">
                    {item.fotos.map((url, fotoIndex) => (
                      <img
                        key={`pet-image-${fotoIndex}`}
                        src={url}
                        alt={`Pet Image ${fotoIndex}`}
                        style={{
                          width: "100px",
                          height: "100px",
                          margin: "5px",
                        }}
                        className="object-cover flex"
                      />
                    ))}
                  </div>

                  <div className="mb-6">
                    <p
                      className={`text-${
                        item.status.id === 2 ? "green" : "gray"
                      }-500 text-3xl`}
                    >
                      {item.pets.name}
                    </p>
                    <p className={`text-${item.status.id === 3 && "gray"}-500`}>
                      {item.pets.age} year/s
                    </p>
                    <p className={`text-${item.status.id === 3 && "gray"}-500`}>
                      {item.pets.breed}
                    </p>
                    <p className="italic text-gray-500">Description:</p>
                    <p className={`text-${item.status.id === 3 && "gray"}-500`}>
                      {item.pets.description}
                    </p>
                  </div>
                  <div className="mb-6">
                    <p className="italic text-gray-500">Owner:</p>
                    <p className={`text-${item.status.id === 3 && "gray"}-500`}>
                      {item.petOwner.first_name} {item.petOwner.last_name}
                    </p>
                    <p className={`text-${item.status.id === 3 && "gray"}-500`}>
                      {item.petOwner.address}
                    </p>
                    <p className={`text-${item.status.id === 3 && "gray"}-500`}>
                      {item.petOwner.number}
                    </p>
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
                      {item.price} €
                    </p>
                    <p className="text-green-500 w-24">{item.name}</p>
                    <p
                      className={`w-[100px] ${
                        item.status.id === 2
                          ? "button-green"
                          : item.status.id === 3
                          ? "button-gray"
                          : ""
                      }`}
                    >
                      {item.status.name}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <p className="text-gray-900">-- No booking history. --</p>
        )}
      </section>
    </main>
  );
}
