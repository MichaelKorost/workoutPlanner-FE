import "./Dashboard.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";

import { useCallback, useEffect, useState } from "react";
import {
  getUserCalendarEvents,
  resetCalendar,
} from "../../features/calendar/calendarSlice";
import { toast } from "react-toastify";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import Profile from "../Profile/Profile";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import PersonIcon from '@mui/icons-material/Person';
import SportsGymnasticsIcon from "@mui/icons-material/SportsGymnastics";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { updateUsername } from "../../features/auth/authSlice";
import TodaysWorkoutCard from "../../components/TodaysWorkoutCard/TodaysWorkoutCard";
import ExerciseNotFound from "../../components/ExerciseNotFound/ExerciseNotFound";
import personalTraining from "../../assets/undraw_personal_training.svg";
import stabilityBall from "../../assets/undraw_stability_ball.svg";
import yoga from "../../assets/undraw_yoga.svg";
import Tilt from "react-parallax-tilt";
import TodaysWorkoutCardSkeleton from "../../components/TodaysWorkoutCardSkeleton/TodaysWorkoutCardSkeleton";

function Dashboard() {
  const [todayWorkouts, setTodayWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { userCalendarEvents, isCalendarError, calendarMessage } = useSelector(
    (state) => state.calendar
  );

  const fetchData = useCallback(async () => {
    if (isCalendarError) {
      toast.error(calendarMessage);
    }

    if (!user) {
      navigate("/login");
    } else if (user.token) {
      try {
        setIsLoading(true);

        await dispatch(getUserCalendarEvents()).unwrap();
      } catch (error) {
        toast.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [calendarMessage, dispatch, isCalendarError, navigate, user]);

  useEffect(() => {
    fetchData();
    return () => {
      dispatch(resetCalendar());
    };
  }, [dispatch, fetchData]);

  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.toLocaleString("en-US", { month: "2-digit" });
    const day = date.toLocaleString("en-US", { day: "2-digit" });

    const today = `${year}-${month}-${day}`;
    const todaysEvents = Array.isArray(userCalendarEvents)
      ? userCalendarEvents.filter((event) =>
          event.date === today ? event : ""
        )
      : [];

    setTodayWorkouts(todaysEvents);
  }, [userCalendarEvents]);

  const handleUpdateUsername = (newName) => {
    if (newName.length === "") {
      toast.error("name cannot be empty");
      return;
    }
    if (!newName) {
      toast.error("name cannot be empty");
      return;
    }
    if (newName === user.name) {
      toast.error("nothing changed");
      return;
    }
    dispatch(updateUsername(newName));
    setOpenDialog(false);
    toast.success("username updated successfully");
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const capitalize = (str) => {
    if (!str) return str;
    return str?.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-page">
        <h1 className="dashboard__greet">
          Hello,{" "}
          <span className="dashboard__greet-name">
            {capitalize(user?.name)}
          </span>
        </h1>

        <div className="dashboard-container">
          <section className="dashboard__menu">
            <section className="dashboard-today-and-group1-container">
              <div className="dashboard__todays-plan ">
                {todayWorkouts.length ? (
                  todayWorkouts.map((workout, index) => (
                    <TodaysWorkoutCard
                      key={index}
                      workout={workout.workout}
                      title={workout.title}
                    />
                  ))
                ) : (
                  <div>
                    {isLoading ? (
                      <TodaysWorkoutCardSkeleton />
                    ) : (
                      <ExerciseNotFound
                        errorMessage={"Looks like you're resting today..."}
                      />
                    )}{" "}
                  </div>
                )}
              </div>
              <section className="dashboard-group1">
                <div className="dashboard-create-browse-container">
                  <Link
                    to={"/workouts/new"}
                    className="dashboard__link group1-item1 square"
                  >
                    <div>
                      <AddCircleIcon sx={{height: "54px", width:"54px"}} />
                      <h2 className="dashboard__button-text" >Create workout plan</h2></div>
                  </Link>
                  <Link
                    to={"/exercises"}
                    className="dashboard__link group1-item2 square"
                  >
                    <div>
                    <SportsGymnasticsIcon sx={{height: "54px", width:"54px"}} />
                     <h2 className="dashboard__button-text">Exercises</h2> 
                      </div>
                  </Link>
                </div>
                <Link
                  to={"/workouts"}
                  className="dashboard__link group1-item3 square"
                >
                  <div> 
                    <SearchIcon sx={{height: "54px", width:"54px"}} />
                    <h2 className="dashboard__button-text">workout plans</h2>
                    </div>
                </Link>
              </section>
              <h1 className="dashboard__today-text">Today!</h1>
            </section>
            <section className="dashboard-group2">
              <div className="dashboard-calendar-profile-container">
                <Link
                  to={"/calendar"}
                  className="dashboard__link group2-item1 square"
                >
                  <div>
                    <CalendarMonthIcon sx={{height: "54px", width:"54px"}} />
                    <h2 className="dashboard__button-text">Calendar</h2>
                    </div>
                </Link>
                <Link
                  to={"/"}
                  className="dashboard__link group2-item2 square"
                  onClick={handleClickOpen}
                >
                  <div>
                  < PersonIcon sx={{height: "54px", width:"54px"}} />
                  <h2 className="dashboard__button-text">Profile</h2>
                    </div>
                </Link>
              </div>
              <Link
                to={"/workouts/my"}
                className="dashboard__link group2-item3 square"
              >
                <div>
                <FolderSharedIcon sx={{height: "54px", width:"54px"}} />
                  <h2 className="dashboard__button-text">My workout plans</h2> 
                  </div>
              </Link>
            </section>
          </section>

          <Tilt
            className="dashboard__logo"
            perspective={2200}
            tiltMaxAngleX={10}
            tiltMaxAngleY={10}
          >
            <h1 className="logo__title">Workout Planner</h1>
            <img
              className="logo__img logo-img1"
              src={personalTraining}
              alt="personalTraining"
            />
            <img
              className="logo__img logo-img2"
              src={stabilityBall}
              alt="stability ball"
            />
            <img className="logo__img logo-img3" src={yoga} alt="yoga" />
          </Tilt>
        </div>
      </div>

      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={openDialog}
        onClose={handleClose}
      >
        <DialogActions sx={{ justifyContent: "flex-end" }}>
          <Button
            sx={{ width: "54px", height: "54px", backgroundColor: "#e74c3c" }}
            onClick={handleClose}
            onMouseEnter={(e) => (e.target.style.backgroundColor = `#c0392b`)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = `#e74c3c`)}
          >
            <CloseIcon
              sx={{ color: "white", fontSize: "44px", pointerEvents: "none" }}
            />
          </Button>
        </DialogActions>

        <DialogContent>
          <Profile user={user} onSave={handleUpdateUsername} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Dashboard;
