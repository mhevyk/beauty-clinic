import Spinner from "@/assets/icons/spinner.svg";

type AppSpinnerProps = {
  variant: string;
};

function AppSpinner({ variant }: AppSpinnerProps) {
  return <Spinner stroke={variant} />;
}

export default AppSpinner;
