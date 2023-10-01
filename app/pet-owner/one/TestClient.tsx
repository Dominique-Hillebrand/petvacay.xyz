"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

export default function Avatar({ userId }) {
  const [file, setFile] = useState("sss");
  //   const supabase = createClient(
  //     process.env.NEXT_PUBLIC_SUPABASE_URL,
  //     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  //     {
  //       auth: {
  //         persistSession: false,
  //       },
  //     }
  //   );
  //   const [file, setfile] = useState([]);
  //   const [avatarPath, setAvatarPath] = useState("");

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // const filePathFolder = `${userId}/${Math.random()}-${file.name}`;
    // const { data, error } = await supabase.storage
    //   .from("avatars")
    //   .upload(filePathFolder, file, {
    //     cacheControl: "3600",
    //     upsert: false,
    //   });
    // setAvatarPath(data?.path);
    // console.log("💕", filePathFolder);
    console.log("submitted", e);
  };
  //   console.log("🏡", file);
  //   console.log("🐈", avatarPath);

  const handleFileSelected = (e) => {
    // setfile(e.target.files[0]);
    console.log("Hallooooooo❤️");
    // console.log("🗑️", e.target.files[0]);
  };

  //   const { data: avatar } = supabase.storage
  //     .from("avatars")
  //     .getPublicUrl(`${avatarPath}`);

  //   //   const { data, error } = supabase.from("pets").upsert({
  //   //     foto: avatarPath,
  //   //   });
  //   console.log(avatar.publicUrl);
  return (
    <div>
      <h1>Hallo</h1>
      <form>
        <input name="image" onChange={(e) => handleFileSelected(e)} id="ola" />
      </form>

      {/* <input type="file" name="test" onInput={handleFileSelected} /> */}
    </div>
  );
}
