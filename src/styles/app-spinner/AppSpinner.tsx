import Spinner from "@/assets/icons/spinner.svg";

type AppButtonProps = {
  theme: string;
};

function AppSpinner({ theme }: AppButtonProps) {
  return <Spinner stroke={theme} />;
}

export default AppSpinner;
