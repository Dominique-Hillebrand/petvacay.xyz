// @ts-nocheck

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
export const dynamic = "force-dynamic";

//***** */
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

//****** Data from AUTH Table*/
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