import "./Register.scss";
import { useState, useEffect } from "react";
import { register, reset } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, FormControl, OutlinedInput } from "@mui/material";
import missingImg from "../../assets/missing-profile.png";
import AddIcon from "@mui/icons-material/Add";
import Loader from "../../components/Loader/Loader";
import { toast } from "react-toastify";

function Register() {
  const [img, setImg] = useState("");
  const [imgToUpload, setImgToUpload] = useState("");
  const [imgUploading, setImgUploading] = useState(false);
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

  // upload to cloudinary
  const uploadImage = async () => {
    if (!imgToUpload) return;

    const data = new FormData();
    data.append("file", imgToUpload);
    data.append("upload_preset", "ml_default");
    data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_NAME);

    setImgUploading(true);

    const response = await fetch(
      process.env.REACT_APP_CLOUDINARY_LINK,
      {
        method: "post",
        body: data,
      }
    );

    const { url } = await response.json();

    
    setImgUploading(false);
    return url
  };

  const changeImage = (e) => {
    const file = e.target.files[0];
    setImgToUpload(file);
    setFilesToBase(file);
  };

  const setFilesToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImg(reader.result);
    };
  };

  const changeHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const imageUrl = await uploadImage();

    const userData = {
      image: imageUrl,
      name,
      email,
      password,
      passwordConfirmation,
    };

    dispatch(register(userData));
  };


  return (
    <div className="register-page">
      {(isLoading || imgUploading) && <Loader />}
      <form onSubmit={submitHandler} className="register__form">
        <div className="register__waves" />
        <div className="register-image-container">
          <img className="register__img" src={img || missingImg} alt="upload" />
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
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
              "&:hover": { backgroundColor: "#2ed573" },
            }}
          >
            <AddIcon />
            <input hidden accept="image/*" type="file" onChange={changeImage} />
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
          <p className="login__create">
            Already have an account?{" "}
            <Link to={"/login"}>
              {" "}
              <b className="login__create--bold">Login</b>{" "}
            </Link>{" "}
          </p>
        </section>
      </form>
    </div>
  );
}

export default Register;

