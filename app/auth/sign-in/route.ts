// @ts-nocheck

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { roleIdCurrentUser } from "./../../queries";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const supabase = createRouteHandlerClient({ cookies });

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.redirect(
      `${requestUrl.origin}/login?error=Could not authenticate user`,
      {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      }
    );
  }

  let roleId = await roleIdCurrentUser();

  if (Array.isArray(roleId) && roleId.length > 0) {
    if (roleId[0].role_id == 1) {
      return NextResponse.redirect(new URL("/pet-owner/home", request.url), {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      });
    } else if (roleId[0].role_id == 2) {
      return NextResponse.redirect(new URL("/pet-sitter/home", request.url), {
        status: 301,
      });
    }
  } else {
    console.log("User is not registered. Redirecting to register page.");
    return NextResponse.redirect(new URL("/auth/register", request.url), {
      status: 301,
    });
  }
}