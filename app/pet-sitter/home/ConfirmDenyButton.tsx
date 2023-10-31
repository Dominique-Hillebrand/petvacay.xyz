// @ts-nocheck

"use client";
import React, { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function ConfirmDenyButton({ requestId }) {
  //   const [status, setStatus] = useState(1);
  const [confirmed, setConfirmed] = useState(false);
  const [denied, setDenied] = useState(false);

  const handleConfirm = async () => {
    // setStatus(2);
    setConfirmed(true);
    uploadStatus(2);
  };

  const handleDeny = async () => {
    // setStatus(3);
    setDenied(true);
    uploadStatus(3);
  };
console.log("reqeustid", requestId);
async function uploadStatus(statusId) {
  const supabase = createClientComponentClient();

  const { data: statusUpload, error: statusError } = await supabase
    .from("requests")
    .update({
      status: statusId,
    })
    .eq("id", requestId);
  console.log("status", statusUpload, statusError);
}

  return (
    <>
      {!confirmed && !denied ? (
        <div>
          <button className="button-green mr-4" onClick={handleConfirm}>
            Confirm!
          </button>
          <button className="button-gray" onClick={handleDeny}>
            Deny!
          </button>
        </div>
      ) : confirmed ? (
        <h4 className="text-2xl md:text-4xltext-green-700">You confirmed!</h4>
      ) : (
        <h4 className="text-2xl md:text-4xltext-gray-700">You denied!</h4>
      )}
    </>
  );
}
