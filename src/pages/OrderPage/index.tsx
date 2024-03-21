import { useState } from "react";
import Calendar from "./components/Calendar";
import { startOfToday } from "date-fns";

export default function OrderPage() {
  const [selectedDayDate, setSelectedDayDate] = useState<Date | null>(
    startOfToday()
  );

  // TODO: remove styles later
  return (
    <div style={{ background: "#f9f2e5", paddingTop: "100px" }}>
      <Calendar
        selectedDayDate={selectedDayDate}
        setSelectedDayDate={setSelectedDayDate}
      />
    </div>
  );
}
