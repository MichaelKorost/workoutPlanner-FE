import "./Workouts.css";

import { useState, useEffect } from "react";
import Spinner from "../../components/Spinner/Spinner";
import {
  getAllWorkoutPlans,
  reset,
} from "../../features/workoutPlan/workoutPlanSlice";
import { useDispatch, useSelector } from "react-redux";
import WorkoutCard from "../WorkoutCard/WorkoutCard";
import Loader from "../../components/Loader/Loader";
import { AnimatePresence, motion } from "framer-motion";
import { Skeleton, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";
import ExercisesSearchBar from "../../components/ExercisesSearchBar/ExercisesSearchBar";
import ExerciseNotFound from "../../components/ExerciseNotFound/ExerciseNotFound";



function Workouts() {
  const [listOfWorkoutPlans, setListOfWorkoutPlans] = useState([]);
  const [randomColor, setRandomColor] = useState(
    `#${Math.floor(Math.random() * 16777215).toString(16)}20`
  );
  const [searchBar, setSearchBar] = useState("");

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

  useEffect(() => {
    setListOfWorkoutPlans(workoutPlans);
  }, [workoutPlans]);

  const searchBarHandler = (value) => {
    setSearchBar(value);
  };

  const theme = useTheme();
  const matchesTablet = useMediaQuery(theme.breakpoints.down("tablet"));
  const matchesSm = useMediaQuery(theme.breakpoints.down("sm"));

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
          <>
            <Skeleton
              animation={"wave"}
              variant={"rectangular"}
              width={matchesSm ? "90%" : matchesTablet ? 260 : 320}
              height={matchesSm ? 500 : matchesTablet ? 500 : 500}
              sx={{ display: "flex" }}
            />
            <Skeleton
              animation={"wave"}
              variant={"rectangular"}
              width={matchesSm ? "90%" : matchesTablet ? 260 : 320}
              height={matchesSm ? 500 : matchesTablet ? 500 : 500}
              sx={{ display: "flex" }}
            />
            <Skeleton
              animation={"wave"}
              variant={"rectangular"}
              width={matchesSm ? "90%" : matchesTablet ? 260 : 320}
              height={matchesSm ? 500 : matchesTablet ? 500 : 500}
              sx={{ display: "flex" }}
            />
            <Skeleton
              animation={"wave"}
              variant={"rectangular"}
              width={matchesSm ? "90%" : matchesTablet ? 260 : 320}
              height={matchesSm ? 500 : matchesTablet ? 500 : 500}
              sx={{ display: "flex" }}
            />
            <Skeleton
              animation={"wave"}
              variant={"rectangular"}
              width={matchesSm ? "90%" : matchesTablet ? 260 : 320}
              height={matchesSm ? 500 : matchesTablet ? 500 : 500}
              sx={{ display: "flex" }}
            />
            <Skeleton
              animation={"wave"}
              variant={"rectangular"}
              width={matchesSm ? "90%" : matchesTablet ? 260 : 320}
              height={matchesSm ? 500 : matchesTablet ? 500 : 500}
              sx={{ display: "flex" }}
            />
            
          </>
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
              return <WorkoutCard key={workout._id} workout={workout} />;
            })
        )}
      </div>
    </div>
  );
}

export default Workouts;

/*



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
          <>
            <Skeleton
              animation={"wave"}
              variant={"rectangular"}
              width={matchesSm ? "90%" : matchesTablet ? 320 : 320}
              height={matchesSm ? 300 : matchesTablet ? 300 : 500}
              sx={{ display: "flex" }}
            />
            <Skeleton
              animation={"wave"}
              variant={"rectangular"}
              width={matchesSm ? "90%" : matchesTablet ? 300 : 300}
              height={matchesSm ? 300 : matchesTablet ? 300 : 500}
              sx={{ display: "flex" }}
            />
            <Skeleton
              animation={"wave"}
              variant={"rectangular"}
              width={matchesSm ? "90%" : matchesTablet ? 300 : 300}
              height={matchesSm ? 300 : matchesTablet ? 300 : 500}
              sx={{ display: "flex" }}
            />
            <Skeleton
              animation={"wave"}
              variant={"rectangular"}
              width={matchesSm ? "90%" : matchesTablet ? 300 : 300}
              height={matchesSm ? 300 : matchesTablet ? 300 : 500}
              sx={{ display: "flex" }}
            />
            <Skeleton
              animation={"wave"}
              variant={"rectangular"}
              width={matchesSm ? "90%" : matchesTablet ? 300 : 300}
              height={matchesSm ? 300 : matchesTablet ? 300 : 500}
              sx={{ display: "flex" }}
            />
            <Skeleton
              animation={"wave"}
              variant={"rectangular"}
              width={matchesSm ? "90%" : matchesTablet ? 300 : 300}
              height={matchesSm ? 300 : matchesTablet ? 300 : 500}
              sx={{ display: "flex" }}
            />
          </>
        ) : (
          listOfWorkoutPlans.map((workout) => {
            return <Workout key={workout._id} workout={workout} />;
          })
        )}
      </div>
    </div>
  );









  









infinite scrolling

function Workouts() {
  const [hasMore, setHasMore] = useState(true);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(2);
  const [listOfWorkoutPlans, setListOfWorkoutPlans] = useState([]);
  
  
  const dispatch = useDispatch();
  const { workoutPlans, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.workoutPlan
  );

  const fetchMoreData = () => {
    const nextIndex = listOfWorkoutPlans.length;
    const nextWorkoutPlans = workoutPlans.slice(nextIndex, nextIndex + 3);
    setListOfWorkoutPlans((prevState) => [...prevState, ...nextWorkoutPlans]);
    if (nextIndex + 3 >= workoutPlans.length) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getAllWorkoutPlans());
    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  useEffect(() => {
    if (workoutPlans.length > 0) {
      const initialWorkoutPlans = workoutPlans.slice(0, 3);
      setListOfWorkoutPlans(initialWorkoutPlans);
      setHasMore(workoutPlans.length > 3);
    }
  }, [workoutPlans]);

 

  if (isLoading) {
    <Spinner />;
  }

  return (
    <InfiniteScroll dataLength={listOfWorkoutPlans.length} next={fetchMoreData} hasMore={hasMore}>
      <div className="workouts-container">
        {listOfWorkoutPlans.map((workout) => {
          return <Workout key={workout._id} workout={workout} />;
        })}
      </div>
    </InfiniteScroll>
  )
}

export default Workouts;

*/
