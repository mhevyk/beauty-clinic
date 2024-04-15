import { useSignInMutation } from "@api/hooks";
import { SignInFormValues } from "@pages/SignInPage";
import { useUserStore } from "@store/user/userStore";
import showSnackbar from "@utils/showSnackbar";
import { useNavigate } from "react-router-dom";

export default function useSignIn() {
  const [signIn, { loading: isSigningIn }] = useSignInMutation();
  const navigate = useNavigate();
  const setAccessToken = useUserStore((store) => store.setAccessToken);

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
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occured";
      showSnackbar({ autohide: true, message: errorMessage });
    }
  };

  return [handleSignIn, { isSigningIn }] as const;
}
