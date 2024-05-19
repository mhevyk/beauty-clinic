import { CartSession } from "../cartStore";

type SessionCompare = {
  employeeId: number;
  sessionStartsAt: Date;
};

export default function sessionComparator(
  session: CartSession,
  sessionPayload: SessionCompare
) {
  return (
    session.employee.id === sessionPayload.employeeId &&
    session.sessionStartsAt.toString() ===
      sessionPayload.sessionStartsAt.toString()
  );
}
