// @ts-nocheck

import { allHouses } from "@/app/queries";
import { currentUserProfiles } from "@/app/queries";
import { publicUrls } from "@/app/queries";
import Link from "next/link";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function CardHouses() {
  const houses = await allHouses();

  // ++++++  SHOW ALL FOTOS FROM ALL HOUSES ++++++++++ working! :)
  // const fotosFromHouses = await Promise.all(
  //   houses?.map(async (house) => {
  //     // console.log(house.profiles.id);
  //     const urls = await listAllFileUrlsFromBucket(house.profiles.id);
  //     return { ...house, fotos: urls };

  //     async function listAllFileUrlsFromBucket(id) {
  //       const supabase = createServerComponentClient({ cookies });
  //       try {
  //         const { data, error } = await supabase.storage
  //           .from("houses")
  //           .list(id, {
  //             limit: 100,
  //             offset: 0,
  //             sortBy: { column: "name", order: "asc" },
  //           });
  //         if (error) {
  //           console.error("Error listing houses files:", error.message);
  //           return [];
  //         }
  //         // console.log(data);
  //         const urls = await publicUrls(data);
  //         return urls;
  //       } catch (error) {
  //         console.error("An error occurred:", error.message);
  //         return [];
  //       }

  //       async function publicUrls(data) {
  //         const urls = await Promise.all(
  //           data.map(async (file) => {
  //             try {
  //               const { data: fileData, error: fileError } = supabase.storage
  //                 .from("houses")
  //                 .getPublicUrl(`${id}/${file.name}`);

  //               if (fileError) {
  //                 console.error(
  //                   "Error getting public URL for houses file:",
  //                   file.name,
  //                   fileError.message
  //                 );
  //                 return null;
  //               }
  //               // console.log(fileData.publicUrl);
  //               // console.log("is this array", fileData);
  //               return fileData.publicUrl;
  //             } catch (error) {
  //               console.error("An error occurred:", error.message);
  //               return null;
  //             }
  //           })
  //         );
  //         const filteredUrls = urls.filter((url) => url !== null);
  //         // console.log("All public URLs❤️:", filteredUrls);

  //         return filteredUrls;
  //       }
  //     }
  //   })
  // );

  //**********SHOW ALL FOTOS FROM SITTER */  not sure if working but should be
  // const fotosFromPersons = await Promise.all(
  //   houses?.map(async (house) => {
  //     // console.log(house.profiles.id);
  //     const urls = await listAllFileUrlsFromBucket(house.profiles.id);
  //     return { ...house, fotos: urls };

  //     async function listAllFileUrlsFromBucket(id) {
  //       const supabase = createServerComponentClient({ cookies });
  //       try {
  //         const { data, error } = await supabase.storage
  //           .from("avatars")
  //           .list(id, {
  //             limit: 100,
  //             offset: 0,
  //             sortBy: { column: "name", order: "asc" },
  //           });
  //         if (error) {
  //           console.error("Error listing avatar files:", error.message);
  //           return [];
  //         }
  //         // console.log(data);
  //         const urls = await publicUrls(data);
  //         return urls;
  //       } catch (error) {
  //         console.error("An error occurred:", error.message);
  //         return [];
  //       }

  //       async function publicUrls(data) {
  //         const urls = await Promise.all(
  //           data.map(async (file) => {
  //             try {
  //               const { data: fileData, error: fileError } = supabase.storage
  //                 .from("avatars")
  //                 .getPublicUrl(`${id}/${file.name}`);

  //               if (fileError) {
  //                 console.error(
  //                   "Error getting public URL for avatar file:",
  //                   file.name,
  //                   fileError.message
  //                 );
  //                 return null;
  //               }
  //               // console.log(fileData.publicUrl);
  //               // console.log("is this array", fileData);
  //               return fileData.publicUrl;
  //             } catch (error) {
  //               console.error("An error occurred:", error.message);
  //               return null;
  //             }
  //           })
  //         );
  //         const filteredUrls = urls.filter((url) => url !== null);
  //         // console.log("All public URLs❤️:", filteredUrls);

  //         return filteredUrls;
  //       }
  //     }
  //   })
  // );

  const fotos = await Promise.all(
    houses?.map(async (house) => {
      const houseUrls = await listAllFileUrlsFromBucket(
        "houses",
        house.profiles.id
      );
      const profileUrls = await listAllFileUrlsFromBucket(
        "avatars",
        house.profiles.id
      );
      return { ...house, houseFotos: houseUrls, profileFotos: profileUrls };
    })
  );

  async function listAllFileUrlsFromBucket(bucketName, id) {
    const supabase = createServerComponentClient({ cookies });

    try {
      const { data, error } = await supabase.storage.from(bucketName).list(id, {
        limit: 100,
        offset: 0,
        sortBy: { column: "name", order: "asc" },
      });
      if (error) {
        console.error("Error listing files:", error.message);
        return [];
      }
      const urls = await publicUrls(data);
      return urls;
    } catch (error) {
      console.error("An error occurred:", error.message);
      return [];
    }

    async function publicUrls(data) {
      const urls = await Promise.all(
        data.map(async (file) => {
          try {
            const { data: fileData, error: fileError } = supabase.storage
              .from(bucketName)
              .getPublicUrl(`${id}/${file.name}`);

            if (fileError) {
              console.error(
                "Error getting public URL for file:",
                file.name,
                fileError.message
              );
              return null;
            }

            return fileData.publicUrl;
          } catch (error) {
            console.error("An error occurred:", error.message);
            return null;
          }
        })
      );
      const filteredUrls = urls.filter((url) => url !== null);
      return filteredUrls;
    }
  }
  return (
    <>
      {fotos?.map((house) => {
        const profile = house.profiles;
        return (
          <div key={house.id} className="box-shadow1 rounded-xl p-4">
            <p className="text-6xl">{house.name}</p>
            {house.houseFotos && house.houseFotos.length > 0 && (
              <div className="flex">
                {house.houseFotos.map((url, index) => (
                  <img
                    key={`house-${index}`}
                    src={url}
                    alt={`House Image ${index}`}
                    style={{ width: "100px", height: "100px", margin: "5px" }}
                  />
                ))}
              </div>
            )}
            {/* {!house.houseFotos ||
              (house.houseFotos.length === 0 && (
                <p>No house photos available.</p>
              ))} */}
            <br />
            <p>Description:</p>
            <p className="h-14">{house.description}</p>
            <p>{house.m2} m2</p>
            <br />
            <p>Sitter Details:</p>
            {house.profileFotos && house.profileFotos.length > 0 && (
              <div className="flex">
                {house.profileFotos.map((url, index) => (
                  <img
                    key={`profile-${index}`}
                    src={url}
                    alt={`Profile Image ${index}`}
                    style={{ width: "100px", height: "100px", margin: "5px" }}
                  />
                ))}
              </div>
            )}
            {/* {!house.profileFotos ||
              (house.profileFotos.length === 0 && (
                <p>No profile photos available.</p>
              ))} */}
            {profile && (
              <>
                <p>
                  {profile.first_name} {profile.last_name}
                </p>
                <p>{profile.address}</p>
                <p>{profile.number}</p>
              </>
            )}
            <br />
            <p>price/night: {house.price} €</p>
            <p>{house.status}</p>
            <Link
              href={`/pet-owner/show-sitter/${house.id}`}
              className="button-black"
            >
              Check out Profile
            </Link>
          </div>
        );
      })}
    </>
  );
}
