'use client'
//@ts-nocheck

import React, { useState } from 'react'
import DateCalender from '@/app/components/DateCalender'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function Book({ houseId }: { houseId: number }) {
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null])
  const [bookingCompleted, setBookingCompleted] = useState(false)

  const handleDateSelect = (dateRange: [Date | null, Date | null]) => {
    setValue(dateRange)
  }

  const handleBooking = async () => {
    if (value[0] && value[1]) {
      const startDateAsString = value[0]?.toISOString()
      const endDateAsString = value[1]?.toISOString()

      //getData from Database
      const supabase = createClientComponentClient()
      const { data, error: userError } = await supabase.auth.getUser()
      if (userError) throw new Error(userError.message)
      const user = data.user?.id

      const { data: petsId, error: petsIdError } = await supabase
        .from('pets')
        .select(`id`)
        .eq('owner_id', user)
      if (petsIdError) throw new Error(petsIdError.message)

      //Upload Data
      if (petsId) {
        const { data: dates, error: datesError } = await supabase
          .from('requests')
          .insert({
            start: startDateAsString,
            end: endDateAsString,
            house_id: houseId,
            pet_id: petsId[0].id,
            status: 1,
          })
          .select()
        if (datesError) throw new Error(datesError.message)
        !datesError && setBookingCompleted(true)
      }
    }
  }
  return (
    <>
      <div className="bg-gray-800">
        <DateCalender onDateSelect={handleDateSelect} />
      </div>
      <h6 className="text-xl md:text-2xl pt-8">
        {value[0]
          ? `Selected Date: ${value[0].toLocaleDateString()} - ${
              value[1]?.toLocaleDateString() ?? 'No date selected'
            }`
          : 'No date range selected'}
      </h6>
      {!bookingCompleted ? (
        <button className="button-green" onClick={handleBooking}>
          Send booking request!
        </button>
      ) : (
        <p className="text-green-700 text-2xl md:text-4xl">
          Booking request sent!
        </p>
      )}
    </>
  )
}
