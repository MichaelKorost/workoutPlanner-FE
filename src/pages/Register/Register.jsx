import { useState, useEffect } from "react";
import Spinner from "../../components/Spinner/Spinner";
import { register, reset } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const { email, password, passwordConfirmation } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );


  useEffect(() => {
    if (isError) {
      alert(message);
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

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      alert("Passwords do not match");
    } else {
      const userData = {
        email,
        password,
        passwordConfirmation,
      };
      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div>WorkoutPlanner</div>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={changeHandler}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={changeHandler}
          />
        </div>
        <div>
          <label htmlFor="passwordConfirmation">Confirm Password:</label>
          <input
            type="password"
            id="passwordConfirmation"
            name="passwordConfirmation"
            value={passwordConfirmation}
            onChange={changeHandler}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default Register;
