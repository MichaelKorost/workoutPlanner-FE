import "./ExercisesFilters.css";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  Collapse,
  FormControlLabel,
  FormGroup,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import TuneIcon from "@mui/icons-material/Tune";

function ExercisesFilters({ onChangeFilters, appliedFilter }) {
  // const computedState = useFilters() // useSearchParams
  const [isOpenMuscleGroup, setIsOpenMuscleGroup] = useState(false);
  const [isOpenEquipment, setIsOpenEquipment] = useState(false);
  const [isOpenDiff, setIsOpenDiff] = useState(false);
  const [searchFilters, setSearchFilters] = useState(() => {
    if (appliedFilter !== "") {
      return {
        group: [appliedFilter],
        tags: [],
        difficulty: [],
      };
    } else {
      return {
        group: [],
        tags: [],
        difficulty: [],
      };
    }
  });

  const [isFilterClicked, setIsFilterClicked] = useState(false);
  const [active, setActive] = useState(false);

  const toggleMenu = () => {
    setActive(!active);
    setIsFilterClicked(!isFilterClicked);
  };

  const toggleOpenFilter = () => {
    setIsFilterClicked(!isFilterClicked);
    setActive(!active);
  };

  // useEffect(() => {
  //   if (appliedFilter !== "") {
  //     setSearchFilters({
  //       group: [appliedFilter],
  //       tags: [],
  //       difficulty: [],
  //     });
  //   }
  // }, [appliedFilter]);

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    const selectedFilters = { ...searchFilters };
    if (checked) {
      selectedFilters[name].push(value);
    } else {
      selectedFilters[name] = selectedFilters[name].filter(
        (val) => val !== value
      );
    }
    setSearchFilters(selectedFilters);
  };

  const handleMuscleGroupClick = () => {
    setIsOpenMuscleGroup(!isOpenMuscleGroup);
  };
  const handleEquipmentClick = () => {
    setIsOpenEquipment(!isOpenEquipment);
  };
  const handleDiffClick = () => {
    setIsOpenDiff(!isOpenDiff);
  };

  useEffect(() => {
    onChangeFilters(searchFilters);
  }, [onChangeFilters, searchFilters]);

  const isTablet = useMediaQuery((theme) =>
    theme.breakpoints.between("xs", "tablet")
  );

  return (
    <>
      {isTablet && (
        <Button
          className="filter-button "
          style={{ backgroundColor: `` }}
          onMouseEnter={(e) => (e.target.style.color = `#fd79a880`)}
          onMouseLeave={(e) => (e.target.style.color = `black`)}
          type="button"
          onClick={toggleOpenFilter}
        >
          <TuneIcon
            sx={{
              fontSize: "36px",
              textAlign: "center",
              pointerEvents: "none",
              color: "black",
            }}
          />
        </Button>
      )}

      <section
        className={`exercises__filters ${
          isFilterClicked ? "exercises__filters--active" : ""
        }`}
        // style={{ backgroundColor: "#fd79a840" }}
      >
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "", color: "" }}
          component="nav"
          aria-labelledby="Filters"
          subheader={
            <ListSubheader
              sx={{ backgroundColor: "#fd79a800", position: "static" }}
              component="div"
              id="nested-list-subheader"
            >
              Filter by:
            </ListSubheader>
          }
        >
          <ListItemButton onClick={handleMuscleGroupClick}>
            <ListItemText
              primary="Muscle Group"
              secondary={
                searchFilters.group?.length
                  ? searchFilters.group?.length + " selected"
                  : "none selected"
              }
            />
            {isOpenMuscleGroup ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={isOpenMuscleGroup} timeout="auto">
            <List component="div" disablePadding>
              <ListItemText sx={{ pl: 4 }}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="group"
                        checked={searchFilters.group.includes("chest")}
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
                        checked={searchFilters.group.includes("traps")}
                        value={"traps"}
                        sx={{ width: "20px", height: "20px", mr: "10px" }}
                        onChange={(e) => {
                          handleCheckboxChange(e);
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
                        checked={searchFilters.group.includes("triceps")}
                        value={"triceps"}
                        sx={{ width: "20px", height: "20px", mr: "10px" }}
                        onChange={(e) => {
                          handleCheckboxChange(e);
                        }}
                      />
                    }
                    label="Triceps"
                  />
                </FormGroup>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="group"
                        checked={searchFilters.group.includes("shoulders")}
                        value={"shoulders"}
                        sx={{ width: "20px", height: "20px", mr: "10px" }}
                        onChange={(e) => {
                          handleCheckboxChange(e);
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
                        checked={searchFilters.group.includes("biceps")}
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
                        checked={searchFilters.group.includes("forearms")}
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
                        checked={searchFilters.group.includes("obliques")}
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
                        checked={searchFilters.group.includes("abdominals")}
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
                        checked={searchFilters.group.includes("quads")}
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
                        checked={searchFilters.group.includes("calves")}
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
                        checked={searchFilters.group.includes("traps-mid-back")}
                        value={"traps-mid-back"}
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
                        checked={searchFilters.group.includes("lower back")}
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
                        checked={searchFilters.group.includes("glutes")}
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
                        checked={searchFilters.group.includes("hamstrings")}
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
            <ListItemText
              primary="Equipment"
              secondary={
                searchFilters.tags?.length
                  ? searchFilters.tags?.length + " selected"
                  : "none selected"
              }
            />
            {isOpenEquipment ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={isOpenEquipment} timeout="auto">
            <List component="div" disablePadding>
              <ListItemText sx={{ pl: 4 }}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="tags"
                        value={"weights"}
                        sx={{ width: "20px", height: "20px", mr: "10px" }}
                        onChange={(e) => {
                          handleCheckboxChange(e);
                        }}
                      />
                    }
                    label="weights"
                  />
                </FormGroup>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="tags"
                        value={"machine"}
                        sx={{ width: "20px", height: "20px", mr: "10px" }}
                        onChange={(e) => {
                          handleCheckboxChange(e);
                        }}
                      />
                    }
                    label="machine"
                  />
                </FormGroup>
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
                        value={"dumbbell"}
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
            <ListItemText
              primary="Difficulty"
              secondary={
                searchFilters.difficulty?.length
                  ? searchFilters.difficulty?.length + " selected"
                  : "none selected"
              }
            />
            {isOpenDiff ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={isOpenDiff} timeout="auto">
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

      <div
        style={{ zIndex: "13" }}
        className={`backdrop ${active ? "backdrop-active" : ""}`}
        onClick={toggleMenu}
      ></div>
    </>
  );
}

export default ExercisesFilters;
