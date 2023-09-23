import { allHouses } from "@/app/queries";

export default async function CardHouses() {
  let houses = await allHouses();

  //   let cardHouses = houses?.map((house) => (
  //     <div key={house.id}>
  //       <p className="text-2xl font-bold">{house.name}</p>
  //       <p>{house.foto}</p>
  //       <p>{house.m2}</p>
  //       <p>{house.description}</p>
  //       <p>{house.price}</p>
  //       <p>{house.status}</p>
  //     </div>
  //   ));

  //   let cardProfiles = houses
  //     ?.map((house) => house.profiles)
  //     .map((profile) => (
  //       <div key={profile}>
  //         <p>{profile.first_name}</p>
  //         <p>{profile.last_name}</p>
  //         <p>{profile.address}</p>
  //         <p>{profile.number}</p>
  //       </div>
  //     ));

  let cardHouses = houses?.map((house) => {
    const profile = house.profiles;

    return (
      <div key={house.id}>
        <p className="text-2xl font-bold">{house.name}</p>
        <p>{house.foto}</p>
        <p>{house.m2}</p>
        <p>{house.description}</p>
        <p>{house.price}</p>
        <p>{house.status}</p>
        {profile && (
          <>
            <p>{profile.first_name}</p>
            <p>{profile.last_name}</p>
            <p>{profile.address}</p>
            <p>{profile.number}</p>
          </>
        )}
      </div>
    );
  });

  return <div className="grid grid-cols-5">{cardHouses}</div>;
}
