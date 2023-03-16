import "./UserWorkout.scss";

import { useState, useEffect } from "react";
import Spinner from "../../components/Spinner/Spinner";
import {
  getAllWorkoutPlans,
  reset,
  getUserWorkoutPlans,
} from "../../features/workoutPlan/workoutPlanSlice";
import { useDispatch, useSelector } from "react-redux";
import Workout from "../Workout/Workout";
import { useNavigate } from "react-router-dom";

function UserWorkouts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { workoutPlans, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.workoutPlan
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    } else if (user.token) {
      dispatch(getUserWorkoutPlans());
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    <Spinner />;
  }

  return (
    <div className="workouts-container">
      {workoutPlans.map((workout) => {
        return <Workout key={workout._id} workout={workout} />;
      })}
    </div>
  );
}

export default UserWorkouts;
