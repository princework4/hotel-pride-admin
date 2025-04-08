export const TabsStyle = {
  marginTop: "30px",
  "& .MuiTabs-list": {
    justifyContent: "flex-start",
    flexWrap: "wrap",
    "& button": {
      minWidth: {
        xs: "80px",
      },
      minHeight: {
        xs: "30px",
      },
      padding: {
        xs: "10px",
      },
      border: "1px solid transparent",
      borderRadius: "25px",
      "&:hover": {
        border: "1px solid #b85042",
      },
      margin: "0px 15px 5px",
      fontSize: {
        xs: "0.7rem",
        // md: "0.875rem",
      },
    },
    // "& button:not(:first-of-type)": {
    // "& button:not(:nth-child(4n + 1))": {
    //   marginLeft: "10px",
    // },
    // "& button:nth-child(n + 5)": {
    //   marginTop: "10px",
    // },
    "& .Mui-selected": {
      border: "1px solid #b85042",
    },
    // "& .Mui-disabled": {
    //   color: "#fff",
    //   backgroundColor: "rgba(0, 0, 0, 0.38)",
    // },
    "& .already_selected": {
      border: "1px solid #b85042",
      backgroundColor: "#fff",
      color: "#b85042",
    },
  },
};
