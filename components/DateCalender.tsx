"use client";

import { useState } from "react";
import { DatePicker } from "@mantine/dates";
import { text } from "stream/consumers";

interface DateCalendarProps {
  onDateSelect: (dateRange: [Date | null, Date | null]) => void; // Define the type for onDateSelect
}

export default function DateCalender({ onDateSelect }: DateCalendarProps) {
  const [selectedDates, setSelectedDates] = useState<
    [Date | null, Date | null]
  >([null, null]);

  const handleDateSelect = (dateRange: [Date | null, Date | null]) => {
    setSelectedDates(dateRange);
    onDateSelect(dateRange); // Pass the selected date range to the parent component (Book in this case)
  };

  // const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);

  // const saveDatesToDatabase = async () => {
  //   if (value[0] && value[1]) {
  //     const startDateAsString = value[0]?.toISOString();
  //     const endDateAsString = value[1]?.toISOString();

  //     const supabase = createClientComponentClient();
  //     const { data, error } = await supabase.from("dates").insert({
  //       start: startDateAsString,
  //       end: endDateAsString,
  //       house_id:
  //       pet_id:
  //     });
  //   }
  // };

  return (
    <>
      <DatePicker
        type="range"
        value={selectedDates}
        onChange={handleDateSelect}
      />
      {/* <h6>
        {value[0]
          ? `Selected Date Range: ${value[0].toLocaleDateString()} - ${
              value[1]?.toLocaleDateString() ?? "No date selected"
            }`
          : "No date range selected"}
      </h6> */}
    </>
  );
}
