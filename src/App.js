import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Exercise from "./pages/Exercise/Exercise";
import Exercises from "./pages/Exercises/Exercises";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

function App() {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <Routes>
          {/* <Route path="/exercises" element={<Home />} /> */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/exercises/id/:id" element={<Exercise />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
