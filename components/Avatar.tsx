// @ts-nocheck

"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";

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
  const [avatarPath, setAvatarPath] = useState("");

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
  };

  const handleFileSelected = (e) => {
    setfile(e.target.files[0]);
  };
  const { data: avatar } = supabase.storage
    .from("avatars")
    .getPublicUrl(`${avatarPath}`);

  return (
    <div>
      <form onSubmit={handleSubmit} className="signUp-form">
        <label className="" htmlFor="uploadFoto">
          Upload a Foto of your Pet
        </label>
        <input type="file" name="image" onChange={handleFileSelected} />
        <button type="submit" className="button-green">
          Upload image
        </button>
      </form>
      {avatar.publicUrl && (
        <img src={avatar.publicUrl} alt="" width={100} height={100} />
      )}
    </div>
  );
}
