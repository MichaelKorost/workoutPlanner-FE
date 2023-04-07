import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ExerciseNotFound from "../../components/ExerciseNotFound/ExerciseNotFound";
import Loader from "../../components/Loader/Loader";
import { deleteWorkoutPlan, getWorkoutPlanById, reset } from "../../features/workoutPlan/workoutPlanSlice";
import WorkoutDetails from "../WorkoutDetails/WorkoutDetails";

function Workout() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { workoutPlans, isError, isLoading, message } = useSelector(
    (state) => state.workoutPlan
  );

  const currentWorkoutPlan = workoutPlans[0]

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getWorkoutPlanById(id)); //get single workout
    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch, id]);

  const handleDelete = () => {  
    dispatch(deleteWorkoutPlan(id));
    navigate(-2)
  };


  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {currentWorkoutPlan && currentWorkoutPlan._id ? (
            <WorkoutDetails onDelete={handleDelete} workout={currentWorkoutPlan} />
          ) : (
            <ExerciseNotFound errorMessage={"Workout page not found"} />
          )}
        </div>
      )}
    </div>
  );
}

export default Workout;
