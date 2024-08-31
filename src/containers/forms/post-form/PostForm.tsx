import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { Editor as TinyMCEEditor } from "tinymce";

import { useGetPostCategoriesQuery } from "@/api/generated";
import ButtonWithSpinner from "@/components/button-with-spinner/ButtonWithSpinner.tsx";
import FormGroupWithError from "@/components/form-group-with-error/FormGroupWithError";
import { defaultPostFormValues } from "@/containers/forms/post-form/PostForm.constants";
import { Form } from "@/containers/forms/post-form/PostForm.styles";
import { PostFormValues } from "@/containers/forms/post-form/PostForm.types";
import PostEditor from "@/containers/post-editor/PostEditor";
import postFormValidationSchema from "@/validation/postFormValidationSchema";

// TODO: make better styles
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type PostFormProps = {
  initialValues?: Partial<PostFormValues>;
  handleSubmit: (values: PostFormValues) => Promise<void>;
  isFormSubmitting?: boolean;
};

export default function PostForm({
  initialValues,
  handleSubmit: customHandleSubmit,
  isFormSubmitting,
}: PostFormProps) {
  const { data } = useGetPostCategoriesQuery();

  const handleFormSubmitWithReset = async (values: PostFormValues) => {
    try {
      await customHandleSubmit(values);
      resetForm();
    } catch (error) {
      // TODO: handle error
      console.error(error);
    }
  };

  // TODO: use custom hook and try to use ref-approach for better performance
  const {
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    setValues,
    errors,
    resetForm,
  } = useFormik<PostFormValues>({
    onSubmit: handleFormSubmitWithReset,
    initialValues: { ...defaultPostFormValues, ...initialValues },
    validationSchema: postFormValidationSchema,
    validateOnMount: false,
    validateOnBlur: false,
    validateOnChange: false,
  });

  const handlePostEditorChange = (content: string, editor: TinyMCEEditor) => {
    const wordsCount = editor.plugins.wordcount!.body.getWordCount();

    setValues({ ...values, content, wordsCount });
  };

  const handleCategoryChange = (event: SelectChangeEvent<number[]>) => {
    setFieldValue("categoryIds", event.target.value);
  };

  const categories = data?.categories ?? [];

  const categoriesMap = new Map(
    categories.map(category => [category.id, category])
  );

  const renderCategoryValue = (selectedCategoryIds: number[]) => {
    return (
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
        {selectedCategoryIds.map(selectedCategoryId => {
          const category = categoriesMap.get(selectedCategoryId)!;
          return <Chip key={category.id} label={category.name} />;
        })}
      </Box>
    );
  };

  const isEditMode = Boolean(initialValues);

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroupWithError errorMessage={errors.title}>
        <InputLabel htmlFor="title">Title*</InputLabel>
        <TextField
          size="small"
          type="text"
          id="title"
          name="title"
          value={values.title}
          onChange={handleChange}
        />
      </FormGroupWithError>
      <FormGroupWithError>
        <InputLabel htmlFor="categoryIds">Categories*</InputLabel>
        <Select
          labelId="categoryIds"
          multiple
          value={values.categoryIds}
          onChange={handleCategoryChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={renderCategoryValue}
          MenuProps={MenuProps}
        >
          {categories.map(category => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormGroupWithError>
      <FormGroupWithError errorMessage={errors.content}>
        <InputLabel>
          Content*
          <PostEditor
            value={values.content}
            onChange={handlePostEditorChange}
            previewData={{ title: values.title }}
          />
        </InputLabel>
      </FormGroupWithError>
      <ButtonWithSpinner
        variant="primary"
        type="submit"
        loading={isFormSubmitting}
        sx={{ width: "fit-content" }}
      >
        {isEditMode ? "Save changes" : "Create"}
      </ButtonWithSpinner>
    </Form>
  );
}
