import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ExerciseNotFound from "../../components/ExerciseNotFound/ExerciseNotFound";
import Loader from "../../components/Loader/Loader";

import {
  getWorkoutPlanById,
  reset,
} from "../../features/workoutPlan/workoutPlanSlice";

import WorkoutEdit from "../WorkoutEdit/WorkoutEdit";

function WorkoutEditMiddleMan() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const { workoutPlans, isError, message } = useSelector(
    (state) => state.workoutPlan
  );

  const currentWorkoutPlan = workoutPlans[0];

  const fetchData = useCallback(async () => {
    if (isError) {
      toast.error(message);
    }

    try {
      setIsLoading(true);
      await dispatch(getWorkoutPlanById(id)).unwrap(); //get single workout
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, id, isError, message]);

  useEffect(() => {
    fetchData();

    return () => {
      dispatch(reset());
    };
  }, [dispatch, fetchData]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {currentWorkoutPlan && currentWorkoutPlan._id ? (
            <WorkoutEdit workout={currentWorkoutPlan} />
          ) : (
            <ExerciseNotFound errorMessage={"Invalid workout plan"} />
          )}
        </div>
      )}
    </div>
  );
}

export default WorkoutEditMiddleMan;
