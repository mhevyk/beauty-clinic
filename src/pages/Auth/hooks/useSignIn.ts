import { useSignInMutation } from "@api/hooks";
import { useUser } from "@context/AuthContext";
import { SignInFormValues } from "@pages/Auth/types";
import { useNavigate } from "react-router-dom";

export default function useSignIn() {
  const [signIn, { loading: isSigningIn }] = useSignInMutation();
  const navigate = useNavigate();
  const { authenticate } = useUser();

  const handleSignIn = async (values: SignInFormValues) => {
    try {
      const response = await signIn({ variables: { input: values } });
      const token = response.data?.signIn.token;

      if (!token) {
        throw new Error("Auth failed");
      }

      authenticate(token);
      navigate("/", { replace: true });
    } catch (error) {
      // TODO: use toast to display error
      console.log(error);
    }
  };

  return [handleSignIn, { isSigningIn }] as const;
}
