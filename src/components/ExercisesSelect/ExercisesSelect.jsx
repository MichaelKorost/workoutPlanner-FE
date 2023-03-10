import "./ExercisesSelect.scss";
// MUI
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
// MUI END

import { forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllExercises,
  getFilteredExercises,
  reset,
} from "../../features/exercises/exerciseSlice";
import ExerciseCard from "../ExerciseCard/ExerciseCard";
import ExercisesFilters from "../ExercisesFilters/ExercisesFilters";
import ExercisesSearchBar from "../ExercisesSearchBar/ExercisesSearchBar";
import Spinner from "../Spinner/Spinner";
import ExerciseTerms from "../ExerciseTerms/ExerciseTerms";

// TODO: when selecting card request sets, reps, weight

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function ExercisesSelect({
  muscleGroup,
  customName,
  onAddedExercises,
  existingExercises,
}) {
  const [searchBar, setSearchBar] = useState("");
  const [selectedExercises, setSelectedExercises] = useState(existingExercises);
  const [isExercisesClicked, setIsExercisesClicked] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState({});
  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState(0);
  const [weight, setWeight] = useState(0);
  const [open, setOpen] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    group: [],
    tags: [],
    difficulty: [],
  });
  const dispatch = useDispatch();

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

  const handleAddedExercises = (newExercises) => {
    onAddedExercises(newExercises);
  };

  const searchBarHandler = (value) => {
    setSearchBar(value);
  };

  const filterChangehandler = (filters) => {
    setSearchFilters(filters);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleConfirmExercise = () => {
    const newExercise = {
      exercise: selectedExercise,
      sets: sets,
      reps: reps,
      weight: weight,
    };
    setSelectedExercises((prevSelectedExercises) => [
      ...prevSelectedExercises,
      newExercise,
    ]);
    handleClose();
  };

  useEffect(() => {
    handleAddedExercises(selectedExercises);
  }, [selectedExercises]);



  const handleExerciseTerms = (exercise) => {
    if (!exercise) return;
    // saving state of selected exercise
    setSelectedExercise(exercise);
    console.log("handlingExerciseTerms" + exercise.name);
    // open dialogue, which will use selected exercise's data
    setOpen(true);
  };

  return (
    <div className="exercises-select">
      <header className="header">
        <ExercisesSearchBar onChange={searchBarHandler} value={searchBar} />
      </header>

      <section className="exercises__content">
        <ExercisesFilters onChangeFilters={filterChangehandler} />

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
                    isSelect={true}
                    // onCardClick={() => chooseCardHandler(exercise)}
                    onExerciseSelect={() => handleExerciseTerms(exercise)}
                  />
                );
              })
          )}
        </section>
      </section>

      <Dialog
        className="exercise-select__dialog"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{`Add exercise to: ${
          muscleGroup
            ? muscleGroup
            : customName || "unselected muscle group name"
        }`}</DialogTitle>
        <DialogContent>
          <div>
            <ExerciseCard
              key={selectedExercise._id}
              exercise={selectedExercise}
            />
            <form>
              <label htmlFor="sets">Sets: </label>
              <input
                type="text"
                value={sets}
                onChange={(e) => setSets(e.target.value)}
              />
              <label htmlFor="reps">Reps: </label>
              <input
                type="text"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
              />
              <label htmlFor="weight">Weight: </label>
              <input
                type="text"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>close</Button>
          <Button onClick={handleConfirmExercise}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ExercisesSelect;
