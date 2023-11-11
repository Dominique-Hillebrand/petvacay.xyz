import Image from 'next/image'
import womanpets from '@/app/img/womenpets.png'

export default async function Index() {
  return (
    <div>
      {/* <div className="animate-in opacity-0"> */}
      <h1 className="text-5xl md:text-7xl animate-in">PetVacay</h1>
      <h5 className="text-xl md:text-3xl">
        Here you can find a petBnB for your best friend.
      </h5>
      <p>
        You are going on vacation and need to find someone to take care of your
        pet?
      </p>
      <p>
        Sign up or login to see all possible pet-sitters and there homes
        close-by.
      </p>
      <p className="pt-4">
        Or you would like to earn money and look after someones pet? Sign up as
        a pet-sitter so that pet-owners can check out your profile and book you!
      </p>
      {/* <Image
        src={womanpets}
        alt="Image of a women with pets"
        className="mt-4 w-full"
        width={530}
      /> */}
    </div>
  )
}
