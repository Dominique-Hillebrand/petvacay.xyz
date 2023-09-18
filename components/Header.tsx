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
    <header className="">
      <p className=""> this is the header</p>
      {user ? (
        <div className="">
          Hey, {user.email}!
          <LogoutButton />
        </div>
      ) : (
        <Link href="/login" className="buttom-black">
          Login / Sign Up
        </Link>
      )}
    </header>
  );
}
