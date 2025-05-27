import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { updateLocation } from "../../features/nonFunctional/nonFunctionalSlice";

const ProtectedRoute = ({ children }) => {
  const authRedux = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  if (authRedux.isUserLoggedIn) {
    return children;
  }

  dispatch(updateLocation("/"));
  return <Navigate to="/" />;
};

export default ProtectedRoute;
