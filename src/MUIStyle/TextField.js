export const TextFieldStyle = {
  "& label": {
    fontSize: "14px",
    // transform: "translate(14px, 12px)",
  },
  "& label.Mui-focused": {
    color: "#b85042",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#b85042",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "30px",
    backgroundColor: "#fff",
    "& input": {
      padding: "16.5 14px",
    },
    "& fieldset": {
      borderColor: "rgba(0, 0, 0, 0.23)",
    },
    "&:hover fieldset": {
      borderColor: "#b85042",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#b85042",
    },
  },
};
