import "./ExercisesSelect.scss";
// MUI
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

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

import ExercisesSkeleton from "../ExercisesSkeleton/ExercisesSkeleton";
import ExerciseNotFound from "../ExerciseNotFound/ExerciseNotFound";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { useTheme } from "@emotion/react";
import {
  Box,
  FormControl,
  FormHelperText,
  Input,
  InputAdornment,
  useMediaQuery,
} from "@mui/material";
import { toast } from "react-toastify";
import ExerciseDetailsDialog from "../ExerciseDetailsDialog/ExerciseDetailsDialog";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function ExercisesSelect({
  muscleGroup,
  customName,
  onAddedExercises,
  existingExercises,
  onToggleSelect,
}) {
  const [searchBar, setSearchBar] = useState("");
  const [selectedExercises, setSelectedExercises] = useState(existingExercises);
  const [selectedExercise, setSelectedExercise] = useState({});
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [open, setOpen] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);

  const [searchFilters, setSearchFilters] = useState({
    group: [],
    tags: [],
    difficulty: [],
  });
  const [randomColor] = useState(
    `#${Math.floor(Math.random() * 16777215).toString(16)}20`
  );
  const dispatch = useDispatch();

  const { exercises, isError, isLoading, message } = useSelector(
    (state) => state.exercise
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
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
    setSets("");
    setReps("");
    setWeight("");
  };

  useEffect(() => {
    handleAddedExercises(selectedExercises);
  }, [selectedExercises]);

  const handleExerciseTerms = (exercise) => {
    if (!exercise) return;
    setSelectedExercise(exercise);
    setOpen(true);
  };

  const handleClosePage = () => {
    onToggleSelect();
  };

  const handleQuickExerciseDelete = (id) => {
    const updatedExercises = selectedExercises.filter(
      (exercises) => exercises.exercise._id !== id
    );
    setSelectedExercises(updatedExercises);
  };





  const theme = useTheme();
  const matchesPhone = useMediaQuery(theme.breakpoints.down("phone")); //420
  const matchesSm = useMediaQuery(theme.breakpoints.down("sm")); //550
  const matchesTablet = useMediaQuery(theme.breakpoints.down("tablet")); //768
  const matchesMd = useMediaQuery(theme.breakpoints.down("md")); //960
  const matchesLg = useMediaQuery(theme.breakpoints.down("lg")); //1280

  return (
    <div className="exercises-select">
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
      <section className="exercise-select-chosen-cards-container">
        <Swiper
          slidesPerView={
            matchesPhone
              ? 2
              : matchesSm
              ? 3
              : matchesMd
              ? 4
              : matchesTablet
              ? 5
              : matchesLg
              ? 5
              : 7
          }
          freeMode={true}
          pagination={{ type: "fracion" }}
          modules={[Pagination]}
          className="exercises-select__swiper"
        >
          {existingExercises?.map(({ exercise }) => (
            <SwiperSlide
              key={`${exercise._id}-${Math.random() * 99}`}
              className="exercise-select-swiper-slide"
            >
              <div className="exercise-select-swiper-card">
                <button
                  type="button"
                  onClick={() => handleQuickExerciseDelete(exercise._id)}
                  className="exercise-select-swiper-card__btn"
                >
                  <CloseIcon sx={{ fontSize: "22px", color: "white" }} />
                </button>
                <img
                  src={exercise.image}
                  alt="exercise"
                  className="exercise-select-swiper-card__img"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <Button
          onClick={handleClosePage}
          onMouseEnter={(e) => (e.target.style.backgroundColor = `#27ae60`)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = `#7bed9f`)}
          sx={{
            backgroundColor: "#7bed9f",
            margin: "0 0 0 auto",
            minWidth: "54px",
            height: "54px",
            boxShadow:
              "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
          }}
        >
          <CheckIcon
            sx={{ fontSize: "40px", color: "white", pointerEvents: "none" }}
          />
        </Button>
      </section>
      <div
        className="exercise-select-list-container"
        style={{ backgroundColor: randomColor }}
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
                    isSelect={true}
                    onExerciseSelect={() => handleExerciseTerms(exercise)}
                  />
                );
              })
          )}
        </section>
      </div>

      <Dialog
        className="exercise-select__dialog"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{`Add exercise to: ${
          muscleGroup ? muscleGroup : customName || "unnamed muscle group name"
        }`}</DialogTitle>
        <DialogContent
          sx={{
            padding: "20px",
            paddingTop: "20px !important",
            overflow: "hidden",
          }}
        >
          <div className="exercise-select-dialog-container">
            <ExerciseCard
              key={selectedExercise._id}
              exercise={selectedExercise}
              onCardClick={() => {
                setOpenDetails(true);
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: "100%",
                alignItems: "center",
              }}
            >
              <FormControl
                variant="standard"
                sx={{ m: 1, mt: 0, width: "25ch" }}
              >
                <Input
                  id="standard-sets"
                  aria-describedby="standard-sets-helper-text"
                  inputProps={{
                    "aria-label": "sets",
                  }}
                  type="number"
                  value={sets}
                  onChange={(e) => setSets(e.target.value)}
                />
                <FormHelperText id="standard-sets-helper-text">
                  Sets
                </FormHelperText>
              </FormControl>
              <FormControl
                variant="standard"
                sx={{ m: 1, mt: 0, width: "25ch" }}
              >
                <Input
                  id="standard-reps"
                  type="number"
                  value={reps}
                  onChange={(e) => setReps(e.target.value)}
                  aria-describedby="standard-reps-helper-text"
                  inputProps={{
                    "aria-label": "reps",
                  }}
                />
                <FormHelperText id="standard-reps-helper-text">
                  Reps
                </FormHelperText>
              </FormControl>
              <FormControl
                variant="standard"
                sx={{ m: 1, mt: 0, width: "25ch" }}
              >
                <Input
                  id="standard-adornment-weight"
                  endAdornment={
                    <InputAdornment position="end">kg</InputAdornment>
                  }
                  aria-describedby="standard-weight-helper-text"
                  inputProps={{
                    "aria-label": "weight",
                  }}
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
                <FormHelperText id="standard-weight-helper-text">
                  Weight
                </FormHelperText>
              </FormControl>
            </Box>
          </div>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            sx={{ width: "54px", height: "54", backgroundColor: "#e74c3c" }}
            onClick={handleClose}
            onMouseEnter={(e) => (e.target.style.backgroundColor = `#c0392b`)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = `#e74c3c`)}
          >
            <CloseIcon
              sx={{ color: "white", fontSize: "44px", pointerEvents: "none" }}
            />
          </Button>
          <Button
            sx={{ width: "54px", height: "54", backgroundColor: "#27ae60" }}
            onClick={handleConfirmExercise}
            onMouseEnter={(e) => (e.target.style.backgroundColor = `#009432`)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = `#27ae60`)}
          >
            <CheckIcon
              sx={{ color: "white", fontSize: "44px", pointerEvents: "none" }}
            />
          </Button>
        </DialogActions>
      </Dialog>

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

        <DialogContent sx={{padding:"0"}}>
          <ExerciseDetailsDialog selectedExercise={selectedExercise} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ExercisesSelect;
