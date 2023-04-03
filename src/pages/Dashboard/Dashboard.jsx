import { useState, useEffect } from "react";
import Spinner from "../../components/Spinner/Spinner";
import { login, reset } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Test from "../Test/Test";
import Loader from "../../components/Loader/Loader";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );




  return (
    <>
    {isLoading && <Loader />}
      <Navbar />
      <h1>hello, {user?.name}</h1>
      <Test />
    </>
  );
}

export default Dashboard;
