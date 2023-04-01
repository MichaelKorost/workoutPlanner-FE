import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {logout, reset} from '../../features/auth/authSlice'
  
import Logo from "../../assets/logoipsum-258.svg";
import missingImg from "../../assets/missing-profile.png";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import SportsGymnasticsIcon from "@mui/icons-material/SportsGymnastics";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import TodayIcon from "@mui/icons-material/Today";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import TimelineIcon from "@mui/icons-material/Timeline";
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import Loader from "../Loader/Loader";

// TODO: Add a logo to the navbar

const Navbar = () => {
  const { user, isLoading } = useSelector((state) => state.auth);

  const [isClicked, setIsClicked] = useState(false);
  const [active, setActive] = useState(false);
  const [isWorkoutsDropdownOpen, setIsWorkoutsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const toggleWorkoutsDropdown = () => {
    setIsWorkoutsDropdownOpen(!isWorkoutsDropdownOpen);
  };
  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

const logoutHandler = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
}

  const toggleMenu = () => {
    setIsClicked(!isClicked);
    setActive(!active);
  };

  const closeMenu = () => {
    setIsClicked(false)
    setActive(false)
  }

  const menuRef = useRef();
  const workoutsButtonRef = useRef();
  const profileButtonRef = useRef();

  window.addEventListener("click", (e) => {
    if (
      e.target !== menuRef.current &&
      e.target !== workoutsButtonRef.current
    ) {
      setIsWorkoutsDropdownOpen(false);
    }
    if (e.target !== menuRef.current && e.target !== profileButtonRef.current) {
      setIsProfileDropdownOpen(false);
    }
  });
  return (
    <>
    {isLoading && <Loader />}
      <nav className="nav">
        <Link to="/" className="nav__title">
          <img src={Logo} alt="logo" />
        </Link>

        <ul className={active ? "nav__items active" : "nav__items"} id="navbar">
          <li>
            <div
              className={`dropdown  ${
                isProfileDropdownOpen ? "dropdown-active" : ""
              }`}
            >
              <button
                ref={profileButtonRef}
                className="btn nav__link"
                onClick={toggleProfileDropdown}
              >
                <i className="fa fa-user nav-icon " aria-hidden="true"></i>
                Profile
                {isProfileDropdownOpen ? (
                  <i className="fa fa-caret-up nav-icon" aria-hidden="true"></i>
                ) : (
                  <i
                    className="fa fa-caret-down nav-icon"
                    aria-hidden="true"
                  ></i>
                )}
              </button>
              <div className="dropdown-menu" ref={menuRef}>
                <ul onClick={toggleProfileDropdown} className="dropdown-items">
                  <li>
                    <Link to="/profile" className="nav-profile" onClick={closeMenu}>
                      <img
                        src={missingImg}
                        alt="pic"
                        className="nav-profile__pic"
                      />
                      <p className="nav-profile__name">{ user?.name || "James Charles"} </p>
                    </Link>
                  </li>
                  {/* <li>
                    <Link to="/profile/edit" className="">
                      <ManageAccountsIcon /> Update Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/track" className="">
                      <TimelineIcon /> Weight tracker
                    </Link>
                  </li> */}
                  <li>
                    <Link to={'/'} className="" onClick={logoutHandler}>
                      <LogoutIcon /> Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li>
            <Link to="/calendar" className="nav__link">
              <i className="fa fa-calendar" aria-hidden="true"></i>Calendar
            </Link>
          </li>

          <li>
            <div
              className={`dropdown  ${
                isWorkoutsDropdownOpen ? "dropdown-active" : ""
              }`}
            >
              <button
                ref={workoutsButtonRef}
                className="btn nav__link"
                onClick={toggleWorkoutsDropdown}
              >
                <FitnessCenterIcon className="nav-icon mui-icon " /> Workouts
                {isWorkoutsDropdownOpen ? (
                  <i className="fa fa-caret-up nav-icon" aria-hidden="true"></i>
                ) : (
                  <i
                    className="fa fa-caret-down nav-icon"
                    aria-hidden="true"
                  ></i>
                )}
              </button>
              <div className="dropdown-menu" ref={menuRef}>
                <ul onClick={toggleWorkoutsDropdown} className="dropdown-items">
                  <li>
                    <Link to="/workouts" className="" onClick={closeMenu}>
                      <SearchIcon /> Browse
                    </Link>
                  </li>
                  <li>
                    <Link to="/workouts/new" className="" onClick={closeMenu}>
                      <AddIcon /> new
                    </Link>
                  </li>
                  <li>
                    <Link to="/workouts/my" className="" onClick={closeMenu}>
                      <FolderSharedIcon /> Personal
                    </Link>
                  </li>
                  <li>
                    <Link to="/workouts/today" className="" onClick={closeMenu}>
                      <TodayIcon /> Today's
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </li>

          <li>
            <Link to="/exercises" className="nav__link" onClick={closeMenu}>
              <SportsGymnasticsIcon className="mui-icon" /> Exercises
            </Link>
          </li>
          {/* <li>
            <Link to="/bmi" className="nav__link">
              <i className="fa fa-calculator" aria-hidden="true"></i> BMI
            </Link>
          </li> */}
        </ul>

        <div className="nav-mobile" id="nav-mobile" onClick={toggleMenu}>
          <i className={isClicked ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
      </nav>
      <div
        className={`backdrop ${active ? "backdrop-active" : ""}`}
        onClick={toggleMenu}
      ></div>
    </>
  );
};

export default Navbar;
