import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";

import { useGetPostCategoriesQuery } from "@/api/generated";
import FormGroupWithError from "@/components/form-group-with-error/FormGroupWithError";
import { defaultPostFormValues } from "@/containers/forms/post-form/PostForm.constants";
import { Form } from "@/containers/forms/post-form/PostForm.styles";
import { PostFormValues } from "@/containers/forms/post-form/PostForm.types";
import PostEditor from "@/containers/post-editor/PostEditor";
import postFormValidationSchema from "@/validation/postFormValidationSchema";

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
  handleSubmit: (values: PostFormValues) => void;
};

export default function PostForm({
  initialValues = {},
  handleSubmit: submitHandler,
}: PostFormProps) {
  const { data } = useGetPostCategoriesQuery();

  const { values, handleChange, handleSubmit, setFieldValue, errors } =
    useFormik<PostFormValues>({
      onSubmit: submitHandler,
      initialValues: { ...defaultPostFormValues, ...initialValues },
      validationSchema: postFormValidationSchema,
      validateOnMount: false,
      validateOnBlur: false,
      validateOnChange: false,
    });

  const categories = data?.categories ?? [];

  const categoriesMap = new Map(
    categories.map(category => [category.id, category])
  );

  const isEditMode = Object.keys(initialValues).length > 0;

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
          onChange={event => setFieldValue("categoryIds", event.target.value)}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={selectedCategoryIds => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selectedCategoryIds.map(selectedCategoryId => {
                const category = categoriesMap.get(selectedCategoryId)!;
                return <Chip key={category.id} label={category.name} />;
              })}
            </Box>
          )}
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
            onChange={value => setFieldValue("content", value)}
            previewData={{ title: values.title }}
          />
        </InputLabel>
      </FormGroupWithError>
      <Button variant="primary" type="submit" sx={{ width: "fit-content" }}>
        {isEditMode ? "Save changes" : "Create"}
      </Button>
    </Form>
  );
}
