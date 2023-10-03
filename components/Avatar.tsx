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
  const [publicUrlsArray, setPublicUrlsArray] = useState([]);

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

  useEffect(() => {
    listAllFileUrlsFromBucket();
  }, [avatarPath]);

  // redirect("/pet-owner/home");
  async function listAllFileUrlsFromBucket() {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .list(userId, {
          limit: 100,
          offset: 0,
          sortBy: { column: "name", order: "asc" },
        });
      if (error) {
        console.error("Error listing files:", error.message);
        return [];
      }

      const urls = await publicUrls(data);
      setPublicUrlsArray(urls);

      return urls;
    } catch (error) {
      console.error("An error occurred:", error.message);
      return [];
    }

    async function publicUrls(data) {
      const urls = await Promise.all(
        data.map(async (file) => {
          try {
            const { data: fileData, error: fileError } = supabase.storage
              .from("avatars")
              .getPublicUrl(`${userId}/${file.name}`);

            if (fileError) {
              console.error(
                "Error getting public URL for file:",
                file.name,
                fileError.message
              );
              return null;
            }
            console.log(fileData.publicUrl);
            console.log("is this array", fileData);
            return fileData.publicUrl;
          } catch (error) {
            console.error("An error occurred:", error.message);
            return null;
          }
        })
      );
      const filteredUrls = urls.filter((url) => url !== null);
      console.log("All public URLs:", filteredUrls);

      return filteredUrls;
    }
  }
  useEffect(() => {
    listAllFileUrlsFromBucket();
  }, []);
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
      <div>
        {publicUrlsArray.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Image ${index}`}
            style={{ width: "100px", height: "100px", margin: "5px" }}
          />
        ))}
      </div>
    </div>
  );
}