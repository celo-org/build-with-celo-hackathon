import React from "react";

const FileFields = ({
  label,
  placeholder,
  className,
  name,
  value,
  onChange,
  onBlur,
  error,
}) => {
  return (
    <div className={`${className}`}>
      <label class="label">
        <span class="text-white">{label}</span>
      </label>
      <input
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        value={value}
        type="file"
        placeholder="Type here"
        className="input input-bordered w-full"
        style={{
          backgroundColor: "#24272F",
          border: "2px dashed #3A3C43",
          borderRadius: "8px",
        }}
      />
      {error && (
        <p style={{ color: "red", margin: "0px" }}>
          <small>{error}</small>
        </p>
      )}
    </div>
  );
};

export default FileFields;
