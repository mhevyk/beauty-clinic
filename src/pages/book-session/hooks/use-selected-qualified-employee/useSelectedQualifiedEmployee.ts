import { useState } from "react";

import { Employee, useQualifiedEmployeesSuspenseQuery } from "@/api/generated";

export type QualifiedEmployee = Pick<Employee, "__typename" | "id" | "name">;

export default function useSelectedQualifiedEmployee(treatmentId: number) {
  const { data } = useQualifiedEmployeesSuspenseQuery({
    variables: { treatmentId },
  });

  const qualifiedEmployees: QualifiedEmployee[] =
    data?.qualifiedEmployees ?? [];

  // TODO: handle case if server returns empty array
  const initialSelectedOption = qualifiedEmployees[0]!.id;

  const [selectedEmployeeId, setSelectedEmployeeId] = useState(
    initialSelectedOption
  );

  return {
    selectedEmployeeId,
    setSelectedEmployeeId,
    qualifiedEmployees,
  } as const;
}
