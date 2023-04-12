import "./WCSection.css";
import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Input,
  InputAdornment,
  MenuItem,
  TextField,
  useMediaQuery,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";
import ExercisesSelect from "../ExercisesSelect/ExercisesSelect";
import { useTheme } from "@emotion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import ExerciseCard from "../ExerciseCard/ExerciseCard";
import { toast } from "react-toastify";

const muscleGroups = [
  {
    value: "chest",
    label: "Chest",
  },
  {
    value: "traps",
    label: "Traps",
  },
  {
    value: "triceps",
    label: "Triceps",
  },
  {
    value: "shoulders",
    label: "Shoulders",
  },
  {
    value: "biceps",
    label: "Biceps",
  },
  {
    value: "forearms",
    label: "Forearms",
  },
  {
    value: "obliques",
    label: "Obliques",
  },
  {
    value: "abdominals",
    label: "Abdominals",
  },
  {
    value: "quads",
    label: "Quads",
  },
  {
    value: "calves",
    label: "Calves",
  },
  {
    value: "traps-mid-back",
    label: "traps (mid-back)",
  },
  {
    value: "lower back",
    label: "Lower back",
  },
  {
    value: "glutes",
    label: "Glutes",
  },
  {
    value: "hamstrings",
    label: "Hamstrings",
  },
];

// TODO: from each section, will receive an object

