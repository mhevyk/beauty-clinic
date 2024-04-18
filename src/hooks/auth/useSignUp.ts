import { useSignUpMutation } from "@api/hooks";
import { SignUpFormValues } from "@pages/SignUpPage";
import { useUserStore } from "@store/user/userStore";
import showSnackbar from "@utils/showSnackbar";
import { useNavigate } from "react-router-dom";

export default function useSignUp() {
  const [signUp, { loading: isSigningUp }] = useSignUpMutation();
  const navigate = useNavigate();
  const setAccessToken = useUserStore(store => store.setAccessToken);

  const handleSignUp = async (values: SignUpFormValues) => {
    try {
      const signUpInput = {
        username: values.username,
        email: values.email,
        password: values.password,
        phoneNumber: values.phoneNumber || null,
      };

      const response = await signUp({ variables: { input: signUpInput } });
      const token = response.data?.signUp.token;

      if (!token) {
        throw new Error("SignUp failed");
      }

      setAccessToken(token);
      navigate("/", { replace: true });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occured";
      showSnackbar({ autohide: true, message: errorMessage });
    }
  };

  return [handleSignUp, { isSigningUp }] as const;
}