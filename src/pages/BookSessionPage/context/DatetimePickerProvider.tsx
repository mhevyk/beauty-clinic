import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

import { startOfToday } from "date-fns";

import useSelectedQualifiedEmployee, {
  QualifiedEmployee,
} from "../hooks/useSelectedQualifiedEmployee";

type DatetimePickerContextType = {
  selectedDate: Date;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
  selectedTime: Date | null;
  setSelectedTime: Dispatch<SetStateAction<Date | null>>;
  selectedEmployeeId: number;
  setSelectedEmployeeId: Dispatch<SetStateAction<number>>;
  qualifiedEmployees: QualifiedEmployee[];
  treatmentId: number;
};

const DatetimePickerContext = createContext<DatetimePickerContextType | null>(
  null
);

type DatetimePickerProviderProps = PropsWithChildren & {
  treatmentId: number;
};

export default function DatetimePickerProvider({
  treatmentId,
  children,
}: DatetimePickerProviderProps) {
  const [selectedDate, setSelectedDate] = useState(startOfToday);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

  const { selectedEmployeeId, setSelectedEmployeeId, qualifiedEmployees } =
    useSelectedQualifiedEmployee(treatmentId);

  return (
    <DatetimePickerContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        selectedEmployeeId,
        setSelectedEmployeeId,
        qualifiedEmployees,
        treatmentId,
        selectedTime,
        setSelectedTime,
      }}
    >
      {children}
    </DatetimePickerContext.Provider>
  );
}

export const useDatetimePickerContext = () => {
  const context = useContext(DatetimePickerContext);

  if (context === null) {
    throw new Error("Should be used within context");
  }

  return context;
};
