import "./WCSection.css";
import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  TextField,
  useMediaQuery,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect } from "react";
import ExercisesSelect from "../ExercisesSelect/ExercisesSelect";
import { useTheme } from "@emotion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Pagination } from "swiper";

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

function WCSection({ section = {}, onDeleteSection, onUpdate = () => {}, isFake }) {
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
    console.log({ addedExercises });
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

  const theme = useTheme();
  const matchesSmallPhone = useMediaQuery(theme.breakpoints.down("smallPhone")); //370
  const matchesPhone = useMediaQuery(theme.breakpoints.down("phone")); //420
  const matchesSm = useMediaQuery(theme.breakpoints.down("sm")); //550
  const matchesTablet = useMediaQuery(theme.breakpoints.down("tablet")); //768
  const matchesMd = useMediaQuery(theme.breakpoints.down("md")); //960
  const matchesmidLarge = useMediaQuery(theme.breakpoints.down("midLarge")); //1280
  const matchesLg = useMediaQuery(theme.breakpoints.down("lg")); //1280

  return (
    <>
      <section
        className={`create__section ${isFake && "fake-section"}`}
        style={{ backgroundColor: isFake ? "#7f8c8d" : randomColor }}
        onMouseEnter={ (e) => e.target.classList.remove("warning")}
      >
        <div className="create__section-name">
          <Box
            sx={{
              backgroundColor: isFake ? "#95a5a6" : "white",
              borderRadius: "8px",
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
                // helperText="Please select a muscle group"
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
              background: isFake ? "#95a5a6" :  "white",
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
              control={<Checkbox />}
              label={matchesSmallPhone ? "Custom text" : "Custom"}
              labelPlacement="end"
              onChange={toggleCustomText}
            />
          </Box>
          <Button
            variant="contained"
            type="button"
            style={{
              backgroundColor: isFake ? "#95a5a6" :  "white",
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
            <DeleteIcon sx={{ color: "black", fontSize: "28px", pointerEvents:"none" }} />
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
                sx={{ padding: "30px", borderRadius: "8px"}}
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
    </>
  );
}

export default WCSection;

/*
 <div className="create__exercises-container">
          <Button
            sx={{ padding: "30px", borderRadius: "8px" }}
            type="Button"
            onClick={addExercise}
            className="create__add"
          >
            <AddIcon sx={{ width: "120px", height: "120px", color: "black" }} />
          </Button>
          {exercises?.map((exercise) => (
            <img
              className="create__img"
              key={`${exercise.exercise._id}-${Math.random()*99}`}
              src={exercise.exercise.image}
              alt="exercise img"
             
            />
          ))}
        </div>
*/
