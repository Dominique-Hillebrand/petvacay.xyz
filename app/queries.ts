// @ts-nocheck

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

//***** Data from AUTH Table*/
export const currentUserAuth = async function () {
  const supabase = createServerComponentClient({ cookies })

  try {
    const { data, error } = await supabase.auth.getUser()
    if (error) throw new Error(error.message)
    return data
  } catch (error) {
    console.error('Error getting current user auth:', error.message)
  }
}

//****** Data from Profile Table*/
export const currentUserProfiles = async function () {
  const supabase = createServerComponentClient({ cookies })

  try {
    const currentUserData = await currentUserAuth()
    if (currentUserData) {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', currentUserData.user.id)
      if (error) throw new Error(error.message)
      return data
    }
  } catch (error) {
    console.error('Error getting current user profile:', error.message)
  }
}

//***********RoleId from Current user */
export const roleIdCurrentUser = async function () {
  const supabase = createServerComponentClient({ cookies })
  try {
    const currentUserData = await currentUserAuth()
    if (currentUserData) {
      const { data, error } = await supabase
        .from('profiles')
        .select('role_id')
        .eq('id', currentUserData.user.id)

      if (error) throw new Error(error.message)
      return data
    }
  } catch (error) {
    console.error('Error getting role ID for current user:', error.message)
  }
}

// **********get Data from pet
export const petDetailsFromCurrentUser = async function () {
  const supabase = createServerComponentClient({ cookies })

  const currentUserData = await currentUserAuth()
  if (currentUserData) {
    const { data, error } = await supabase
      .from('pets')
      .select('*')
      .eq('owner_id', currentUserData.user.id)

    if (error) throw new Error(error.message)
    return data
  }
}

// **********get Data from house
export const houseDetailsFromCurrentUser = async function () {
  const supabase = createServerComponentClient({ cookies })
  const currentUserData = await currentUserAuth()
  if (currentUserData) {
    const { data, error } = await supabase
      .from('houses')
      .select(`*`)
      .eq('owner_id', currentUserData.user.id)

    if (error) throw new Error(error.message)
    return data
  }
}

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
  const supabase = createServerComponentClient({ cookies })

  const { data, error } = await supabase.from('houses').select(`
        *, 
        profiles (*)
        `)
  // .eq("status", open);
  if (error) throw new Error(error.message)
  return data
}

//get house and person info and fotos by houseid
export const houseById = async function (id) {
  const supabase = createServerComponentClient({ cookies })

  const { data: houseData, error: houseError } = await supabase
    .from('houses')
    .select(
      `
          *, 
          profiles (*)
          `
    )
    .eq('id', id)
  if (houseError) throw new Error(houseError.message)

  const houseUrls = await listAllFileUrlsFromBucket(
    'houses',
    houseData[0].owner_id
  )
  const profileUrls = await listAllFileUrlsFromBucket(
    'avatars',
    houseData[0].owner_id
  )

  return {
    ...houseData[0],
    // houseFotos: houseUrls,
    // profileFotos: profileUrls,
    fotos: [...profileUrls, ...houseUrls],
  }
}

// get all files from the users bucket
export const allFilesFromUser = async function () {
  const supabase = createServerComponentClient({ cookies })

  const currentUserData = await currentUserAuth()
  if (currentUserData) {
    const { data, error } = await supabase.storage
      .from('avatars')
      .list(currentUserData.user.id + '/', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' },
      })
    if (error) throw new Error(error.message)
    return data
  }
}

// publicUrls
export const publicUrls = async function (data) {
  const urls = await Promise.all(
    data.map(async (file) => {
      const { data: fileData, error: fileError } = supabase.storage
        .from('houses')
        .getPublicUrl(`${userId}/${file.name}`)
      if (error) throw new Error(error.message)
      return fileData.publicUrl
    })
  )
  const filteredUrls = urls.filter((url) => url !== null)
  return filteredUrls
}

// get fotos of houses and avatars and return the newData with ALL information
export async function getFotosUrl(houses) {
  const data = await Promise.all(
    houses?.map(async (house) => {
      const houseUrls = await listAllFileUrlsFromBucket(
        'houses',
        house.profiles.id
      )
      const profileUrls = await listAllFileUrlsFromBucket(
        'avatars',
        house.profiles.id
      )

      return { ...house, fotos: [...profileUrls, ...houseUrls] }
      // return { ...house, houseFotos: houseUrls, profileFotos: profileUrls }
    })
  )

  return data
}

export async function listAllFileUrlsFromBucket(bucketName, id) {
  const supabase = createServerComponentClient({ cookies })

  const { data, error } = await supabase.storage.from(bucketName).list(id, {
    limit: 100,
    offset: 0,
    sortBy: { column: 'name', order: 'asc' },
  })
  if (error) throw new Error(error.message)
  const urls = await publicUrls(data)
  return urls

  async function publicUrls(data) {
    const urls = await Promise.all(
      data.map(async (file) => {
        const { data: fileData, error: fileError } = supabase.storage
          .from(bucketName)
          .getPublicUrl(`${id}/${file.name}`)

        if (error) throw new Error(error.message)
        return fileData.publicUrl
      })
    )
    const filteredUrls = urls.filter((url) => url !== null)
    return filteredUrls
  }
}

// export async function getPetFotosByOwnerId(userId) {
//   const supabase = createServerComponentClient({ cookies });
//   try {
//     const { data: fileList, error: listError } = await supabase.storage
//     .from("pets")
//     .list(userId, {
//       limit: 100,
//       offset: 0,
//       sortBy: { column: "name", order: "asc" },
//     });
//     if (error) {
//       console.error("Error listing files:", error.message);
//       return [];
//     }

//     const urls = await publicUrls(fileList);

//     return urls;
//   } catch (error) {
//     console.error("An error occurred:", error.message);
//     return [];
//   }

//   async function publicUrls(files) {
//     const urls = await Promise.all(
//       files.map(async (file) => {
//         try {
//           const { data: fileData, error: fileError } = supabase.storage
//             .from("pets")
//             .getPublicUrl(`${userId}/${file.name}`);

//           if (fileError) {
//             console.error(
//               "Error getting public URL for file:",
//               file.name,
//               fileError.message
//             );
//             return null;
//           }
//           return fileData.publicUrl;
//         } catch (error) {
//           console.error("An error occurred:", error.message);
//           return null;
//         }
//       })
//     );
//     const filteredUrls = urls.filter((url) => url !== null);
//     console.log("All public URLs:", filteredUrls);

//     return filteredUrls;
//   }
// }

  // if (listError) {
  //   // Handle the error
  //   console.error("Error listing files:", listError);
  // } else {
  //   const publicUrls = [];

  //   for (const file of fileList) {
  //     const { data: fileData, error: fileError } = supabase.storage
  //       .from("pets")
  //       .getPublicUrl(`${userId}/${file.name}`);

  //     if (fileError) {
  //       // Handle the error
  //       console.error(`Error getting public URL for ${file.name}:`, fileError);
  //     } else {
  //       publicUrls.push(fileData.publicURL);
  //     }
  //   }

  //   // Now, publicUrls contains an array of public URLs for all files in the folder.
  //   console.log("Public URLs:", publicUrls);
  // }