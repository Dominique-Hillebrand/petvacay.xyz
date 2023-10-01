// @ts-nocheck

import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import TestClient from "./TestClient";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { currentUserAuth } from "@/app/queries";
export const dynamic = "force-dynamic";

export default async function PetOwner() {
  let avatarFile;

  // const supabase = createServerActionClient({ cookies });
  // let { data: avatarUpload, error: uploadError } = await supabaseNeu.storage
  //   .from("avatars")
  //   .upload(filePath, file);

  // if (uploadError) {
  //   throw new Error(uploadError);
  // }

  // const { data: avatarFile, error: fileError } = await supabaseNeu.storage
  //   .from("avatars")
  //   .getPublicUrl(avatarUpload.path, {
  //     transform: {
  //       width: 500,
  //       height: 600,
  //     },
  //   });

  // const { data2, error2 } = await supabase.storage
  //   .from("avatars")
  //   .download(avatarUpload.path, {
  //     transform: {
  //       width: 100,
  //       height: 100,
  //       quality: 80,
  //     },
  //   });
  const { user } = await currentUserAuth();

  return (
    <main className="">
      <TestClient userId={user.id} />
    </main>
  );
}
