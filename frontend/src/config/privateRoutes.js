import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import useUserStore from "../ZustState/User";

const PrivateRoute = ({ children, requiredRole }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const authToken = useUserStore((state) => state.userToken);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        if (!authToken) {
          setIsAuthorized(false);
          return;
        }

        const response = await axios.post(
          "http://localhost:9000/user/verify",
          {},
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );

        const { role } = response.data;

        if (role === requiredRole) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        console.error("Error verifying user:", error);
        setIsAuthorized(false);
      }
    };

    verifyUser();
  }, [requiredRole, authToken]);

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthorized) {
    return <Navigate to="/LoginPage" replace />;
  }

  return children;
};

export default PrivateRoute;
