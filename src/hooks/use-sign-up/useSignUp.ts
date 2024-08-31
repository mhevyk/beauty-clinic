import { useNavigate } from "react-router-dom";

import { useSignUpMutation } from "@/api/generated";
import { SignUpFormValues } from "@/pages/sign-up/SignUpPage.types";
import { useUserStore } from "@/store/user/userStore";
import extractErrorMessage from "@/utils/extract-error-message/extractErrorMessage";
import showSnackbar from "@/utils/show-snackbar/showSnackbar";

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
      showSnackbar({ autohide: true, message: extractErrorMessage(error) });
    }
  };

  return [handleSignUp, { isSigningUp }] as const;
}
