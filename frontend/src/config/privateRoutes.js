import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import cookie from "cookie";

const PrivateRoute = ({ children, requiredRole }) => {
  const [isAuthorized, setIsAuthorized] = useState(null); // null indicates loading state

  useEffect(() => {
    const verifyUser = async () => {
      try {
        // Parse cookies to get the auth token
        const cookies = cookie.parse(document.cookie);
        const authToken = cookies.authToken;

        if (!authToken) {
          setIsAuthorized(false); // No token, unauthorized
          return;
        }

        // Verify token with the backend
        const response = await axios.post(
          "http://localhost:9000/user/verify",
          {},
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );

        const { role } = response.data;

        // Check if the role matches the required role
        if (role === requiredRole) {
          setIsAuthorized(true); // Authorized
        } else {
          setIsAuthorized(false); // Role mismatch, unauthorized
        }
      } catch (error) {
        console.error("Error verifying user:", error);
        setIsAuthorized(false); // Verification failed, unauthorized
      }
    };

    verifyUser();
  }, [requiredRole]);

  // While loading, render nothing or a loading spinner
  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  // Redirect to login if not authorized
  if (!isAuthorized) {
    return <Navigate to="/LoginPage" replace />;
  }

  // Render the child component if authorized
  return children;
};

export default PrivateRoute;
