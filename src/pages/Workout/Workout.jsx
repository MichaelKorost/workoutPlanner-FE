import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ExerciseNotFound from "../../components/ExerciseNotFound/ExerciseNotFound";
import Loader from "../../components/Loader/Loader";
import { reset } from "../../features/auth/authSlice";
import { getWorkoutPlanById } from "../../features/workoutPlan/workoutPlanSlice";
import WorkoutDetails from "../WorkoutDetails/WorkoutDetails";

function Workout() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { workoutPlans, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.workoutPlan
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getWorkoutPlanById(id)); //get single workout
    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch, id]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {workoutPlans && workoutPlans._id ? (
            <WorkoutDetails workout={workoutPlans} />
          ) : (
            <ExerciseNotFound errorMessage={"Workout page not found"} />
          )}
        </div>
      )}
    </div>
  );
}

export default Workout;
