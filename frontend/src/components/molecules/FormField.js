import React from "react";
import clsx from "clsx";
import Label from "../atoms/Label";
import Input from "../atoms/Input";
import Select from "../atoms/Select";
import { formStyles } from "../../utils/styles";

const FormField = ({
  label,
  type = "input",
  value,
  onChange,
  placeholder = "",
  options = [],
  className = "",
  inputClassName = "",
  ...props
}) => {
  const renderInput = () => {
    if (type === "select") {
      return (
        <Select
          value={value}
          onChange={onChange}
          className={clsx(inputClassName)}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value || option} value={option.value || option}>
              {option.label || option}
            </option>
          ))}
        </Select>
      );
    }

    if (type === "textarea") {
      return (
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={clsx(formStyles.textarea, inputClassName)}
          rows={3}
          style={{
            minHeight: "4rem",
            maxHeight: "300px", // Match the node height limit minus padding
            height: "auto",
            overflow: "hidden", // Only show scrollbar when maxHeight is reached
            resize: "none",
          }}
          onInput={(e) => {
            // Auto-resize textarea to fit content
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight + "px";

            // Show scrollbar only when content exceeds maxHeight
            if (e.target.scrollHeight > 300) {
              e.target.style.overflow = "auto";
            } else {
              e.target.style.overflow = "hidden";
            }
          }}
          {...props}
        />
      );
    }

    return (
      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={clsx(inputClassName)}
        {...props}
      />
    );
  };

  return (
    <div className={clsx(formStyles.container, className)}>
      <Label>{label}</Label>
      <div className={formStyles.fieldWrapper}>{renderInput()}</div>
    </div>
  );
};

export default FormField;
