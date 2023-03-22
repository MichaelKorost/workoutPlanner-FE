import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import "./ExercisesSearchBar.css";

function ExercisesSearchBar({ onChange, value, placeholder, searchLabel }) {
  const [randomColor, setRandomColor] = useState(
    `#${Math.floor(Math.random() * 16777215).toString(16)}20`
  );
  const searchBarHandler = (e) => {
    onChange(e.target.value);
  };

  return (
    <Box
      component="div"

      sx={{
        display: "flex",
        justifyContent: "center",
        width: "400px",
        maxWidth: "90%",
        backgroundColor:randomColor,
        padding: "5px 5px 10px  5px",
        borderRadius: "8px", 
        boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        value={value}
        fullWidth
        onChange={searchBarHandler}
        id="standard-basic"
        label={searchLabel}
        variant="standard"
        placeholder={placeholder}
      />
    </Box>
  );
}

export default ExercisesSearchBar;
