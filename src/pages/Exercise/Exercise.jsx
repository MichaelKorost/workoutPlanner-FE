import "./Exercise.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getExercise, reset } from "../../features/exercises/exerciseSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/Spinner/Spinner";
import ExerciseDetails from "../../components/ExerciseDetails/ExerciseDetails";
import ExerciseNotFound from "../../components/ExerciseNotFound/ExerciseNotFound";
import Loader from "../../components/Loader/Loader";


function Exercise() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { exercise, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.exercise
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getExercise(id));

    return () => {
      dispatch(reset());
    };
  }, [message, isError, dispatch, id]);

  return (
    <div>
      {isLoading ? (
       <Loader />
      ) : (
        <div>
          {exercise && exercise._id ? (
            <ExerciseDetails exercise={exercise} />
          ) : (
            <ExerciseNotFound errorMessage={"Exercise page not found"} />
          )}
        </div>
      )}
    </div>
  );
}

export default Exercise;
