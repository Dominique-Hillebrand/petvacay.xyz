import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import LogoutButton from "../components/LogoutButton";

export default async function Header() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="w-full flex text-sm text-foreground">
      {user ? (
        <div className="flex items-center gap-4">
          Hey, {user.email}!
          <LogoutButton />
        </div>
      ) : (
        <>
          <Link
            href="/login"
            className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
          >
            Login / Sign Up
          </Link>
        </>
      )}
    </nav>
  );
}
