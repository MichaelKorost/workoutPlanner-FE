import "./Exercises.css";
import { useEffect, useState } from "react";

import {
  getAllExercises,
  reset,
  getFilteredExercises,
} from "../../features/exercises/exerciseSlice";
import { useDispatch, useSelector } from "react-redux";
import ExerciseCard from "../../components/ExerciseCard/ExerciseCard";
import { useNavigate } from "react-router";
import ExercisesSearchBar from "../../components/ExercisesSearchBar/ExercisesSearchBar";
import ExercisesFilters from "../../components/ExercisesFilters/ExercisesFilters";
import ExerciseNotFound from "../../components/ExerciseNotFound/ExerciseNotFound";
import ExercisesSkeleton from "../../components/ExercisesSkeleton/ExercisesSkeleton";
import { toast } from "react-toastify";



function Exercises() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchFilters, setSearchFilters] = useState({
    group: [],
    tags: [],
    difficulty: [],
  });
  const [searchBar, setSearchBar] = useState("");
 
  const { user } = useSelector((state) => state.auth);

  const { exercises, isError, isLoading, message } = useSelector(
    (state) => state.exercise
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (!user) {
      navigate("/login")
    }

    dispatch(getAllExercises());

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch, user, navigate]);

  useEffect(() => {
    dispatch(getFilteredExercises(searchFilters));
  }, [dispatch, searchFilters]);

  const searchBarHandler = (value) => {
    setSearchBar(value);
  };

  const filterChangehandler = (filters) => {

    setSearchFilters(filters);
  };

  const exerciseClickHandler = (id) => {
    navigate("/exercises/id/" + id);
  };

  return (
    <>
      <section className="exercises-search-and-filter">
        <header className="header">
          <ExercisesSearchBar
            className={"exercises-search-bar"}
            onChange={searchBarHandler}
            value={searchBar}
            placeholder={"name, equipment..."}
            searchLabel={"Search Exercises"}
          />
        </header>

        <ExercisesFilters onChangeFilters={filterChangehandler} />
      </section>

      <div
        className="exercise-list-container"
        style={{ backgroundColor: "#ffeaa780" }}
      >
        <section className="exercises__list">
          {isLoading ? (
            <ExercisesSkeleton />
          ) : exercises?.filter((exercise) =>
              exercise.name
                .toLowerCase()
                .includes(searchBar.toLocaleLowerCase())
            ).length === 0 ? (
            <ExerciseNotFound
              errorMessage={
                "No exercises found. Please try different keywords or filters."
              }
            />
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
      </div>
    </>
  );
}

export default Exercises;
