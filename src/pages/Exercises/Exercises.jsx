import "./Exercises.css";
import { useEffect, useState } from "react";

// import data and stuff
import Spinner from "../../components/Spinner/Spinner";
import {
  getAllExercises,
  reset,
  getFilteredExercises,
} from "../../features/exercises/exerciseSlice";
import { useDispatch, useSelector } from "react-redux";
import ExerciseCard from "../../components/ExerciseCard/ExerciseCard";
import { useNavigate, useNavigation } from "react-router";
import ExercisesSearchBar from "../../components/ExercisesSearchBar/ExercisesSearchBar";
import ExercisesFilters from "../../components/ExercisesFilters/ExercisesFilters";

const baseUrl = "https://workout-planner-be.vercel.app/api/exercises";

function Exercises() {
  //   TODO: favorite an exercise
  //   TODO: mobile responsive
  //   TODO: fix traps (mid back) probably in db *pain*
  //   TODO: make a load more on scroll down
  //   TODO: ekeleton loading with MUI
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchFilters, setSearchFilters] = useState({
    group: [],
    tags: [],
    difficulty: [],
  })
  const [searchBar, setSearchBar] = useState("");

  const { exercises, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.exercise
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getAllExercises());

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  useEffect(() => {
    dispatch(getFilteredExercises(searchFilters));
  }, [dispatch, searchFilters]);

  const searchBarHandler = (value) => {
    setSearchBar(value);
  };

  const filterChangehandler = (filters) => {
    setSearchFilters(filters)
  }

  const exerciseClickHandler = (id) => {
    console.log(`card with id of ${id}`);
    navigate("/exercises/id/" + id);
  };

  //   if (isLoading) {
  //     return <Spinner />;
  //   }

  return (
    <>
      <header className="header">
        <h1 className="header__title">Exercises</h1>
        <ExercisesSearchBar onChange={searchBarHandler} value={searchBar} />
      </header>

      <section className="exercises__content">
        <ExercisesFilters
          onChangeFilters={filterChangehandler}
        />

        <section className="exercises__list">
          {isLoading ? (
            <Spinner />
          ) : (
            exercises
              ?.filter((exercise) =>
                exercise.name
                  .toLowerCase()
                  .includes(searchBar.toLocaleLowerCase())
              )
              .map((exercise) => {
                return (
                  <ExerciseCard
                    key={exercise._id}
                    exercise={exercise}
                    onCardClick={() => exerciseClickHandler(exercise._id)}
                  />
                );
              })
          )}
        </section>
      </section>
    </>
  );
}

export default Exercises;
