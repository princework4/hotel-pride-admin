export const TextFieldStyle = {
  "& label": {
    fontSize: "14px",
    // transform: "translate(14px, 12px)",
  },
  "& label.Mui-focused": {
    color: "#c4b991",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#c4b991",
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
      borderColor: "#c4b991",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#c4b991",
    },
  },
};
