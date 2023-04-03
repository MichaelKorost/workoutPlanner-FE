import "./Dashboard.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Loader from "../../components/Loader/Loader";
import { useCallback, useEffect, useState } from "react";
import {
  getUserCalendarEvents,
  resetCalendar,
} from "../../features/calendar/calendarSlice";
import { toast } from "react-toastify";

function Dashboard() {
  const [todayWorkouts, setTodayWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const {
    userCalendarEvents,
    isCalendarError,
    isCalendarSuccess,
    calendarMessage,
  } = useSelector((state) => state.calendar);

  const fetchData = useCallback(async () => {
    if (isCalendarError) {
      console.log(calendarMessage);
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

  //get today's workouts //filter causes an issue
  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.toLocaleString("en-US", { month: "2-digit" });
    const day = date.toLocaleString("en-US", { day: "2-digit" });

    const today = `${year}-${month}-${day}`;
    const todaysEvents = Array.isArray(userCalendarEvents) ? userCalendarEvents.filter((event) =>
    event.date === today ? event : ""
  ) : [];
    console.log(todaysEvents);
    setTodayWorkouts(todaysEvents);
  }, [userCalendarEvents]);

  return (
    <>
      <Navbar />
      <div className="dashboard-page">
        {isLoading && <Loader />}
        <h1>hello, {user?.name}</h1>

        <div className="dashboard-container">
          <section className="dashboard__menu">
            <section className="dashboard-today-and-group1-container">
              <div className="dashboard__todays-plan">
                <div>Todays plan</div>
              </div>
              <section className="dashboard-group1">
                <Link to={"/workouts/new"} className="dashboard__link">
                  <div className="square">Create new workout</div>
                </Link>
                <Link to={"/workouts"} className="dashboard__link">
                  <div className="rectangle">workout plans</div>
                </Link>
                <Link to={"/exercises"} className="dashboard__link">
                  <div className="square">Browse Exercises</div>
                </Link>
              </section>
            </section>
            <section className="dashboard-group2">
              <Link to={"/calendar"} className="dashboard__link">
                <div className="square">Calendar</div>
              </Link>
              <Link to={"/profile"} className="dashboard__link">
                <div className="square">Profile</div>
              </Link>
              <Link to={"/profile"} className="dashboard__link">
                <div className="horizontal-rectangle">My workout plans</div>
              </Link>
            </section>
          </section>

          <section className="dashboard__logo"></section>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
