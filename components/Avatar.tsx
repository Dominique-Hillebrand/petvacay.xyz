// @ts-nocheck

"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

export default function Avatar({ userId }) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      auth: {
        persistSession: false,
      },
    }
  );
  const [file, setfile] = useState([]);
  const [avatarPath, setAvatarPath] = useState();
  // const [show, setShow] = useState(true);

  const handleFileSelected = (e) => {
    setfile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const filePathFolder = `${userId}/${Math.random()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(filePathFolder, file, {
        cacheControl: "3600",
        upsert: false,
      });
    console.log("uploaded file to storage", filePathFolder, file);

    setAvatarPath(data?.path);
  };

  function getPublicURL() {
    if (avatarPath) {
      const { data: avatar } = supabase.storage
        .from("avatars")
        .getPublicUrl(avatarPath);
      console.log("get publicURL avatar", avatar.publicUrl);
      // upsertFotoPetTable(avatar.publicUrl);
    }
  }
  useEffect(() => {
    getPublicURL();
  }, [avatarPath]);

  // const upsertFotoPetTable = async (url) => {
  //   const supabase = createClientComponentClient();
  //   const { data, error } = await supabase
  //     .from("pets")
  //     .upsert(
  //       {
  //         foto: url,
  //       },
  //       {
  //         returning: "minimal",
  //         onConflict: ["owner_id"],
  //         action: "update",
  //       }
  //     )
  //     .eq("owner_id", userId);
  //   console.log("uploaded file to pet table");
  //   if (error) {
  //     console.error("Error uploading file to pet table:", error.message);
  //   } else {
  //     console.log("Uploaded file to pet table:", data);
  //   }
  // };

  // redirect("/pet-owner/home");

  return (
    <div>
      {/* {show && ( */}
      <form onSubmit={handleSubmit} className="signUp-form">
        <label className="" htmlFor="uploadFoto">
          Upload a Foto of your Pet
        </label>
        <input type="file" name="image" onChange={handleFileSelected} />
        <button type="submit" className="button-gray">
          Upload image
        </button>
      </form>
      {/* )} */}
      {/* {avatar.publicUrl && (
        <img src={avatar.publicUrl} alt="" width={100} height={100} />
      )} */}
    </div>
  );
}