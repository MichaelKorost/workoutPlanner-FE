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

// Login user
// const login = async (userData) => {
//   try {
//     const response = await axios.post(`${API_URL}/users/login`, userData);
//     console.log(response);
//     if (!response.data.message) {
//       localStorage.setItem("user", JSON.stringify(response.data));
//       return response.data;
//     } else {
//       console.log(response.data);
//     }
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// };
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
    throw new Error("error bruh");
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
};

export default authService;
