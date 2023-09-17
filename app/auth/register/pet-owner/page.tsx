// @ts-nocheck

import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export default async function PetOwner() {
  const addPerson = async (formData) => {
    "use server";

    const first_name = formData.get("firstName");
    const last_name = formData.get("lastName");
    const address = formData.get("address");
    const role_id = formData.get("roleId");

    const name = formData.get("petName");
    const foto = formData.get("petFoto");
    const age = formData.get("petAge");
    const description = formData.get("petDescription");
    const breed = formData.get("petBreed");

    const supabase = createServerActionClient({ cookies });
    const { data, error } = await supabase.from("profiles").insert({
      first_name: first_name,
      last_name: last_name,
      address: address,
      role_id: role_id,
    });
    revalidatePath("/");

    const { data: pets, error: petsError } = await supabase
      .from("pets")
      .insert({
        name: name,
        foto: foto,
        age: age,
        description: description,
        breed: breed,
      });
  };

  return (
    <div>
      <h1 className="pb-8">Register your Pet:</h1>
      <div className="w-full px-8 sm:max-w-md justify-center">
        <form
          className="flex-1 flex flex-col w-full justify-center gap-1 text-foreground"
          action={addPerson}
        >
          <label className="text-md" htmlFor="firstName">
            First Name
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            type="text"
            name="firstName"
            placeholder="First Name"
            required
          />

          <label className="text-md" htmlFor="lastName">
            Last Name
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            type="text"
            name="lastName"
            placeholder="Last Name"
            required
          />
          <label className="text-md" htmlFor="address">
            Address
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            type="text"
            name="address"
            placeholder="Address"
            required
          />
          <input type="hidden" className="text-md" name="roleId" value="1" />
          <br></br>

          {/* pet beginn**** */}

          <label className="text-md" htmlFor="petName">
            Name of your Pet
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="petName"
            placeholder="Name"
            required
          />
          <label className="text-md" htmlFor="petFoto">
            Foto of your Pet
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="petFoto"
            placeholder="Foto"
            required
          />
          <label className="text-md" htmlFor="petAge">
            Age
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            type="number"
            name="petAge"
            placeholder="Age"
            required
          />
          <label className="text-md" htmlFor="petDescription">
            Tell us more about your pet.
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            type="text"
            name="petDescription"
            placeholder="Description"
            required
          />
          <label className="text-md" htmlFor="petBreed">
            Breed
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            type="text"
            name="petBreed"
            placeholder="Breed"
            required
          />
          <br />

          <button className="bg-green-700 rounded px-4 py-2 text-white mb-2">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
