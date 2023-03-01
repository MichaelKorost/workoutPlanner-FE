import "./Workouts.css";

import { useState, useEffect } from "react";
import Spinner from "../../components/Spinner/Spinner";
import {
  getAllWorkoutPlans,
  reset,
} from "../../features/workoutPlan/workoutPlanSlice";
import { useDispatch, useSelector } from "react-redux";
import Workout from "../Workout/Workout";

function Workouts() {
  const dispatch = useDispatch();

  const { workoutPlans, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.workoutPlan
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getAllWorkoutPlans());

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  if (isLoading) {
    <Spinner />;
  }

  return <div className="workouts-container" >
    {workoutPlans.map((workout) => {return <Workout key={workout._id} workout={workout} /> })}
  </div>;
}

export default Workouts;
