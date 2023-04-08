import { TextField } from "@mui/material";
import { Box } from "@mui/system";

function ExercisesSearchBar({ onChange, value, placeholder, searchLabel }) {
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
        backgroundColor: "#74b9ff40",
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
