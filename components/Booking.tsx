"use client";
//@ts-nocheck
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

export default function Booking(id: any) {
  const [changeStatus, setChangeStatus] = useState(1);

  async function handleOnClick() {
    setChangeStatus(2);

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
    );

    const { error } = await supabase
      .from("houses")
      .update({ status_id: changeStatus })
      .eq("owner_id", id);
  }

  return (
    <main>
      <h1>Hallo</h1>
      <button onClick={handleOnClick}>Book</button>
    </main>
  );
}
