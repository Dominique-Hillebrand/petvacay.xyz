// @ts-nocheck

import { currentUserProfiles } from "@/app/queries";
import { houseDetailsFromCurrentUser } from "@/app/queries";
import Avatar from "@/components/Avatar";
import FotosHouses from "@/components/FotosHouses";

export default async function ProfilePetSitter() {
  const userData = await currentUserProfiles();
  let houseData;
  if (userData) {
    houseData = await houseDetailsFromCurrentUser();
  }
  return (
    <main>
      <h1 className="mb-6">Your Data</h1>
      <Avatar userId={userData[0].id} />
      <div className="grid grid-cols-2 max-w-[500px] mb-6 ">
        <p>First Name:</p> <p> {userData[0]?.first_name}</p>
        <p>Last Name: </p> <p>{userData[0]?.last_name}</p>
        <p>Address: </p> <p> {userData[0]?.address}</p>
        <p>Tel. Nr.: </p> <p> {userData[0]?.number}</p>
      </div>
      <h2 className="mb-6">Your House Data</h2>
      <FotosHouses userId={userData[0]?.id} />
      <div className="grid grid-cols-2 max-w-[500px] mb-8">
        <p>House Name: </p> <p>{houseData[0]?.name}</p>
        <p>How much space do you have for the pet:</p>{" "}
        <p> {houseData[0]?.m2} m2</p>
        <p>Description:</p> <p> {houseData[0]?.description}</p>
        <p>Price:</p> <p> {houseData[0]?.price} €</p>
      </div>
    </main>
  );
}
