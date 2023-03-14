import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Calendar from "./pages/Calendar/Calendar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Exercise from "./pages/Exercise/Exercise";
import Exercises from "./pages/Exercises/Exercises";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import UserWorkouts from "./pages/UserWorkouts/UserWorkouts";
import WorkoutCreate from "./pages/WorkoutCreate/WorkoutCreate";
import Workouts from "./pages/Workouts/Workouts";

function App() {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <Routes>
          {/* <Route path="/exercises" element={<Home />} /> */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/exercises/id/:id" element={<Exercise />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/workouts/new" element={<WorkoutCreate />} />
          <Route path="/workouts/my" element={<UserWorkouts />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
