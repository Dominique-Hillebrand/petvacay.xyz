"use client";
//@ts-nocheck

import { useState } from "react";
import { DatePicker } from "@mantine/dates";
import { text } from "stream/consumers";

export default function DateCalender() {
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
  console.log("pickedValue🏡", value[0]);
  return (
    <>
      <DatePicker type="range" value={value} onChange={setValue} />
      <p>
        {value[0]
          ? `Selected Date Range: ${value[0].toLocaleDateString()} - ${
              value[1]?.toLocaleDateString() ?? "No date selected"
            }`
          : "No date range selected"}
      </p>
    </>
  );
}
