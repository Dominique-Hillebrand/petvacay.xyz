"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Avatar() {
  //   const [userId, setUserId] = useState("");
  //   //   const [media, setMedia] = useState([]);
  //   const supabase = createClientComponentClient();
  //   const getUser = async () => {
  //     try {
  //       const {
  //         data: { user },
  //       } = await supabase.auth.getUser();
  //       if (user !== null) {
  //         setUserId(user.id);
  //       } else {
  //         setUserId("");
  //       }
  //     } catch (e) {}
  //   };
  //   console.log("user_id", userId);

  //   console.log("schaunmamal", avatar); //Blob {size: 176, type: "image/svg+xml"}
  //   console.log(".name", avatar.name); // rectangle-orange.svg
  return <input type="file" id="single" accept="image/*" name="avatar" />;
}
