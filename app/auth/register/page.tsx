import Link from 'next/link'

export default function Register() {
  return (
    <main className="text-center">
      <h1 className="text-5xl md:text-7xl mb-12">REGISTER PAGE</h1>
      <p className="mb-12">Do you want to register as a ... </p>
      <Link
        href="/auth/register/pet-owner"
        className="button-gray-border text-3xl"
      >
        Pet-Owner
      </Link>
      <p className="my-7">or</p>
      <Link
        href="/auth/register/pet-sitter"
        className="text-3xl button-gray-border"
      >
        Pet-Sitter
      </Link>
    </main>
  )
}
