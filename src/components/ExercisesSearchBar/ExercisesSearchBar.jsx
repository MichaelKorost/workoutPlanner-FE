import { TextField } from '@mui/material';
import { Box } from '@mui/system';
import './ExercisesSearchBar.css'

function ExercisesSearchBar({onChange, value}) {

    const searchBarHandler = (e) => {
        onChange(e.target.value)
    }

  return (
    <Box
          component="form"
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "800px",
            maxWidth: "90%",
            boxShadow: "box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            value={value}
            fullWidth
            onChange={searchBarHandler}
            id="standard-basic"
            label="Search Exercises"
            variant="standard"
            placeholder="name, category, muscle group..."
          />
        </Box>
  )
}

export default ExercisesSearchBar