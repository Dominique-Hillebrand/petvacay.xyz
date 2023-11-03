// @ts-nocheck

import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'

export default async function PetOwner() {
  const addPersonPet = async (formData) => {
    'use server'
    const first_name = formData.get('firstName')
    const last_name = formData.get('lastName')
    const address = formData.get('address')
    const number = formData.get('number')
    const role_id = formData.get('roleId')

    const name = formData.get('petName')
    const age = formData.get('petAge')
    const description = formData.get('petDescription')
    const breed = formData.get('petBreed')

    const supabase = createServerActionClient({ cookies })
    const { data: profiles, error } = await supabase.from('profiles').insert({
      first_name: first_name,
      last_name: last_name,
      address: address,
      number: number,
      role_id: role_id,
    })

    const { data, error: petsError } = await supabase.from('pets').insert({
      name: name,
      age: age,
      description: description,
      breed: breed,
    })

    if (petsError) {
      console.error('Error inserting data in Pets table:', petsError.message)
      throw new Error('An error occurred: ')
    } else if (error) {
      console.error('Error inserting data in profile table:', error.message)
      throw new Error('An error occurred: ')
    } else {
      console.log('Data inserted successfully.')
    }
    redirect('/pet-owner/profile')
  }

  return (
    <main className="">
      <h1 className="text-5xl md:text-7xl pb-8">Register your Pet:</h1>
      <form className="signUp-form" action={addPersonPet} id="registrationForm">
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
        <input type="hidden" className="text-md" name="roleId" value="1" />
        <br></br>

        {/* pet beginn**** */}

        <label className="text-md" htmlFor="petName">
          Name of your Pet
        </label>
        <input
          className="input-text"
          name="petName"
          placeholder="Name"
          required
        />
        <label className="text-md" htmlFor="petAge">
          Age
        </label>
        <input
          className="input-text"
          type="number"
          name="petAge"
          placeholder="Age"
          required
        />
        <label className="text-md" htmlFor="petDescription">
          Tell us more about your pet.
        </label>

        <textarea
          className="input-text"
          type="text"
          name="petDescription"
          placeholder="Description"
          required
        />
        <label className="text-md" htmlFor="petBreed">
          Breed
        </label>
        <input
          className="input-text"
          type="text"
          name="petBreed"
          placeholder="Breed"
          required
        />
        <button className="bg-green-700 rounded px-4 py-2 text-white mb-2 mt-16">
          Register
        </button>
      </form>
      {/* <Avatar userId={user.id} /> */}
    </main>
  )
}