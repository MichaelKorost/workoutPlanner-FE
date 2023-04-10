import "./Exercises.css";
import { useEffect, useState } from "react";

import {
  getAllExercises,
  reset,
  getFilteredExercises,
} from "../../features/exercises/exerciseSlice";
import { useDispatch, useSelector } from "react-redux";
import ExerciseCard from "../../components/ExerciseCard/ExerciseCard";
import { useLocation, useNavigate } from "react-router";
import ExercisesSearchBar from "../../components/ExercisesSearchBar/ExercisesSearchBar";
import ExercisesFilters from "../../components/ExercisesFilters/ExercisesFilters";
import ExerciseNotFound from "../../components/ExerciseNotFound/ExerciseNotFound";
import ExercisesSkeleton from "../../components/ExercisesSkeleton/ExercisesSkeleton";
import { toast } from "react-toastify";

// const activeFilters = JSON.parse(localStorage.getItem("activeFilters"));

function Exercises() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { search } = useLocation();
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
      navigate("/login");
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



  // useEffect(() => {
  //   updateUrlParams(searchFilters);
  // }, [searchFilters]);

  // const updateUrlParams = (filters) => {
  //   const searchParams = new URLSearchParams();
  //   searchParams.set("group", filters.group.join(","));
  //   searchParams.set("tags", filters.tags.join(","));
  //   searchParams.set("difficulty", filters.difficulty.join(","));

  //   const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
  //   const encodedUrl = encodeURI(newUrl).replace(/%2C/g, ",");
  //   window.history.pushState({}, "", encodedUrl);


  //   const urlSearchParams = new URLSearchParams(searchParams);
  //   const group = urlSearchParams.getAll("group").join(",");

  //   const tags = urlSearchParams.getAll("tags").join(",");
  //   const difficulty = urlSearchParams.getAll("difficulty").join(",");

  //   const activeFilters = {
  //     group: group.split(","),
  //     tags: tags.split(","),
  //     difficulty: difficulty.split(","),
  //   };

  //   localStorage.setItem("activeFilters", JSON.stringify(activeFilters));
 
  // };

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

        <ExercisesFilters
          onChangeFilters={filterChangehandler}
          appliedFilter={""}
        />
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
