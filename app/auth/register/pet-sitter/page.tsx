// @ts-nocheck

import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export default async function PetSitter() {
  const addPersonHouse = async (formData) => {
    'use server'

    const first_name = formData.get('firstName')
    const last_name = formData.get('lastName')
    const address = formData.get('address')
    const number = formData.get('number')
    const role_id = formData.get('roleId')

    const name = formData.get('houseName')
    const m2 = formData.get('m2')
    const description = formData.get('houseDescription')
    const price = formData.get('price')

    const supabase = createServerActionClient({ cookies })
    const { data, error } = await supabase.from('profiles').insert({
      first_name: first_name,
      last_name: last_name,
      address: address,
      number: number,
      role_id: role_id,
    })
    // if (error) {
    //   throw new Error('An error occurred: ' + error.message)
    // }
    revalidatePath('/')

    const { data: houses, error: houseError } = await supabase
      .from('houses')
      .insert({
        name: name,
        m2: m2,
        description: description,
        price: price,
      })
    // if (houseError) {
    //   throw new Error('An error occurred: ' + houseError.message)
    // } else {
    redirect('/pet-sitter/profile')
    // }
  }

  return (
    <main className="">
      <h1 className="text-5xl md:text-7xl">Register your House:</h1>
      <form className="signUp-form" action={addPersonHouse}>
        <label className="text-md" htmlFor="firstName">
          First Name
        </label>
        <input
          className="input-text"
          type="text"
          name="firstName"
          placeholder="First Name"
          required
        />

        <label className="text-md" htmlFor="lastName">
          Last Name
        </label>
        <input
          className="input-text"
          type="text"
          name="lastName"
          placeholder="Last Name"
          required
        />
        <label className="text-md" htmlFor="address">
          Address
        </label>
        <input
          className="input-text"
          type="text"
          name="address"
          placeholder="Address"
          required
        />
        <label className="text-md" htmlFor="mobile number">
          Mobile Nr.
        </label>
        <input
          className="input-text"
          type="text"
          name="number"
          placeholder="Number"
          required
        />
        <input type="hidden" className="text-md" name="roleId" value="2" />
        <br></br>

        {/* house beginn**** */}

        <label className="text-md" htmlFor="houseName">
          How do you want to call your house?
        </label>
        <input
          className="input-text"
          name="houseName"
          placeholder="Name of your house"
          required
        />
        <label className="text-md" htmlFor="m2">
          How many m<span className="align-super text-xs">2</span> do you have?
        </label>
        <input
          className="input-text"
          type="number"
          name="m2"
          placeholder="m2"
          required
        />
        <label className="text-md" htmlFor="houseDescription">
          Tell us more about your yourself and your home.
        </label>
        <textarea
          className="input-text"
          type="text"
          name="houseDescription"
          placeholder="Description"
          required
        />
        <label className="text-md" htmlFor="price">
          Price per night
        </label>
        <input
          className="input-text"
          type="number"
          name="price"
          placeholder="Price in €"
          required
        />
        <button className="bg-green-700 rounded px-4 py-2 text-white mb-2">
          Register
        </button>
      </form>
    </main>
  )
}
