import { useSignInMutation } from "@api/hooks";
import { SignInFormValues } from "@pages/Auth/types";
import { useUserStore } from "@store/user/userStore";
import { useNavigate } from "react-router-dom";

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
      // TODO: use toast to display error
      console.log(error);
    }
  };

  return [handleSignIn, { isSigningIn }] as const;
}
