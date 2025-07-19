import * as React from "react";
import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import { TextFieldStyle } from "../../MUIStyle/TextField";
import { CustomButtonStyle } from "../../MUIStyle/Button";
import { toast } from "react-toastify";
import { loginUser } from "../../services/Auth";
import { useDispatch, useSelector } from "react-redux";
import {
  updateIsUserLoggedIn,
  updateLoggedInUser,
  updateLoggedInUserType,
} from "../../features/auth/authSlice";
import "./Login.css";
import {
  ADMIN,
  ADMIN_EMAIL,
  RESERVATION,
  RESERVATION_EMAIL,
} from "../../constants";
import { updateLocation } from "../../features/nonFunctional/nonFunctionalSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogInForm = () => {
  const authRedux = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const [loginDetails, setLoginDetails] = React.useState({
    email: "",
    password: "",
  });
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (authRedux.isUserLoggedIn) {
      if (location.pathname === "/admin/login") navigate("/customer");
      else navigate(-1);
    }
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginDetails((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  }

  function updateUserType(data) {
    if (data.email === RESERVATION_EMAIL) return RESERVATION;
    else if (data.email === ADMIN_EMAIL) return ADMIN;
  }

  async function handleClick() {
    if (loginDetails.email.includes("reservation")) {
      const response = await loginUser(loginDetails);
      if (response?.status === 200) {
        setError("");
        dispatch(updateLoggedInUser(response.data));
        dispatch(updateIsUserLoggedIn(true));
        dispatch(updateLoggedInUserType(updateUserType(response.data)));
        toast.success("Logged In Successfully");
        navigate("/customer");
        sessionStorage.setItem(
          "userObj",
          JSON.stringify({
            id: response.data.id,
            name: response.data.name,
            email: response.data.email,
            isLoggedIn: true,
            loggedInUserType: updateUserType(response.data),
          })
        );
      } else if (response?.statusCode === 400 || response?.statusCode === 404) {
        setError(response?.message);
      } else {
        setError("");
        toast.error(
          response?.message ||
            response?.error ||
            "Can't login now. Please try again later."
        );
      }
    } else {
      toast.error("Invalid Credentials");
    }
    setLoginDetails({
      email: "",
      password: "",
    });
  }

  useEffect(() => {
    dispatch(updateLocation(window.location.pathname));
  }, []);

  return (
    <Box
      sx={{
        width: "500px",
        padding: "25px",
        borderRadius: "20px",
        margin: "20px auto 0",
        backgroundColor: "background.paper",
      }}
    >
      <Typography
        style={{
          color: "var(--sage)",
          fontSize: "25px",
          fontWeight: "bolder",
        }}
      >
        Login
      </Typography>
      <Box className="login">
        <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth>
          <TextField
            type="email"
            name="email"
            label="Email / Mobile"
            variant="outlined"
            value={loginDetails.email}
            onChange={handleChange}
            sx={TextFieldStyle}
          />
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth>
          <TextField
            type="password"
            name="password"
            label="Password"
            variant="outlined"
            value={loginDetails.password}
            onChange={handleChange}
            sx={TextFieldStyle}
          />
        </FormControl>
        {error && (
          <Typography
            color="error"
            sx={{ fontSize: "12px", fontFamily: '"Poppins", sans-serif' }}
          >
            {error}
          </Typography>
        )}
        <Button
          type="submit"
          className="login_btn"
          variant="contained"
          fullWidth
          sx={CustomButtonStyle}
          onClick={handleClick}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default LogInForm;
