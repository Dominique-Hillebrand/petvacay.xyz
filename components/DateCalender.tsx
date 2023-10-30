"use client";

import { useState } from "react";
import { DatePicker } from "@mantine/dates";

interface DateCalendarProps {
  onDateSelect: (dateRange: [Date | null, Date | null]) => void;
}

export default function DateCalender({ onDateSelect }: DateCalendarProps) {
  const [selectedDates, setSelectedDates] = useState<
    [Date | null, Date | null]
  >([null, null]);

  const handleDateSelect = (dateRange: [Date | null, Date | null]) => {
    setSelectedDates(dateRange);
    onDateSelect(dateRange);
  };

  return (
    <div>
      <DatePicker
        type="range"
        allowSingleDateInRange
        value={selectedDates}
        onChange={handleDateSelect}
        minDate={new Date()}
      />
    </div>
  );
}
