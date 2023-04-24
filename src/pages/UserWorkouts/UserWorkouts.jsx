
import { useState, useEffect } from "react";

import {
  reset,
  getUserWorkoutPlans,
  deleteWorkoutPlan,
} from "../../features/workoutPlan/workoutPlanSlice";
import { useDispatch, useSelector } from "react-redux";
import WorkoutCard from "../WorkoutCard/WorkoutCard";
import { useNavigate } from "react-router-dom";

import ExercisesSearchBar from "../../components/ExercisesSearchBar/ExercisesSearchBar";

import ExerciseNotFound from "../../components/ExerciseNotFound/ExerciseNotFound";

import WorkoutsSkeleton from "../../components/WorkoutsSkeleton/WorkoutsSkeleton";
import { useCallback } from "react";
import { toast } from "react-toastify";

function UserWorkouts() {
  const [searchBar, setSearchBar] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { workoutPlans, isError, message } = useSelector(
    (state) => state.workoutPlan
  );

  const fetchData = useCallback(async () => {
    if (isError) {
      toast.error(message);
    }

    if (!user) {
      navigate("/login");
    } else if (user.token) {
      try {
        setIsLoading(true);
        await dispatch(getUserWorkoutPlans()).unwrap();
      } catch (error) {
        toast.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [dispatch, isError, message, navigate, user]);

  useEffect(() => {
    fetchData();

    return () => {
      dispatch(reset());
    };
  }, [dispatch, fetchData]);

  const searchBarHandler = (value) => {
    setSearchBar(value);
  };

  const handleDeleteWorkoutPlan = (id) => {
    dispatch(deleteWorkoutPlan(id));
  };

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
      >
        {isLoading ? (
          <WorkoutsSkeleton />
        ) : !Array.isArray(workoutPlans) ? (
          <ExerciseNotFound errorMessage={"No workout plans found."} />
        ) : workoutPlans?.filter((workout) =>
            workout.title.toLowerCase().includes(searchBar.toLocaleLowerCase())
          ).length === 0 ? (
          <ExerciseNotFound
            errorMessage={"No Workouts found. Please try different keywords."}
          />
        ) : (
          workoutPlans
            ?.filter((workout) =>
              workout.title
                .toLowerCase()
                .includes(searchBar.toLocaleLowerCase())
            )
            .map((workout) => {
              return (
                <WorkoutCard
                  onDelete={handleDeleteWorkoutPlan}
                  key={Math.random() * 99}
                  workout={workout}
                />
              );
            })
        )}
      </div>
    </div>
  );
}

export default UserWorkouts;
