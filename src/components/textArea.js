import React from "react";
import { TextArea } from "@thumbtack/thumbprint-react";

const TextField = ({
  label,
  placeholder,
  isDisabled,
  onChange,
  value,
  rows,
}) => {
  return (
    <label>
      {label}
      <TextArea
        className="text-area-box"
        placeholder={placeholder}
        onChange={onChange}
        rows={rows}
        value={value}
      />
    </label>
  );
};

export default TextField;
