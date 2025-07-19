import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { updateLocation } from "../../features/nonFunctional/nonFunctionalSlice";
import { RESERVATION } from "../../constants";
import {
  updateIsUserLoggedIn,
  updateLoggedInUser,
  updateLoggedInUserType,
} from "../../features/auth/authSlice";

const ProtectedRoute = ({ children }) => {
  const authRedux = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (sessionStorage.getItem("userObj")) {
      const obj = JSON.parse(sessionStorage.getItem("userObj"));
      dispatch(updateLoggedInUser(obj));
      dispatch(updateIsUserLoggedIn(obj.isLoggedIn));
      dispatch(updateLoggedInUserType(obj.loggedInUserType));
    }
  }, []);

  if (authRedux.isUserLoggedIn && authRedux.loggedInUserType == RESERVATION) {
    return children;
  }

  // dispatch(updateLocation("/"));
  return <Navigate to="/" />;
};

export default ProtectedRoute;
