// @ts-nocheck

import Link from 'next/link'
import LogoutButton from './LogoutButton'
import { currentUserAuth } from '@/app/queries'
import { roleIdCurrentUser } from '@/app/queries'
import { currentUserProfiles } from '@/app/queries'

export default async function Header() {
  const user = await currentUserAuth()
  let roleId = []
  let profile
  if (user) {
    roleId = await roleIdCurrentUser()
    profile = await currentUserProfiles()
  }
  return (
    <header className="ml-2 flex items-center mb-10 border-b border-gray-300">
      {user ? (
        <>
          <LogoutButton />
          {roleId.length > 0 && roleId[0].role_id == 1 && (
            <>
              <Link href="/pet-owner/home" className="navbutton">
                Home
              </Link>
              <Link href="/pet-owner/profile" className="navbutton">
                Profile
              </Link>{' '}
              <Link href="/pet-owner/reservations" className="navbutton">
                Reservations
              </Link>
              <p className="hidden md:flex">
                Welcome, {profile[0].first_name}!
              </p>
            </>
          )}
          {roleId.length > 0 && roleId[0].role_id == 2 && (
            <>
              <Link href="/pet-sitter/home" className="navbutton">
                Home
              </Link>
              <Link href="/pet-sitter/profile" className="navbutton">
                Profile
              </Link>
              <p className="hidden md:flex">
                Welcome, {profile[0].first_name}!
              </p>
            </>
          )}
        </>
      ) : (
        <>
          <Link href="/login" className="logbutton">
            Login / Sign Up
          </Link>
        </>
      )}
    </header>
  )
}
