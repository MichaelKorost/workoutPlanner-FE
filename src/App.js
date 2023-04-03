import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import Calendar from "./pages/Calendar/Calendar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Exercise from "./pages/Exercise/Exercise";
import Exercises from "./pages/Exercises/Exercises";

import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register/Register";
import UserWorkouts from "./pages/UserWorkouts/UserWorkouts";
import Workout from "./pages/Workout/Workout";
import WorkoutCreate from "./pages/WorkoutCreate/WorkoutCreate";

import Workouts from "./pages/Workouts/Workouts";
import WorkoutsToday from "./pages/WorkoutsToday/WorkoutsToday";
import WorkoutEditMiddleMan from "./pages/WorkoutEditMiddleMan.jsx/WorkoutEditMiddleMan";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/exercises/*"
            element={
              <div>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Exercises />} />
                  <Route path="id/:id" element={<Exercise />} />
                </Routes>
              </div>
            }
          />
          <Route
            path="/workouts/*"
            element={
              <div>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Workouts />} />
                  <Route path="new" element={<WorkoutCreate />} />
                  <Route path="my" element={<UserWorkouts />} />
                  <Route path="today" element={<WorkoutsToday />} />
                  <Route path="id/:id" element={<Workout />} />
                  <Route
                    path="edit/id/:id"
                    element={<WorkoutEditMiddleMan />}
                  />
                </Routes>
              </div>
            }
          />
          <Route
            path="/calendar"
            element={
              <div>
                <Navbar />
                <Calendar />
              </div>
            }
          />
          <Route
            path="/profile"
            element={
              <div>
                <Navbar />
                <Profile />
              </div>
            }
          />
        </Routes>
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={true}
        closeOnClick
        style={{ marginTop: "54px" }}
      />
    </div>
  );
}

export default App;
