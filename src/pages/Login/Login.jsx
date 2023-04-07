import { useState, useEffect } from "react";
import { login, reset } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";
import Loader from "../../components/Loader/Loader";
import { Button, FormControl, OutlinedInput } from "@mui/material";
import weightLifting from "../../assets/undraw_healthy_habit_kwe6.svg";
import Tilt from "react-parallax-tilt";
import { toast } from "react-toastify";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const changeHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDemoUser = () => {
    const demoEmail = process.env.REACT_APP_DEMO_USER;
    const demoPassword = process.env.REACT_APP_DEMO_PASSWORD;
    const userData = {
      email:demoEmail,
      password: demoPassword,
    };
    dispatch(login(userData));
  }

  const submitHandler = (e) => {
    e.preventDefault();

    if (!(email && password)) {
      toast.error("Please fill all fields");
      return;
    }

    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };



  return (
    <div className="login-page">
      {isLoading && <Loader />}
      <form onSubmit={submitHandler} className="login__form">
        <div className="register__waves" />
        <Tilt
          className="login__header"
          perspective={2800}
          tiltMaxAngleX={10}
          scale={1.05}
          tiltMaxAngleY={10}
        >
          <img className="login__image" src={weightLifting} alt="exercise" />
          <div className="login__title">
            <div>{"Workout Planner"}</div>
          </div>
        </Tilt>

        <section className="login__typography">
          <h1 className="login__heading">Hello</h1>
          <p className="login__subtitle">Sign in to your account</p>
        </section>
        <section className="register__inputs">
          <FormControl sx={{ width: "100%" }} variant="outlined">
            <OutlinedInput
              sx={{
                fontSize: "18px",
                borderRadius: "26px",
                backgroundColor: "white",
              }}
              placeholder={"Email"}
              type={"email"}
              value={email}
              name="email"
              onChange={changeHandler}
            />
          </FormControl>

          <FormControl sx={{ width: "100%" }} variant="outlined">
            <OutlinedInput
              sx={{
                fontSize: "18px",
                borderRadius: "26px",
                backgroundColor: "white",
              }}
              placeholder={"Password"}
              type="password"
              value={password}
              name="password"
              onChange={changeHandler}
            />
          </FormControl>

          <p className="login__forgot-password">Forgot your password?</p>

          <section className="login-buttons-container">
            <Button
              type="submit"
              sx={{
                height: "44px",
                borderRadius: "26px",
                width: "50%",
                color: "white",
                fontSize: "20px",
                fontFamily: "Manrope, sans-serif",
                fontWeight: "800",
                margin: " 10px 0 0 0",
                boxShadow:
                  "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow:
                    "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
                },
              }}
              className="register__button"
            >
              Login
            </Button>
            <Button
              type="button"
              onClick={handleDemoUser}
              sx={{
                height: "44px",
                borderRadius: "26px",
                width: "50%",
                color: "white",
                fontSize: "20px",
                fontFamily: "Manrope, sans-serif",
                fontWeight: "800",
                margin: " 10px 0 0 0",
                boxShadow:
                  "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow:
                    "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
                },
              }}
              className="register__button"
            >
              Demo
            </Button>
          </section>

          <p className="login__create">
            Don't have an account?{" "}
            <Link to={"/register"}>
              {" "}
              <b className="login__create--bold">Create</b>{" "}
            </Link>{" "}
          </p>
        </section>
      </form>
    </div>
  );
}

export default Login;

