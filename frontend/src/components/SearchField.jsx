import React, { useEffect, useState } from "react";

const SearchField = ({
  options,
  label,
  value,
  onChange,
  required = false,
  defaultOther = true,
  ...rest
}) => {
  const [inputValue, setInputValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (value !== inputValue) {
      if (options.includes(value)) {
        setInputValue(value);
      } else if (defaultOther) {
        setInputValue("Other");
      }
    }
  }, [value, options, inputValue]);

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    onChange(newValue);
    setShowDropdown(newValue !== ""); // Show dropdown if there's input
  };

  const handleOptionClick = (option) => {
    setInputValue(option);
    onChange(option);
    setShowDropdown(false); // Hide dropdown when an option is clicked
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px", width: "100%" }}>
      <div
        style={{
          fontSize: "clamp(12px, 0.8vw, 16px)",
          color: "#6c757d",
          textAlign: "left",
          marginLeft: "4px",
        }}
      >
        {label}
        {required && <span style={{ color: "red", marginLeft: "4px" }}>*</span>}
      </div>
      <div style={{ position: "relative", width: "100%" }}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setShowDropdown(true)} // Show dropdown on focus
          style={{
            width: "100%",
            height: "4vh",
            border: "1px solid #AEBECD",
            backgroundColor: "white",
            fontSize: "clamp(15px, 0.8vw, 24px)",
            borderRadius: "8px",
            padding: "8px 12px",
            boxSizing: "border-box",
          }}
          placeholder="Search..."
          {...rest}
        />
        {inputValue === "" && (
          <span
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#AEBECD",
            }}
          >
            🔍
          </span>
        )}
        {showDropdown && filteredOptions.length > 0 && (
          <ul
            style={{
              listStyleType: "none",
              margin: "4px 0 0",
              padding: "0",
              border: "1px solid #AEBECD",
              borderRadius: "8px",
              backgroundColor: "white",
              maxHeight: "200px",
              overflowY: "auto",
              position: "absolute",
              zIndex: 1,
              width: "100%",
            }}
          >
            {filteredOptions.map((option, index) => (
              <li
                key={index}
                onClick={() => handleOptionClick(option)}
                style={{
                  padding: "8px 12px",
                  cursor: "pointer",
                  fontSize: "clamp(15px, 0.8vw, 24px)",
                  borderBottom: "1px solid #AEBECD",
                }}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchField;
