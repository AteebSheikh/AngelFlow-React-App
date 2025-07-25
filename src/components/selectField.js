import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";
import CrossIcon from "../assets/images/curatorCross.svg";

const SelectField = ({
  title,
  options,
  isMulti,
  className,
  handleChange,
  defaultValue,
  value,
  isSearchable,
  handleDelete,
  setInputValue,
  inputValue,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = (e) => {
    if (className === "curator-selectField")
      setInputValue({ ...inputValue, curators: "" });
  };
  return (
    <>
      <label>{title}</label>

      <CreatableSelect
        isMulti={isMulti}
        className={`custom-select ${className}`}
        classNamePrefix="select"
        isLoading={isLoading}
        isSearchable={isSearchable}
        name="color"
        onKeyDown={(e) => handleCreate(e)}
        options={options}
        defaultValue={defaultValue}
        value={value}
        onChange={handleChange}
        placeholder=""
      />
      {className === "curator-selectField" &&
      value != undefined &&
      value != "" ? (
        <svg
          height="14"
          width="14"
          viewBox="0 0 20 20"
          aria-hidden="true"
          focusable="false"
          className="css-tj5bde-Svg curatorCross"
          onClick={() => handleDelete()}
        >
          <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
        </svg>
      ) : (
        <></>
      )}

      <div
        style={{
          color: "hsl(0, 0%, 40%)",
          display: "inline-block",
          fontSize: 12,
          fontStyle: "italic",
          marginTop: "1em",
        }}
      ></div>
    </>
  );
};
export default SelectField;
