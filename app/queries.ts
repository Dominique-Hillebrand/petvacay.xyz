// @ts-nocheck

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const supabase = createServerComponentClient({ cookies });

export const currentUser = async function () {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    console.error("Error getting current user:", error.message);
    throw error;
  }
};

export const roleIdCurrentUser = async function () {
  try {
    const currentUserData = await currentUser();
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
    throw error;
  }
};
