import axios from "axios";

const API_URL = `https://workout-planner-be.vercel.app/api`;

//  Register user
const register = async (userData) => {
  const response = await axios.post(`${API_URL}/users/register`, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const updateUsername = async (newName, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    `${API_URL}/users/me`,
    { name: newName },
    config
  );

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const updateImage = async (newImage, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    `${API_URL}/users/img`,
    { image: newImage },
    config
  );

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, userData);
    console.log(response);
    if (response.data.message) {
      throw new Error();
    }
    localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Email or password are incorrect");
  }
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
  updateUsername,
  updateImage,
};

export default authService;
