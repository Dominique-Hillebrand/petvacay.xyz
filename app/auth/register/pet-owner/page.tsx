export default function PetOwner() {
  return (
    <div>
      <h1>Test Petowner</h1>
      <form
        className="flex-1 flex flex-col w-full justify-center gap-1 text-foreground"
        method="post"
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
        <input type="hidden" className="text-md" name="role_id" value="1" />
        <br></br>
        <button
          formAction="/auth/sign-up"
          className="bg-green-700 rounded px-4 py-2 text-white mb-2"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
