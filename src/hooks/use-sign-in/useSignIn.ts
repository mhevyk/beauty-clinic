import { useNavigate } from "react-router-dom";

import { useSignInMutation } from "@/api/generated";
import { SignInFormValues } from "@/pages/sign-in/SignInPage.tsx";
import { useUserStore } from "@/store/user/userStore";
import extractErrorMessage from "@/utils/extract-error-message/extractErrorMessage";
import showSnackbar from "@/utils/show-snackbar/showSnackbar";

export default function useSignIn() {
  const [signIn, { loading: isSigningIn }] = useSignInMutation();
  const navigate = useNavigate();
  const setAccessToken = useUserStore(store => store.setAccessToken);

  const handleSignIn = async (values: SignInFormValues) => {
    try {
      const response = await signIn({ variables: { input: values } });
      const token = response.data?.signIn.token;

      if (!token) {
        throw new Error("Auth failed");
      }

      setAccessToken(token);
      navigate("/", { replace: true });
    } catch (error) {
      showSnackbar({ autohide: true, message: extractErrorMessage(error) });
    }
  };

  return [handleSignIn, { isSigningIn }] as const;
}
