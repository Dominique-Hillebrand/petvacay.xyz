'use client'

import { useState } from 'react'
import Image from 'next/image'
import burger from '@/app/img/img-burger-menu.svg'
import x from '@/app/img/x.svg'
import Link from 'next/link'

export default function BurgerMenu({ role }: any) {
  const [toggle, setToggle] = useState(false)
  return (
    <>
      <Image
        src={burger}
        alt="burger-menu"
        className="md:hidden cursor-pointer"
        onClick={() => setToggle(!toggle)}
      />
      {toggle && (
        <div
          onClick={() => setToggle(!toggle)}
          className="z-[100] w-[375px] h-[706px] bg-black text-white absolute right-0 top-0 text-center pt-32 text-[22px] leading-[60px]"
        >
          <Image
            src={x}
            alt="X"
            width="19"
            height="19"
            className="absolute right-5 top-12 hover:scale-125 cursor-pointer"
          />
          <p className="hover:underline decoration-white decoration-2 underline-offset-8">
            <Link href={`/${role}/home`}>Home</Link>
          </p>
          <p className="hover:underline decoration-white decoration-2 underline-offset-8">
            <Link href={`/${role}/profile`}>Profile</Link>
          </p>
          {role === 'pet-owner' && (
            <p className="hover:underline decoration-white decoration-2 underline-offset-8">
              <Link href={`/pet-owner/reservations`}>Reservations</Link>
            </p>
          )}
        </div>
      )}
    </>
  )
}
