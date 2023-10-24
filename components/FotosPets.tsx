// @ts-nocheck

"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

export default function FotosPets({ userId }) {
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
  const [fotoPath, setFotoPath] = useState();
  const [publicUrlsArray, setPublicUrlsArray] = useState([]);

  const handleFileSelected = (e) => {
    setfile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const filePathFolder = `${userId}/${Math.random()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from("pets")
      .upload(filePathFolder, file, {
        cacheControl: "3600",
        upsert: false,
      });
    console.log("uploaded file to storage", filePathFolder, file);
    console.log("data", data, error);
    setFotoPath(data?.path);
  };

  useEffect(() => {
    listAllFileUrlsFromBucket();
  }, [fotoPath]);

  async function listAllFileUrlsFromBucket() {
    try {
      const { data, error } = await supabase.storage.from("pets").list(userId, {
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
              .from("pets")
              .getPublicUrl(`${userId}/${file.name}`);

            if (fileError) {
              console.error(
                "Error getting public URL for file:",
                file.name,
                fileError.message
              );
              return null;
            }
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
      <form
        onSubmit={handleSubmit}
        className="signUp-form"
        style={{ display: publicUrlsArray.length < 3 ? "flex" : "none" }}
      >
        <h6>Upload your Fotos here:</h6>
        <input type="file" name="image" onChange={handleFileSelected} />
        <button type="submit" className="button-gray max-w-[300px]">
          Upload image
        </button>
      </form>
      <div style={{ display: publicUrlsArray.length > 0 ? "flex" : "none" }}>
        {publicUrlsArray.length > 0 &&
          publicUrlsArray.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Image ${index}`}
              style={{ width: "200px", height: "200px", margin: "5px" }}
              className="object-cover"
            />
          ))}
      </div>
    </div>
  );
}
