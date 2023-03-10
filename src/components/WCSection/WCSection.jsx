import "./WCSection.css";
import { useState } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect } from "react";
import ExercisesSelect from "../ExercisesSelect/ExercisesSelect";

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
    value: "lowerback",
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

function WCSection({ section, onDeleteSection, onUpdate }) {
  const { muscleGroup, id, customName, isCustom, exercises } = section;

  const [isCustomSelected, setIsCustomSelected] = useState(isCustom);
  const [customText, setCustomText] = useState(customName);
  const [selectedGroup, setSelectedGroup] = useState(muscleGroup);
  const [addedExercises, setAddedExercises] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const [isBackDropActive, setIsBackDropActive] = useState(isAdd);

  const [randomColor, setRandomColor] = useState(
    `#${Math.floor(Math.random() * 16777215).toString(16)}20`
  );

  // const toggleBackdrop = () => {
  //   setIsBackDropActive(!isBackDropActive);
  // };

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
    onDeleteSection();
  };

  const toggleCustomText = () => {
    setCustomText("");
    setSelectedGroup("");
    setIsCustomSelected(!isCustomSelected);
  };

  const addExercise = () => {
    console.log(`adding exercises for id: ${id}`);
    setIsAdd(true);
  };

  const handleAddedExercises = (addedExercises) => {
    console.log("handleAddedExercises func");
    setAddedExercises(addedExercises);
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

  return (
    <>
      <section
        className="create__section"
        style={{ backgroundColor: randomColor }}
      >
        <div className="create__section-name">
          {isCustomSelected ? (
            <TextField
              value={customText}
              onChange={customTextChangeHandler}
              sx={{ width: "200px", height: "80px" }}
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
              helperText="Please select a muscle group"
              variant="standard"
              sx={{ width: "200px", height: "80px" }}
            >
              {muscleGroups.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          )}

          <FormControlLabel
            control={<Checkbox />}
            label="Custom name"
            labelPlacement="end"
            onChange={toggleCustomText}
          />
          <button
            className="create__delete-button"
            onClick={() => deleteSection()}
          >
            <DeleteIcon /> Delete
          </button>
        </div>

        <div className="create__exercises-container">
          <button type="button" onClick={addExercise} className="create__add">
            <AddIcon sx={{ width: "120px", height: "120px" }} />
          </button>
          {exercises?.map((exercise) => <img key={exercise.exercise._id} src={exercise.exercise.image} alt="exercise img" width={"182"} height={"187"} /> )}
        </div>
      </section>

      {isAdd && (
        <section>
          <ExercisesSelect
            existingExercises={exercises}
            muscleGroup={muscleGroup}
            customName={customName}
            onAddedExercises={handleAddedExercises}
          />

          <div
            className={`select-backdrop ${
              isAdd ? "select-backdrop--active" : ""
            }`}
            onClick={toggleIsAdd}
          ></div>
        </section>
      )}
    </>
  );
}

export default WCSection;
