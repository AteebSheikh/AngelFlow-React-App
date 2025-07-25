import React from "react";

const InputField = ({ label, value, type, onChange, name, maxlength }) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        maxlength={maxlength}
      />
    </div>
  );
};

export default InputField;
