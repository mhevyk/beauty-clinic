import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import classnames from "classnames";

import AppFormControl from "@/styles/app-form-control/AppFormControl";
import "@/styles/app-textarea/AppTextarea.scss";
import { AppTextareaProps } from "@/styles/app-textarea/AppTextarea.types";

const AppTextarea = forwardRef<HTMLTextAreaElement, AppTextareaProps>(function (
  {
    isAutoresisable = false,
    rows = 5,
    value: valueFromProps,
    onChange,
    defaultValue,
    variant,
    label,
    helperText,
    errorMessage,
    controlRef,
    ...props
  },
  ref
) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [internalValue, setInternalValue] = useState(
    defaultValue?.toString() ?? ""
  );

  const value = valueFromProps?.toString() ?? internalValue;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(event);
    } else {
      setInternalValue(event.target.value);
    }
  };

  useEffect(() => {
    const textarea = textareaRef.current;

    if (!textarea) {
      return;
    }

    if (isAutoresisable) {
      // IMPORTANT: first set to heigt is needed to avoid lags
      textarea.style.height = "min-content";
      textarea.style.height = `${textarea.scrollHeight}px`;
    } else {
      // autoscroll to bottom when user adds new content
      textarea.scrollTop = textarea.scrollHeight;
    }
  }, [value, isAutoresisable]);

  useImperativeHandle(ref, () => textareaRef.current as HTMLTextAreaElement);

  return (
    <AppFormControl
      ref={controlRef}
      className={classnames("app-textarea", `app-textarea__${variant}`)}
      control={
        <textarea
          ref={textareaRef}
          rows={rows}
          value={value}
          onChange={handleChange}
          {...props}
        />
      }
      errorMessage={errorMessage}
      helperText={helperText}
      label={label}
    />
  );
});

AppTextarea.displayName = "AppTextarea";

export default AppTextarea;
