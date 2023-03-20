import "./Exercises.css";
import { forwardRef, useEffect, useState } from "react";

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
import {
  Box,
  Skeleton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Button,
  useMediaQuery,
} from "@mui/material";
import { Rectangle, RectangleRounded } from "@mui/icons-material";
import ExerciseNotFound from "../../components/ExerciseNotFound/ExerciseNotFound";
import { useTheme } from "@emotion/react";
import InfiniteScroll from "react-infinite-scroll-component";
import {useSearchParams} from 'react-router-dom'

const baseUrl = "https://workout-planner-be.vercel.app/api/exercises";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

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
  });
  const [searchBar, setSearchBar] = useState("");
  const [randomColor, setRandomColor] = useState(
    `#${Math.floor(Math.random() * 16777215).toString(16)}20`
  );
  const [searchParams, setSearchParams] = useSearchParams();

  const { exercises, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.exercise
  );

  const theme = useTheme();
  const matchesTablet = useMediaQuery(theme.breakpoints.down("tablet"));
  const matchesSm = useMediaQuery(theme.breakpoints.down("sm"));

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

  // useEffect(() => {
    // const params = Object.fromEntries(searchParams);
    // console.log(params)
    // setSearchFilters(params);
  // }, []);

  // const updateSearchParams = (newParams) => {
  //   setSearchParams({...searchParams, ...newParams})
  // }  

  const searchBarHandler = (value) => {
    setSearchBar(value);
  };

  const filterChangehandler = (filters) => {
    // updateSearchParams({...filters})
    setSearchFilters(filters);
  };

  const exerciseClickHandler = (id) => {
    console.log(`card with id of ${id}`);
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
          />
        </header>

        <ExercisesFilters onChangeFilters={filterChangehandler} />
      </section>

      <div
        className="exercise-list-container"
        style={{ backgroundColor: randomColor }}
      >
        <section className="exercises__list">
          {isLoading ? (
            <>
              <Skeleton
                animation={"wave"}
                variant={"RectangleRounded"}
                width={
                  matchesSm
                    ? "calc(90vw - 50px)"
                    : matchesTablet
                    ? "calc(50vw - 50px)"
                    : 210
                }
                height={matchesSm ? 180 : matchesTablet ? 180 : 260}
                sx={{ display: "flex", borderRadius: "8px" }}
              />
              <Skeleton
                animation={"wave"}
                variant={"RectangleRounded"}
                width={
                  matchesSm
                    ? "calc(90vw - 50px)"
                    : matchesTablet
                    ? "calc(50vw - 50px)"
                    : 210
                }
                height={matchesSm ? 180 : matchesTablet ? 180 : 260}
                sx={{ display: "flex", borderRadius: "8px" }}
              />
              <Skeleton
                animation={"wave"}
                variant={"RectangleRounded"}
                width={
                  matchesSm
                    ? "calc(90vw - 50px)"
                    : matchesTablet
                    ? "calc(50vw - 50px)"
                    : 210
                }
                height={matchesSm ? 180 : matchesTablet ? 180 : 260}
                sx={{ display: "flex", borderRadius: "8px" }}
              />
              <Skeleton
                animation={"wave"}
                variant={"RectangleRounded"}
                width={
                  matchesSm
                    ? "calc(90vw - 50px)"
                    : matchesTablet
                    ? "calc(50vw - 50px)"
                    : 210
                }
                height={matchesSm ? 180 : matchesTablet ? 180 : 260}
                sx={{ display: "flex", borderRadius: "8px" }}
              />
              <Skeleton
                animation={"wave"}
                variant={"RectangleRounded"}
                width={
                  matchesSm
                    ? "calc(90vw - 50px)"
                    : matchesTablet
                    ? "calc(50vw - 50px)"
                    : 210
                }
                height={matchesSm ? 180 : matchesTablet ? 180 : 260}
                sx={{ display: "flex", borderRadius: "8px" }}
              />
              <Skeleton
                animation={"wave"}
                variant={"RectangleRounded"}
                width={
                  matchesSm
                    ? "calc(90vw - 50px)"
                    : matchesTablet
                    ? "calc(50vw - 50px)"
                    : 210
                }
                height={matchesSm ? 180 : matchesTablet ? 180 : 260}
                sx={{ display: "flex", borderRadius: "8px" }}
              />
              <Skeleton
                animation={"wave"}
                variant={"RectangleRounded"}
                width={
                  matchesSm
                    ? "calc(90vw - 50px)"
                    : matchesTablet
                    ? "calc(50vw - 50px)"
                    : 210
                }
                height={matchesSm ? 180 : matchesTablet ? 180 : 260}
                sx={{ display: "flex", borderRadius: "8px" }}
              />
              <Skeleton
                animation={"wave"}
                variant={"RectangleRounded"}
                width={
                  matchesSm
                    ? "calc(90vw - 50px)"
                    : matchesTablet
                    ? "calc(50vw - 50px)"
                    : 210
                }
                height={matchesSm ? 180 : matchesTablet ? 180 : 260}
                sx={{ display: "flex", borderRadius: "8px" }}
              />
              <Skeleton
                animation={"wave"}
                variant={"RectangleRounded"}
                width={
                  matchesSm
                    ? "calc(90vw - 50px)"
                    : matchesTablet
                    ? "calc(50vw - 50px)"
                    : 210
                }
                height={matchesSm ? 180 : matchesTablet ? 180 : 260}
                sx={{ display: "flex", borderRadius: "8px" }}
              />
              <Skeleton
                animation={"wave"}
                variant={"RectangleRounded"}
                width={
                  matchesSm
                    ? "calc(90vw - 50px)"
                    : matchesTablet
                    ? "calc(50vw - 50px)"
                    : 210
                }
                height={matchesSm ? 180 : matchesTablet ? 180 : 260}
                sx={{ display: "flex", borderRadius: "8px" }}
              />
              <Skeleton
                animation={"wave"}
                variant={"RectangleRounded"}
                width={
                  matchesSm
                    ? "calc(90vw - 50px)"
                    : matchesTablet
                    ? "calc(50vw - 50px)"
                    : 210
                }
                height={matchesSm ? 180 : matchesTablet ? 180 : 260}
                sx={{ display: "flex", borderRadius: "8px" }}
              />
              <Skeleton
                animation={"wave"}
                variant={"RectangleRounded"}
                width={
                  matchesSm
                    ? "calc(90vw - 50px)"
                    : matchesTablet
                    ? "calc(50vw - 50px)"
                    : 210
                }
                height={matchesSm ? 180 : matchesTablet ? 180 : 260}
                sx={{ display: "flex", borderRadius: "8px" }}
              />
              <Skeleton
                animation={"wave"}
                variant={"RectangleRounded"}
                width={
                  matchesSm
                    ? "calc(90vw - 50px)"
                    : matchesTablet
                    ? "calc(50vw - 50px)"
                    : 210
                }
                height={matchesSm ? 180 : matchesTablet ? 180 : 260}
                sx={{ display: "flex", borderRadius: "8px" }}
              />
              <Skeleton
                animation={"wave"}
                variant={"RectangleRounded"}
                width={
                  matchesSm
                    ? "calc(90vw - 50px)"
                    : matchesTablet
                    ? "calc(50vw - 50px)"
                    : 210
                }
                height={matchesSm ? 180 : matchesTablet ? 180 : 260}
                sx={{ display: "flex", borderRadius: "8px" }}
              />
              <Skeleton
                animation={"wave"}
                variant={"RectangleRounded"}
                width={
                  matchesSm
                    ? "calc(90vw - 50px)"
                    : matchesTablet
                    ? "calc(50vw - 50px)"
                    : 210
                }
                height={matchesSm ? 180 : matchesTablet ? 180 : 260}
                sx={{ display: "flex", borderRadius: "8px" }}
              />
              <Skeleton
                animation={"wave"}
                variant={"RectangleRounded"}
                width={
                  matchesSm
                    ? "calc(90vw - 50px)"
                    : matchesTablet
                    ? "calc(50vw - 50px)"
                    : 210
                }
                height={matchesSm ? 180 : matchesTablet ? 180 : 260}
                sx={{ display: "flex", borderRadius: "8px" }}
              />
              <Skeleton
                animation={"wave"}
                variant={"RectangleRounded"}
                width={
                  matchesSm
                    ? "calc(90vw - 50px)"
                    : matchesTablet
                    ? "calc(50vw - 50px)"
                    : 210
                }
                height={matchesSm ? 180 : matchesTablet ? 180 : 260}
                sx={{ display: "flex", borderRadius: "8px" }}
              />
              <Skeleton
                animation={"wave"}
                variant={"RectangleRounded"}
                width={
                  matchesSm
                    ? "calc(90vw - 50px)"
                    : matchesTablet
                    ? "calc(50vw - 50px)"
                    : 210
                }
                height={matchesSm ? 180 : matchesTablet ? 180 : 260}
                sx={{ display: "flex", borderRadius: "8px" }}
              />
              <Skeleton
                animation={"wave"}
                variant={"RectangleRounded"}
                width={
                  matchesSm
                    ? "calc(90vw - 50px)"
                    : matchesTablet
                    ? "calc(50vw - 50px)"
                    : 210
                }
                height={matchesSm ? 180 : matchesTablet ? 180 : 260}
                sx={{ display: "flex", borderRadius: "8px" }}
              />
              <Skeleton
                animation={"wave"}
                variant={"RectangleRounded"}
                width={
                  matchesSm
                    ? "calc(90vw - 50px)"
                    : matchesTablet
                    ? "calc(50vw - 50px)"
                    : 210
                }
                height={matchesSm ? 180 : matchesTablet ? 180 : 260}
                sx={{ display: "flex", borderRadius: "8px" }}
              />
              <Skeleton
                animation={"wave"}
                variant={"RectangleRounded"}
                width={
                  matchesSm
                    ? "calc(90vw - 50px)"
                    : matchesTablet
                    ? "calc(50vw - 50px)"
                    : 210
                }
                height={matchesSm ? 180 : matchesTablet ? 180 : 260}
                sx={{ display: "flex", borderRadius: "8px" }}
              />
              <Skeleton
                animation={"wave"}
                variant={"RectangleRounded"}
                width={
                  matchesSm
                    ? "calc(90vw - 50px)"
                    : matchesTablet
                    ? "calc(50vw - 50px)"
                    : 210
                }
                height={matchesSm ? 180 : matchesTablet ? 180 : 260}
                sx={{ display: "flex", borderRadius: "8px" }}
              />
              <Skeleton
                animation={"wave"}
                variant={"RectangleRounded"}
                width={
                  matchesSm
                    ? "calc(90vw - 50px)"
                    : matchesTablet
                    ? "calc(50vw - 50px)"
                    : 210
                }
                height={matchesSm ? 180 : matchesTablet ? 180 : 260}
                sx={{ display: "flex", borderRadius: "8px" }}
              />
              <Skeleton
                animation={"wave"}
                variant={"RectangleRounded"}
                width={
                  matchesSm
                    ? "calc(90vw - 50px)"
                    : matchesTablet
                    ? "calc(50vw - 50px)"
                    : 210
                }
                height={matchesSm ? 180 : matchesTablet ? 180 : 260}
                sx={{ display: "flex", borderRadius: "8px" }}
              />
              <Skeleton
                animation={"wave"}
                variant={"RectangleRounded"}
                width={
                  matchesSm
                    ? "calc(90vw - 50px)"
                    : matchesTablet
                    ? "calc(50vw - 50px)"
                    : 210
                }
                height={matchesSm ? 180 : matchesTablet ? 180 : 260}
                sx={{ display: "flex", borderRadius: "8px" }}
              />
            </>
          ) : exercises?.filter((exercise) =>
              exercise.name
                .toLowerCase()
                .includes(searchBar.toLocaleLowerCase())
            ).length === 0 ? (
            <ExerciseNotFound />
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
