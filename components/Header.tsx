// @ts-nocheck

import Link from "next/link";
import LogoutButton from "../components/LogoutButton";
import { currentUserAuth } from "@/app/queries";
import { roleIdCurrentUser } from "@/app/queries";

export default async function Header() {
  const user = await currentUserAuth();
  let roleId = [];
  if (user) {
    roleId = await roleIdCurrentUser();
  }

  return (
    <header className="flex items-center mb-6">
      {user ? (
        <>
          Hey, {user.user.email}!
          <LogoutButton />
          {roleId.length > 0 && roleId[0].role_id == 1 && (
            <>
              <Link href="/pet-owner/home" className="button-black">
                Home
              </Link>
              <Link href="/pet-owner/profile" className="button-black">
                Profile
              </Link>
            </>
          )}
          {roleId.length > 0 && roleId[0].role_id == 2 && (
            <>
              <Link href="/pet-sitter/home" className="button-black">
                Home
              </Link>
              <Link href="/pet-sitter/profile" className="button-black">
                Profile
              </Link>
            </>
          )}
        </>
      ) : (
        <>
          <Link href="/login" className="button-black">
            Login / Sign Up
          </Link>
        </>
      )}
    </header>
  );
}
