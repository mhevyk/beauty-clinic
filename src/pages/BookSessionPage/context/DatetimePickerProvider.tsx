import { startOfToday } from "date-fns";
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import useSelectedQualifiedEmployee, {
  QualifiedEmployee,
} from "../hooks/useSelectedQualifiedEmployee";

type DatetimePickerContextType = {
  selectedDate: Date;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
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