function WCSection({
  section = {},
  onDeleteSection,
  onUpdate = () => {},
  isFake,
}) {
  const { muscleGroup, id, customName, isCustom = false, exercises } = section;

  const [isCustomSelected, setIsCustomSelected] = useState(isCustom);
  const [customText, setCustomText] = useState(customName);
  const [selectedGroup, setSelectedGroup] = useState(muscleGroup);
  const [addedExercises, setAddedExercises] = useState(exercises || []);
  const [isAdd, setIsAdd] = useState(false);
  const [isChecked, setIsChecked] = useState(isCustom || false);
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState({});
  const [randomColor] = useState(
    `#${Math.floor(Math.random() * 16777215).toString(16)}20`
  );

  const toggleIsAdd = () => {
    setIsAdd(!isAdd);
  };

  const customTextChangeHandler = (e) => {
    setCustomText(e.target.value);
  };

  const selectedGroupHandler = (e) => {
    setSelectedGroup(e.target.value);
  };

  const deleteSection = () => {
    if (!isFake) {
      onDeleteSection();
    }
  };

  const toggleCustomText = () => {
    setCustomText("");
    setSelectedGroup("");
    setIsCustomSelected(!isCustomSelected);
    setIsChecked(!isChecked);
  };

  const addExercise = () => {
    if (!isFake) {
      setIsAdd(true);
    }
  };

  const handleAddedExercises = (addedExercises) => {
    setAddedExercises(addedExercises);
  };

  const handleExerciseClick = (exercise) => {
    setSelectedExercise(exercise);
    setOpen(true);
    setReps(exercise.reps)
    setSets(exercise.sets)
    setWeight(exercise.weight)
  };

  const handleConfirmExercise = () => {
    if (sets < 0 || reps < 0 || weight < 0) {
      toast.error("values cannot be negative");
      return;
    }
  
    const updatedExercise = {
      exercise: selectedExercise.exercise,
      sets: sets,
      reps: reps,
      weight: weight,
    };
  
    setAddedExercises((prevExercises) => {
      const index = prevExercises.findIndex((exercise) => exercise.exercise._id === updatedExercise.exercise._id);
        const newExercises = [...prevExercises];
        newExercises[index] = updatedExercise;
        return newExercises;
      
    });
  
    setOpen(false);
    setSets("");
    setReps("");
    setWeight("");
  };

  useEffect(() => {
    onUpdate({
      id,
      muscleGroup: selectedGroup,
      customName: customText,
      isCustom: isCustomSelected,
      exercises: addedExercises,
    });
  }, [selectedGroup, customText, isCustomSelected, addedExercises, id]);

  const theme = useTheme();
  const matchesSmallPhone = useMediaQuery(theme.breakpoints.down("smallPhone")); //370
  const matchesPhone = useMediaQuery(theme.breakpoints.down("phone")); //420
  const matchesSm = useMediaQuery(theme.breakpoints.down("sm")); //550
  const matchesTablet = useMediaQuery(theme.breakpoints.down("tablet")); //768
  const matchesMd = useMediaQuery(theme.breakpoints.down("md")); //960
  const matchesmidLarge = useMediaQuery(theme.breakpoints.down("midLarge")); //1170

  return (
    <>
      <section
        className={`create__section ${isFake && "fake-section"}`}
        style={{ backgroundColor: isFake ? "#7f8c8d" : randomColor }}
        onMouseEnter={(e) => e.target.classList.remove("warning")}
      >
        <div className="create__section-name">
          <Box
            sx={{
              backgroundColor: isFake ? "#95a5a6" : "white",
              padding: "5px",
              borderRadius: "8px",
              boxShadow:
                "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
              width: matchesSmallPhone ? "100%" : "230px",
            }}
          >
            {isCustomSelected ? (
              <TextField
                value={customText}
                onChange={customTextChangeHandler}
                sx={{
                  width: matchesSmallPhone ? "100%" : "200px",
                  height: "50px",
                }}
                id="standard-basic"
                label="Custom Text"
                variant="standard"
              />
            ) : (
              <TextField
                id="standard-select-muscle-group"
                value={selectedGroup}
                onChange={selectedGroupHandler}
                select
                label="Muscle group"
                defaultValue=""
                variant="standard"
                sx={{
                  width: matchesSmallPhone ? "100%" : "200px",
                  height: "50px",
                }}
              >
                {muscleGroups.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          </Box>

          <Box
            sx={{
              background: isFake ? "#95a5a6" : "white",
              boxShadow:
                "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
              padding: "5px",
              borderRadius: "8px",
              height: "60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            className={"create__checkbox"}
          >
            <FormControlLabel
              control={
                <Checkbox checked={isChecked} onChange={toggleCustomText} />
              }
              label={matchesSmallPhone ? "Custom text" : "Custom"}
              labelPlacement="end"
            />
          </Box>
          <Button
            variant="contained"
            type="button"
            style={{
              backgroundColor: isFake ? "#95a5a6" : "white",
              minWidth: "42px",
              height: "42px",
              padding: "0",
              margin: "0 0 0 auto",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = `#c2361690`)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = `white`)}
            className="create__delete-button"
            onClick={() => deleteSection()}
          >
            <DeleteIcon
              sx={{ color: "black", fontSize: "28px", pointerEvents: "none" }}
            />
          </Button>
        </div>

        <div className="create__exercises-container">
          <Swiper
            slidesPerView={
              matchesPhone
                ? 2
                : matchesSm
                ? 2
                : matchesTablet
                ? 3
                : matchesMd
                ? 4
                : matchesmidLarge
                ? 5
                : 6
            }
            freeMode={true}
            pagination={{ type: "fracion" }}
            modules={[Pagination]}
            className="create-swiper"
          >
            <SwiperSlide className="create-swiper__slide">
              <Button
                sx={{ padding: "30px", borderRadius: "8px" }}
                type="Button"
                onClick={addExercise}
                className={`create__add ${isFake && "fake"}`}
              >
                <AddIcon
                  sx={{ width: "120px", height: "120px", color: "black" }}
                />
              </Button>
            </SwiperSlide>

            {exercises?.map((exercise) => (
              <SwiperSlide
                key={`${exercise.exercise._id}-${Math.random() * 99}`}
                className="create-swiper__slide"
              >
                <img
                  className="create__img"
                  onClick={() => handleExerciseClick(exercise)}
                  src={exercise.exercise.image}
                  alt="exercise img"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {isAdd && (
        <section>
          <ExercisesSelect
            selectedFilter={selectedGroup}
            existingExercises={exercises}
            muscleGroup={muscleGroup}
            customName={customName}
            onAddedExercises={handleAddedExercises}
            onToggleSelect={toggleIsAdd}
          />

          <div
            className={`select-backdrop ${
              isAdd ? "select-backdrop--active" : ""
            }`}
            onClick={toggleIsAdd}
          ></div>
        </section>
      )}

      <Dialog
        className="exercise-select__dialog"
        open={open}
        keepMounted
        onClose={() => {
          setOpen(false);
        }}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent
          sx={{
            padding: "20px",
            paddingTop: "20px !important",
            overflow: "hidden",
          }}
        >
          <div className="exercise-select-dialog-container">
            <ExerciseCard
              exercise={selectedExercise?.exercise}
              isSelect={true}
              // onCardClick={() => {
              //   setOpenDetails(true);
              // }}
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
            onClick={() => {
              setOpen(false);
            }}
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
    </>
  );
}

export default WCSection;
