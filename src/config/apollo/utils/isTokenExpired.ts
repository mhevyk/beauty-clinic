import { jwtDecode } from "jwt-decode";

export default function isTokenExpired(token: string) {
  try {
    const { exp } = jwtDecode(token);

    if (typeof exp === "number") {
      const expirationTimestampInMs = exp * 1000;
      return Date.now() >= expirationTimestampInMs;
    }

    return false;
  } catch {
    return false;
  }
}
