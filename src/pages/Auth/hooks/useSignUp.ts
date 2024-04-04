import { useSignUpMutation } from "@api/hooks";
import { useUser } from "@context/AuthContext";
import { SignUpFormValues } from "@pages/Auth/types";
import { useNavigate } from "react-router-dom";

export default function useSignUp() {
  const [signUp, { loading: isSigningUp }] = useSignUpMutation();
  const navigate = useNavigate();
  const { authenticate } = useUser();

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

      authenticate(token);
      navigate("/", { replace: true });
    } catch (error) {
      // TODO: use toast to display error
      console.log(error);
    }
  };

  return [handleSignUp, { isSigningUp }] as const;
}
