// @ts-nocheck

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
export const dynamic = "force-dynamic";

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
        .select("*")
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
        profiles (*)
        `);
    // .eq("status", open);
    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    console.error("Error all houses:", error.message);
  }
};

//get house and person info by houseid
export const houseById = async function (id) {
  const supabase = createServerComponentClient({ cookies });
  try {
    const { data, error } = await supabase
      .from("houses")
      .select(
        `
          *, 
          profiles (*)
          `
      )
      .eq("id", id);
    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    console.error("Error all houses:", error.message);
  }
};