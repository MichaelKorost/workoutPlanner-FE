import "./WorkoutsToday.scss";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";
import {
  getUserCalendarEvents,
  resetCalendar,
} from "../../features/calendar/calendarSlice";
import TodaysWorkout from "../../components/TodaysWorkout/TodaysWorkout";

function WorkoutsToday() {
  const [todayWorkouts, setTodayWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const {
    userCalendarEvents,
    isCalendarError,
    isCalendarSuccess,
    // isCalendarLoading,
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

  //get today's workouts
  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.toLocaleString("en-US", { month: "2-digit" });
    const day = date.toLocaleString("en-US", { day: "2-digit" });

    const today = `${year}-${month}-${day}`;
    const todaysEvents = userCalendarEvents.filter((event) =>
      event.date === today ? event : ""
    );
    console.log(todaysEvents);
    setTodayWorkouts(todaysEvents);
  }, [userCalendarEvents]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <section className="workouts-today-page">
        {todayWorkouts.length ? (
          todayWorkouts.map((workout, index) => (
            <TodaysWorkout key={index} workout={workout.workout} title={workout.title}  />
          ))
        ) : (
          <p>No workouts scheduled today</p>
        )}
      </section>
    </>
  );
}

export default WorkoutsToday;
