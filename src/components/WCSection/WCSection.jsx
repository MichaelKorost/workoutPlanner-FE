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

function WCSection({ index, onDeleteSection }) {
  const [isCustomSelected, setIsCustomSelected] = useState(false);
  const [customText, setCustomText] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [randomColor, setRandomColor] = useState(
    `#${Math.floor(Math.random() * 16777215).toString(16)}`
  );

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

  const addExercise = (e) => {
    e.preventDefault();
  };

  return (
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
        <button onClick={addExercise} className="create__add">
          <AddIcon sx={{ width: "120px", height: "120px" }} />
        </button>
      </div>
    </section>
  );
}

export default WCSection;
