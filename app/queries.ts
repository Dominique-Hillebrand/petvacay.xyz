// @ts-nocheck

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

//***** Data from AUTH Table*/
export const currentUserAuth = async function () {
  const supabase = createServerComponentClient({ cookies });

  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    console.error("Error getting current user auth:", error.message);
  }
};

//****** Data from Profile Table*/
export const currentUserProfiles = async function () {
  const supabase = createServerComponentClient({ cookies });

  try {
    const currentUserData = await currentUserAuth();
    if (currentUserData) {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", currentUserData.user.id);
      if (error) throw new Error(error.message);
      return data;
    }
  } catch (error) {
    console.error("Error getting current user profile:", error.message);
  }
};

//***********RoleId from Current user */
export const roleIdCurrentUser = async function () {
  const supabase = createServerComponentClient({ cookies });
  try {
    const currentUserData = await currentUserAuth();
    if (currentUserData) {
      const { data, error } = await supabase
        .from("profiles")
        .select("role_id")
        .eq("id", currentUserData.user.id);

      if (error) throw new Error(error.message);
      return data;
    }
  } catch (error) {
    console.error("Error getting role ID for current user:", error.message);
  }
};

// **********get Data from pet
export const petDetailsFromCurrentUser = async function () {
  const supabase = createServerComponentClient({ cookies });
  try {
    const currentUserData = await currentUserAuth();
    if (currentUserData) {
      const { data, error } = await supabase
        .from("pets")
        .select("*")
        .eq("owner_id", currentUserData.user.id);

      if (error) throw new Error(error.message);
      return data;
    }
  } catch (error) {
    console.error(
      "Error getting Pet Information of current user:",
      error.message
    );
  }
};

// **********get Data from house
export const houseDetailsFromCurrentUser = async function () {
  const supabase = createServerComponentClient({ cookies });
  try {
    const currentUserData = await currentUserAuth();
    if (currentUserData) {
      const { data, error } = await supabase
        .from("houses")
        .select(
          `
        *, 
        status (*)
        `
        )
        .eq("owner_id", currentUserData.user.id);

      if (error) throw new Error(error.message);
      return data;
    }
  } catch (error) {
    console.error(
      "Error getting House Information of current user:",
      error.message
    );
  }
};

// **********get all houses with owner information
// export const allHouses= async function () {
//   const supabase = createServerComponentClient({ cookies });
//   try {
//       const { data, error } = await supabase
//         .from("profiles")
//         .select(
//           "id, first_name, last_name, address, number, houses (owner_id, name, foto, m2, description, price, status)"
//         )
//         .eq("id", "owner_id");
//         // .eq("status", open);

//       if (error) throw new Error(error.message);
//       return data;
//    } catch (error) {
//     console.error(
//       "Error all houses:",
//       error.message
//     );
//   }

export const allHouses = async function () {
  const supabase = createServerComponentClient({ cookies });
  try {
    const { data, error } = await supabase.from("houses").select(`
        *, 
        profiles (*),
        status (*)
        `);
    // .eq("status", open);
    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    console.error("Error all houses:", error.message);
  }
};

//get house and person info and fotos by houseid
export const houseById = async function (id) {
  const supabase = createServerComponentClient({ cookies });
  try {
    const { data: houseData, error: houseError } = await supabase
      .from("houses")
      .select(
        `
          *, 
          profiles (*),
          status (*)
          `
      )
      .eq("id", id);
    if (houseError) throw new Error(houseError.message);

    const houseUrls = await listAllFileUrlsFromBucket(
      "houses",
      houseData[0].owner_id
    );
    const profileUrls = await listAllFileUrlsFromBucket(
      "avatars",
      houseData[0].owner_id
    );

    return {
      ...houseData[0],
      houseFotos: houseUrls,
      profileFotos: profileUrls,
    };
  } catch (error) {
    console.error("Error all houses:", error.message);
    throw error;
  }
};

// get all files from the users bucket
export const allFilesFromUser = async function () {
  const supabase = createServerComponentClient({ cookies });

  try {
    const currentUserData = await currentUserAuth();
    if (currentUserData) {
      const { data, error } = await supabase
        .storage
        .from('avatars')
        .list(currentUserData.user.id + "/", {
          limit: 100,
          offset: 0,
          sortBy: { column: 'name', order: 'asc' },
        })
        if (error) throw new Error(error.message);
          return data;
      }      
  } catch (error) {
    console.error("Error allFilesFromUser:", error.message);
  }
} 

// publicUrls
export const publicUrls = async function (data) {
  const urls = await Promise.all(
    data.map(async (file) => {
      try {
        const { data: fileData, error: fileError } = supabase.storage
          .from("houses")
          .getPublicUrl(`${userId}/${file.name}`);

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
  console.log("All public URLs:", filteredUrls);

  return filteredUrls;
};

// get fotos of houses and avatars and return the newData with alll information
export async function getFotosUrl(houses) {
  const data = await Promise.all(
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

  return data;
}

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