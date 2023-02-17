import "./Exercises.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
// collapse
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

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

const baseUrl = "https://workout-planner-be.vercel.app/api/exercises";

function Exercises() {
  // TODO: favorite an exercise
  //   TODO: mobile responsive
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openMuscleGroup, setOpenMuscleGroup] = useState(false);
  const [openEquipment, setOpenEquipment] = useState(false);
  const [openDiff, setOpenDiff] = useState(false);
  const [searchBar, setSearchBar] = useState("");

  const [searchFilters, setSearchFilters] = useState({
    group: [],
    tags: [],
    difficulty: [],
  });

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
  }, [dispatch,searchFilters]);


  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    const selectedFilters = {...searchFilters}
    if(checked) {
        selectedFilters[name].push(value)
    }else {
        selectedFilters[name] = selectedFilters[name].filter((val) => val !== value)
    }
    setSearchFilters(selectedFilters)
  };

  const handleMuscleGroupClick = () => {
    setOpenMuscleGroup(!openMuscleGroup);
  };
  const handleEquipmentClick = () => {
    setOpenEquipment(!openEquipment);
  };
  const handleDiffClick = () => {
    setOpenDiff(!openDiff);
  };


  const exerciseClickHandler = (id) => {
    console.log(`card with id of ${id}`);
    navigate("/exercises/id/" + id);
  };

  //   if (isLoading) {
  //     return <Spinner />;
  //   }

  return (
    <>
      <header className="header">
        <h1 className="header__title">Exercises</h1>
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
            value={searchBar}
            fullWidth
            onChange={(e) => {
              setSearchBar(e.target.value);
            }}
            id="standard-basic"
            label="Search Exercises"
            variant="standard"
            placeholder="name, category, muscle group..."
          />
        </Box>
      </header>

      <section className="exercises__content">
        <section className="exercises__filters">
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="Filters"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Filter by:
              </ListSubheader>
            }
          >
            <ListItemButton onClick={handleMuscleGroupClick}>
              <ListItemText primary="Muscle Group" />
              {openMuscleGroup ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={openMuscleGroup} timeout="auto">
              <List component="div" disablePadding>
                <ListItemText sx={{ pl: 4 }}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="group"
                          value={"chest"}
                          sx={{ width: "20px", height: "20px", mr: "10px" }}
                          onChange={(e) => {
                            handleCheckboxChange(e);
                          }}
                        />
                      }
                      label="Chest"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                        name="group"
                          value={"traps"}
                          //   checked={isChecked}
                          sx={{ width: "20px", height: "20px", mr: "10px" }}
                          onChange={(e) => {
                            handleCheckboxChange(e);
                            // setIsChecked(e.target.checked);
                          }}
                        />
                      }
                      label="Traps"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                        name="group"
                        value={"shoulders"}
                          sx={{ width: "20px", height: "20px", mr: "10px" }}
                          onChange={(e) => {
                            handleCheckboxChange(e);
                            // setIsChecked(e.target.checked);
                          }}
                        />
                      }
                      label="Shoulders"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                        name="group"
                        value={"biceps"}
                        onChange={(e) => {
                            handleCheckboxChange(e);
                          }}
                          sx={{ width: "20px", height: "20px", mr: "10px" }}
                        />
                      }
                      label="Biceps"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                        name="group"
                        value={"forearms"}
                        onChange={(e) => {
                            handleCheckboxChange(e);
                          }}
                          sx={{ width: "20px", height: "20px", mr: "10px" }}
                        />
                      }
                      label="Forearms"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                        name="group"
                        value={"obliques"}
                        onChange={(e) => {
                            handleCheckboxChange(e);
                          }}
                          sx={{ width: "20px", height: "20px", mr: "10px" }}
                        />
                      }
                      label="Obliques"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                        name="group"
                        value={"abdominals"}
                        onChange={(e) => {
                            handleCheckboxChange(e);
                          }}
                          sx={{ width: "20px", height: "20px", mr: "10px" }}
                        />
                      }
                      label="Abdominals"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                        name="group"
                        value={"quads"}
                        onChange={(e) => {
                            handleCheckboxChange(e);
                          }}
                          sx={{ width: "20px", height: "20px", mr: "10px" }}
                        />
                      }
                      label="Quads"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                        name="group"
                        value={"calves"}
                        onChange={(e) => {
                            handleCheckboxChange(e);
                          }}
                          sx={{ width: "20px", height: "20px", mr: "10px" }}
                        />
                      }
                      label="Calves"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                        name="group"
                        value={"traps (mid-back)"}
                        onChange={(e) => {
                            handleCheckboxChange(e);
                          }}
                          sx={{ width: "20px", height: "20px", mr: "10px" }}
                        />
                      }
                      label="Traps (mid back)"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                        name="group"
                        value={"lower back"}
                        onChange={(e) => {
                            handleCheckboxChange(e);
                          }}
                          sx={{ width: "20px", height: "20px", mr: "10px" }}
                        />
                      }
                      label="lower back"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                        name="group"
                        value={"glutes"}
                        onChange={(e) => {
                            handleCheckboxChange(e);
                          }}
                          sx={{ width: "20px", height: "20px", mr: "10px" }}
                        />
                      }
                      label="Glutes"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                        name="group"
                        value={"hamstrings"}
                        onChange={(e) => {
                            handleCheckboxChange(e);
                          }}
                          sx={{ width: "20px", height: "20px", mr: "10px" }}
                        />
                      }
                      label="Hamstrings"
                    />
                  </FormGroup>
                </ListItemText>
              </List>
            </Collapse>

            <ListItemButton onClick={handleEquipmentClick}>
              <ListItemText primary="Equipment" />
              {openEquipment ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={openEquipment} timeout="auto">
              <List component="div" disablePadding>
                <ListItemText sx={{ pl: 4 }}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                        name="tags"
                        value={"bodyweight"}
                          sx={{ width: "20px", height: "20px", mr: "10px" }}
                          onChange={(e) => {
                            handleCheckboxChange(e);
                          }}
                        />
                      }
                      label="Bodyweight"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                        name="tags"
                        value={"dumbbells"}
                        onChange={(e) => {
                            handleCheckboxChange(e);
                          }}
                          sx={{ width: "20px", height: "20px", mr: "10px" }}
                          
                        />
                      }
                      label="Dumbbells"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                        name="tags"
                        value={"barbell"}
                        onChange={(e) => {
                            handleCheckboxChange(e);
                          }}
                          sx={{ width: "20px", height: "20px", mr: "10px" }}
                        />
                      }
                      label="Barbell"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                        name="tags"
                        value={"kettlebell"}
                        onChange={(e) => {
                            handleCheckboxChange(e);
                          }}
                          sx={{ width: "20px", height: "20px", mr: "10px" }}
                        />
                      }
                      label="Kettlebells"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                        name="tags"
                        value={"band"}
                        onChange={(e) => {
                            handleCheckboxChange(e);
                          }}
                          sx={{ width: "20px", height: "20px", mr: "10px" }}
                        />
                      }
                      label="Band"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                        name="tags"
                        value={"cable"}
                        onChange={(e) => {
                            handleCheckboxChange(e);
                          }}
                          sx={{ width: "20px", height: "20px", mr: "10px" }}
                        />
                      }
                      label="Cables"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                        name="tags"
                        value={"stretches"}
                        onChange={(e) => {
                            handleCheckboxChange(e);
                          }}
                          sx={{ width: "20px", height: "20px", mr: "10px" }}
                        />
                      }
                      label="stretches"
                    />
                  </FormGroup>
                </ListItemText>
              </List>
            </Collapse>
            <ListItemButton onClick={handleDiffClick}>
              <ListItemText primary="Difficulty" />
              {openDiff ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={openDiff} timeout="auto">
              <List component="div" disablePadding>
                <ListItemText sx={{ pl: 4 }}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                        name="difficulty"
                        value={"beginner"}
                        onChange={(e) => {
                            handleCheckboxChange(e);
                          }}
                          sx={{ width: "20px", height: "20px", mr: "10px" }}
                        />
                      }
                      label="Beginner"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                        name="difficulty"
                        value={"intermediate"}
                        onChange={(e) => {
                            handleCheckboxChange(e);
                          }}
                          sx={{ width: "20px", height: "20px", mr: "10px" }}
                        />
                      }
                      label="Intermediate"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                        name="difficulty"
                        value={"advanced"}
                        onChange={(e) => {
                            handleCheckboxChange(e);
                          }}
                          sx={{ width: "20px", height: "20px", mr: "10px" }}
                        />
                      }
                      label="Advanced"
                    />
                  </FormGroup>
                </ListItemText>
              </List>
            </Collapse>
          </List>
        </section>

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
                    onCardClick={() => exerciseClickHandler(exercise._id)}
                  />
                );
              })
          )}
        </section>
      </section>
    </>
  );
}

export default Exercises;
