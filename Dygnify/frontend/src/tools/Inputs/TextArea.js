import React from "react";

const TextArea = ({
  label,
  placeholder,
  className,
  name,
  value,
  onChange,
  onBlur,
  error,
  reference,
}) => {
  return (
    <div className={`${className}`}>
      <label class="label">
        <span class="text-white">{label}</span>
      </label>
      <textarea
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        value={value}
        placeholder={placeholder}
        class={`textarea textarea-bordered h-36 ${className}`}
        style={{
          backgroundColor: "#24272F",
          border: "2px solid #3A3C43",
          borderRadius: "8px",
        }}
        ref={reference}
      />
      {error && (
        <p style={{ color: "red", margin: "0px" }}>
          <small>{error}</small>
        </p>
      )}
    </div>
  );
};

export default TextArea;
