// @ts-nocheck

'use client'
import React, { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function ConfirmDenyButton({ requestId }) {
  const [confirmed, setConfirmed] = useState(false)
  const [denied, setDenied] = useState(false)

  const handleConfirm = async () => {
    setConfirmed(true)
    uploadStatus(2)
  }

  const handleDeny = async () => {
    setDenied(true)
    uploadStatus(3)
  }
  async function uploadStatus(statusId) {
    const supabase = createClientComponentClient()

    const { data: statusUpload, error: statusError } = await supabase
      .from('requests')
      .update({
        status: statusId,
      })
      .eq('id', requestId)
    if (statusError) throw new Error(statusError.message)
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
  )
}
