import { jwtDecode } from "jwt-decode";

import { useUserStore } from "@/store/user/userStore";
import { User } from "@/api/generated";

export type UserPayload = Pick<User, "id" | "email" | "username" | "role">;

export default function useCurrentUser() {
  const accessToken = useUserStore(store => store.accessToken);

  if (accessToken === null) {
    return null;
  }

  return jwtDecode<UserPayload>(accessToken);
}
