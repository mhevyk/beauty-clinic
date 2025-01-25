import Spinner from "@/assets/icons/spinner.svg";

type AppSpinnerProps = {
  variant?: string;
};

// TODO: improve AppSpinner component
function AppSpinner({ variant = "#000" }: AppSpinnerProps) {
  return <Spinner stroke={variant} />;
}

export default AppSpinner;
