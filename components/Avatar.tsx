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

    setAvatarPath(data?.path);
    getPublicURL();
  };

  function getPublicURL() {
    const { data: avatar } = supabase.storage
      .from("avatars")
      .getPublicUrl(`${avatarPath}`);
    console.log("publicURL avatar", avatar.publicUrl);

    uploadFileToPetTable(avatar.publicUrl);
    console.log(avatar?.publicUrl);
  }

  const uploadFileToPetTable = async (url) => {
    const supabase = createClientComponentClient();
    const { data, error } = await supabase
      .from("pets")
      .update({
        foto: url,
      })
      .eq("owner_id", userId);
  };

  // redirect("/pet-owner/home");

  return (
    <div>
      <form onSubmit={handleSubmit} className="signUp-form">
        <label className="" htmlFor="uploadFoto">
          Upload a Foto of your Pet
        </label>
        <input type="file" name="image" onChange={handleFileSelected} />
        <button type="submit" className="button-gray">
          Upload image
        </button>
      </form>
      {/* {avatar.publicUrl && (
        <img src={avatar.publicUrl} alt="" width={100} height={100} />
      )} */}
    </div>
  );
}
