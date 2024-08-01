import { useState } from "react";

import { Employee, useQualifiedEmployeesSuspenseQuery } from "@api/hooks";

export type QualifiedEmployee = Pick<Employee, "__typename" | "id" | "name">;

export default function useSelectedQualifiedEmployee(treatmentId: number) {
  const { data } = useQualifiedEmployeesSuspenseQuery({
    variables: { treatmentId },
  });

  const qualifiedEmployees: QualifiedEmployee[] = data.qualifiedEmployees;

  const initialSelectedOption =
    qualifiedEmployees.length > 0 ? qualifiedEmployees[0].id : null;

  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    initialSelectedOption
  );

  return {
    selectedEmployeeId,
    setSelectedEmployeeId,
    qualifiedEmployees,
  } as const;
}
