import Button, { ButtonProps } from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

type ButtonWithSpinnerProps = ButtonProps & {
  loading?: boolean;
};

type SpinnerBySizeDetails = {
  size: number;
  marginLeft: string;
};

// TODO: change for large sizes if needed
const spinnerSizes: Record<
  NonNullable<ButtonProps["size"]>,
  SpinnerBySizeDetails
> = {
  small: {
    size: 16,
    marginLeft: "3px",
  },
  medium: {
    size: 20,
    marginLeft: "5px",
  },
  large: {
    size: 25,
    marginLeft: "10px",
  },
};

export default function ButtonWithSpinner({
  loading = false,
  ...props
}: ButtonWithSpinnerProps) {
  const { size, marginLeft } = spinnerSizes[props.size ?? "medium"];

  return (
    <Button
      endIcon={loading && <CircularProgress size={size} sx={{ marginLeft }} />}
      {...props}
    />
  );
}
