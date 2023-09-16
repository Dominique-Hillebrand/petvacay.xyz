import Link from "next/link";

export default function Register() {
  return (
    <div>
      <h1>REGISTER PAGE</h1>
      <p>To you want to register as a </p>
      <Link href="/auth/register/pet-owner" className="text-white border">
        Pet-Owner
      </Link>
      <p>or</p>
      <Link href="/auth/register/pet-sitter" className="text-white border">
        Pet-Sitter
      </Link>
    </div>
  );
}
