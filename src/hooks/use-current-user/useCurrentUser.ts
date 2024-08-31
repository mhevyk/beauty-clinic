import { jwtDecode } from "jwt-decode";

import { useUserStore } from "@/store/user/userStore";
import { UserRole } from "@/types/helpers";

export type UserPayload = {
  userId: number;
  username: string;
  role: UserRole;
};

export default function useCurrentUser() {
  const accessToken = useUserStore(store => store.accessToken);

  if (accessToken === null) {
    return null;
  }

  return jwtDecode<UserPayload>(accessToken);
}
