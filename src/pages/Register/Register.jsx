import "./Register.scss";
import { useState, useEffect } from "react";
import { register, reset } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, FormControl, OutlinedInput } from "@mui/material";
import missingImg from "../../assets/missing-profile.png";
import AddIcon from "@mui/icons-material/Add";
import Loader from "../../components/Loader/Loader";
import { toast } from "react-toastify";

function Register() {
  const [image, setImage] = useState();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const { name, email, password, passwordConfirmation } = formData;

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

    if (isSuccess) {
      toast.success(`welcome ${user.name}`);
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  // handle and convert to base 64
  const handleImage = (e) => {
    const file = e.target.files[0];
    setFilesToBase(file);
    console.log(file);
  };

  const setFilesToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const changeHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const userData = {
      pic:image,
      name,
      email,
      password,
      passwordConfirmation,
    };
  
    dispatch(register(userData));
  };

  return (
    <div className="register-page">
      {isLoading && <Loader />}
      <form onSubmit={submitHandler} className="register__form">
        <div className="register__waves" />
        <div className="register-image-container">
          <img
            className="register__img"
            src={image ? image : missingImg}
            alt="upload"
          />
          <Button
            variant="contained"
            component="label"
            sx={{
              position: "absolute",
              bottom: "0",
              right: "0",
              backgroundColor: "#7f8c8d",
              borderRadius: "50%",
              minWidth: "40px",
              minHeight: "40px",
              padding: "0",
              "&:hover": { backgroundColor: "#2ed573" },
            }}
          >
            <AddIcon />
            <input hidden accept="image/*" type="file" onChange={handleImage} />
          </Button>
        </div>
        <section className="register__inputs">
          <FormControl sx={{ width: "100%" }} variant="outlined">
            <OutlinedInput
              sx={{
                fontSize: "18px",
                borderRadius: "26px",
                backgroundColor: "white",
              }}
              placeholder={"First Name"}
              type={"text"}
              value={name}
              name="name"
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
              placeholder={"Email"}
              type="email"
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

          <FormControl sx={{ width: "100%" }} variant="outlined">
            <OutlinedInput
              sx={{
                fontSize: "18px",
                borderRadius: "26px",
                backgroundColor: "white",
              }}
              placeholder={"Confirm Password"}
              type="password"
              value={passwordConfirmation}
              name="passwordConfirmation"
              onChange={changeHandler}
            />
          </FormControl>

          <Button
            type="submit"
            sx={{
              height: "44px",
              borderRadius: "26px",
              width: "200px",
              color: "white",
              fontSize: "20px",
              fontFamily: "Manrope, sans-serif",
              fontWeight: "800",
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
            Register
          </Button>
        </section>
      </form>
    </div>
  );
}

export default Register;

/*
<>
      <div>WorkoutPlanner</div>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="name">name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={changeHandler}
          />
        </div>
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
*/
