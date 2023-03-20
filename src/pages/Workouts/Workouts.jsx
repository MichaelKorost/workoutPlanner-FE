import "./Workouts.css";

import { useState, useEffect } from "react";
import Spinner from "../../components/Spinner/Spinner";
import {
  getAllWorkoutPlans,
  reset,
} from "../../features/workoutPlan/workoutPlanSlice";
import { useDispatch, useSelector } from "react-redux";
import Workout from "../Workout/Workout";
import InfiniteScroll from "react-infinite-scroll-component";

function Workouts() {
  const [listOfWorkoutPlans, setListOfWorkoutPlans] = useState([]);

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

  if (isLoading) {
    <Spinner />;
  }

  return (
    <div className="workouts-container">
      {listOfWorkoutPlans.map((workout) => {
        return <Workout key={workout._id} workout={workout} />;
      })}
    </div>
  );
}

export default Workouts;

/*
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
