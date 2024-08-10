import { useFormikContext } from "formik";

import ButtonWithSpinner from "@/components/button-with-spinner/ButtonWithSpinner";

type NextPageButtonProps = {
  hasNextPage: boolean;
  openNextPage: () => void;
  loading: boolean;
};

export default function NextPageButton({
  hasNextPage,
  openNextPage,
  loading,
}: NextPageButtonProps) {
  const { handleSubmit, validateForm } = useFormikContext();

  async function handleNextPage() {
    if (!hasNextPage) {
      return handleSubmit();
    }

    const errors = await validateForm();
    
    if (Object.keys(errors).length === 0) {
      openNextPage();
    }
  }

  return (
    <ButtonWithSpinner
      variant="primary"
      size="small"
      fullWidth
      onClick={handleNextPage}
      loading={loading}
    >
      {hasNextPage ? "Next" : "Sign up"}
    </ButtonWithSpinner>
  );
}
