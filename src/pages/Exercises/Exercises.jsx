import "./Exercises.css";
import { useCallback, useEffect, useState } from "react";

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
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Tooltip,
} from "@mui/material";
import ExerciseDetailsDialog from "../../components/ExerciseDetailsDialog/ExerciseDetailsDialog";
import CloseIcon from "@mui/icons-material/Close";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

function Exercises() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedExercise, setSelectedExercise] = useState({});
  const [openDetails, setOpenDetails] = useState(false);
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

  useEffect(() => {
    setSearchFilters(searchFilters);
  }, [searchFilters]);

  // new
  useEffect(() => {
    setSearchFilters(searchFilters);
  }, [searchFilters]);

  const filterChangehandler = (filters) => {
    setSearchFilters(filters);
  };

  const exerciseClickHandler = (exercise) => {
    setSelectedExercise(exercise);
    setOpenDetails(true);
  };
  const handleOpenExercise = (id) => {
    window.open("/exercises/id/" + id, "_blank");
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
                    onCardClick={() => exerciseClickHandler(exercise)}
                  />
                );
              })
          )}
        </section>
      </div>

      <Dialog
        fullWidth={true}
        maxWidth={"lg"}
        open={openDetails}
        onClose={() => {
          setOpenDetails(false);
        }}
      >
        <DialogActions>
          <Button
            sx={{ width: "54px", height: "54", backgroundColor: "#e74c3c" }}
            onClick={() => {
              setOpenDetails(false);
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = `#c0392b`)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = `#e74c3c`)}
          >
            <CloseIcon
              sx={{ color: "white", fontSize: "44px", pointerEvents: "none" }}
            />
          </Button>
        </DialogActions>

        <DialogContent sx={{ padding: "0" }}>
          <ExerciseDetailsDialog selectedExercise={selectedExercise} />
        </DialogContent>

        <DialogActions sx={{justifyContent:"flex-start"}}>
          <Tooltip title="Open in a new tab" placement="top">
            <Button
              className="workout-open-button"
              sx={{ minWidth: "54px", height: "54px" }}
              onClick={() => handleOpenExercise(selectedExercise._id)}
            >
              <OpenInNewIcon
                sx={{
                  color: "white",
                  fontSize: "44px",
                  pointerEvents: "none",
                }}
              />
            </Button>
          </Tooltip>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Exercises;
