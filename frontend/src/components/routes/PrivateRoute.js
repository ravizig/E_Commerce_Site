import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/Auth";
import { Spinner } from "../Spinner";
import { Outlet } from "react-router-dom";
import axios from "axios";

export const PrivateRoute = () => {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {

    const authCheck = async () => {

      const data = localStorage.getItem('auth')

      const parseData = await JSON.parse(data)

      const userId = parseData?.user?.id;

      const user = await axios.get(`${process.env.REACT_APP_API}/api/auth/get-users/${userId}`);

      if (user?.data?.success) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) {
      authCheck();
    }
  }, [auth?.token, ok]);

  return ok ? <Outlet /> : <Spinner />;
};
