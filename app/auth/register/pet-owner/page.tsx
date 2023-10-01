// @ts-nocheck

import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import Avatar from "@/components/Avatar";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { currentUserAuth } from "@/app/queries";
export const dynamic = "force-dynamic";

export default async function PetOwner() {
  let avatarFile;
  const addPersonPet = async (formData) => {
    "use server";
    // const first_name = formData.get("firstName");
    // const last_name = formData.get("lastName");
    // const address = formData.get("address");
    // const number = formData.get("number");
    // const role_id = formData.get("roleId");

    // const name = formData.get("petName");
    // const foto = formData.get("petFoto");
    // const age = formData.get("petAge");
    // const description = formData.get("petDescription");
    // const breed = formData.get("petBreed");

    // const supabase = createServerActionClient({ cookies })
    // const { data: profiles, error: profilesError } = await supabase
    //   .from("profiles")
    //   .insert({
    //     first_name: first_name,
    //     last_name: last_name,
    //     address: address,
    //     number: number,
    //     role_id: role_id,
    //   });

    // const { data: pets, error: petsError } = await supabase
    //   .from("pets")
    //   .insert({
    //     name: name,
    //     foto: foto,
    //     age: age,
    //     description: description,
    //     breed: breed,
    //   });

    // if (profilesError || petsError) {
    //   throw new Error("An error occurred: ");
    // }
    //   redirect("/pet-owner/home");
  };
  const { user } = await currentUserAuth();

  return (
    <main className="">
      <h1 className="pb-8">Register your Pet:</h1>
      <Avatar userId={user.id} />
      <form className="signUp-form" action={addPersonPet}>
        {/* <label className="text-md" htmlFor="firstName">
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
        <br></br> */}

        {/* pet beginn**** */}

        {/* <label className="text-md" htmlFor="petName">
          Name of your Pet
        </label>
        <input
          className="input-text"
          name="petName"
          placeholder="Name"
          required
        />
        <label className="text-md" htmlFor="petFoto">
          Foto of your Pet
        </label>
        <input
          className="input-text"
          name="petFoto"
          placeholder="Foto"
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
        /> */}
        {/* <input type="file" id="file" accept="image/*" name="avatar" /> */}
        <button className="bg-green-700 rounded px-4 py-2 text-white mb-2 mt-16">
          Register
        </button>
      </form>
    </main>
  );
}
