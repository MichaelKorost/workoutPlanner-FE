import "./UserWorkout.scss";

import { useState, useEffect } from "react";
import Spinner from "../../components/Spinner/Spinner";
import {
  getAllWorkoutPlans,
  reset,
  getUserWorkoutPlans,
  deleteWorkoutPlan
} from "../../features/workoutPlan/workoutPlanSlice";
import { useDispatch, useSelector } from "react-redux";
import WorkoutCard from "../WorkoutCard/WorkoutCard";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import ExercisesSearchBar from "../../components/ExercisesSearchBar/ExercisesSearchBar";
import { Skeleton, useMediaQuery } from "@mui/material";
import ExerciseNotFound from "../../components/ExerciseNotFound/ExerciseNotFound";
import { useTheme } from "@emotion/react";
import WorkoutsSkeleton from "../../components/WorkoutsSkeleton/WorkoutsSkeleton";

function UserWorkouts() {
  const [searchBar, setSearchBar] = useState("");
  const [listOfWorkoutPlans, setListOfWorkoutPlans] = useState(null);
  const [randomColor, setRandomColor] = useState(
    `#${Math.floor(Math.random() * 16777215).toString(16)}20`
  );
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

  
  useEffect(() => {
    console.log('workoutPlans:', workoutPlans)
      setListOfWorkoutPlans(workoutPlans);
    
   }, [workoutPlans]);

  const searchBarHandler = (value) => {
    setSearchBar(value);
  };

  const handleDeleteWorkoutPlan = (id) => {
    // const updatedWorkouts = listOfWorkoutPlans.filter((workout) => workout._id !== id)
    // setListOfWorkoutPlans(updatedWorkouts)
    dispatch(deleteWorkoutPlan(id));
  }


  return (
    <div className="workouts-page">
    <ExercisesSearchBar
      onChange={searchBarHandler}
      value={searchBar}
      placeholder={"Push, Pull, Legs, Cardio..."}
      searchLabel={"Search Workouts"}
    />
    <div
      className="workouts-container"
      style={{ backgroundColor: randomColor }}
    >
      {isLoading ? (
        <WorkoutsSkeleton />
      ) : listOfWorkoutPlans?.filter((workout) =>
          workout.title.toLowerCase().includes(searchBar.toLocaleLowerCase())
        ).length === 0 ? (
        <ExerciseNotFound
          errorMessage={"No Workouts found. Please try different keywords."}
        />
      ) : (
        listOfWorkoutPlans
          ?.filter((workout) =>
            workout.title
              .toLowerCase()
              .includes(searchBar.toLocaleLowerCase())
          )
          .map((workout) => {
            return <WorkoutCard onDelete={handleDeleteWorkoutPlan} key={Math.random()*99} workout={workout} />;
          })
      )}
    </div>
  </div>
  );
}

export default UserWorkouts;

