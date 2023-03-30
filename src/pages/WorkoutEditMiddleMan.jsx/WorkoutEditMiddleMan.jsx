import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ExerciseNotFound from "../../components/ExerciseNotFound/ExerciseNotFound";
import Loader from "../../components/Loader/Loader";
// import { reset } from "../../features/auth/authSlice";
import { getWorkoutPlanById, reset } from "../../features/workoutPlan/workoutPlanSlice";
import WorkoutDetails from "../WorkoutDetails/WorkoutDetails";
import WorkoutEdit from "../WorkoutEdit/WorkoutEdit";

function WorkoutEditMiddleMan() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const { workoutPlans, isError, isSuccess, message } = useSelector(
    (state) => state.workoutPlan
  );

  const currentWorkoutPlan = workoutPlans[0];

  console.log({ currentWorkoutPlan })

  const fetchData = useCallback(async () => {
    if (isError) {
      console.log(message);
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
