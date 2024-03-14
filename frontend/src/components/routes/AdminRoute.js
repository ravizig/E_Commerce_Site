import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/Auth";
import { Spinner } from "../Spinner";
import { Outlet } from "react-router-dom";
import axios from "axios";

export const AdminRoute = () => {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {

      const data = localStorage.getItem('auth')

      const parseData = JSON.parse(data)

      const userId = parseData?.user?.id;

      const user = await axios.get(`${process.env.REACT_APP_API}/api/auth/get-users/${userId}`);

      if (user?.data?.success) {
        if (user?.data?.user?.role == 1) {
          setOk(true);
          return
        }
      }
      setOk(false);

    };

    if (auth?.token) {
      authCheck();
    }

  }, [auth?.token, ok]);

  return ok ? <Outlet /> : <Spinner text="You are not Admin, Please Login with Admin Credentials" num={2}/>;
};
