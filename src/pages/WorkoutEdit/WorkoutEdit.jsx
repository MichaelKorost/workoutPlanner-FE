
import { useDispatch, useSelector } from "react-redux";
import { updateWorkoutPlan } from "../../features/workoutPlan/workoutPlanSlice";

import { useState } from "react";
import { Button, TextField } from "@mui/material";

import WCSection from "../../components/WCSection/WCSection";
import { useEffect } from "react";
import { Box } from "@mui/system";

import { Add } from "@mui/icons-material";
import CheckIcon from "@mui/icons-material/Check";
import Loader from "../../components/Loader/Loader";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


function WorkoutEdit({ workout }) {
  const { _id } = workout;
  const [planTitle, setPlanTitle] = useState("");
  const [sections, setSections] = useState([]);
  const [randomColor] = useState(
    `#${Math.floor(Math.random() * 16777215).toString(16)}20`
  );
  const [isBuffer, setIsBuffer] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { workoutPlans, isLoading } = useSelector((state) => state.workoutPlan);

  const currentWorkoutPlan = workoutPlans[0];

  useEffect(() => {
    if (currentWorkoutPlan) {
      setPlanTitle(currentWorkoutPlan.title);
      const transformedSections = currentWorkoutPlan.plan.map((section) => {
        if (
          section.muscleGroup === "chest" ||
          section.muscleGroup === "traps" ||
          section.muscleGroup === "shoulders" ||
          section.muscleGroup === "biceps" ||
          section.muscleGroup === "forearms" ||
          section.muscleGroup === "obliques" ||
          section.muscleGroup === "abdominals" ||
          section.muscleGroup === "quads" ||
          section.muscleGroup === "calves" ||
          section.muscleGroup === "lowerback" ||
          section.muscleGroup === "glutes" ||
          section.muscleGroup === "hamstrings" ||
          section.muscleGroup === "triceps"
        ) {
          return {
            muscleGroup: section.muscleGroup,
            id: Math.random() * 99,
            isCustom: false,
            customName: "",
            exercises: section.exercises,
          };
        } else {
          return {
            muscleGroup: "",
            id: Math.random() * 99,
            isCustom: true,
            customName: section.muscleGroup,
            exercises: section.exercises,
          };
        }
      });

      setSections(transformedSections);
    }
  }, [currentWorkoutPlan]);

  const addSection = (randomNum, sectionIndex) => {
    const id = Math.random() * 10; //uuid -Universally Unique Id
    setSections((sections) => [
      ...sections,
      {
        muscleGroup: "",
        id: id,
        isCustom: false,
        customName: "",
        exercises: [],
      },
    ]);
  };

  //   functinal set state
  const deleteSection = (id) => {
    if (sections.length <= 1) {
      setSections((sections) =>
        sections.filter((section, idx) => section.id !== id)
      );
      addSection();
    } else {
      setSections((sections) =>
        sections.filter((section, idx) => section.id !== id)
      );
    }
  };

  const planTitleHandler = (e) => {
    setPlanTitle(e.target.value);
  };

  const updateSection = (updatedSection) => {
    setSections((prevSection) =>
      prevSection.map((section) =>
        section.id === updatedSection.id ? updatedSection : section
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const planObjects = sections.map((section) => {
      return {
        muscleGroup: section?.muscleGroup || section.customName,
        exercises: section?.exercises || [],
      };
    });
    const updatedWorkout = {
      title: planTitle,
      _id: _id,
      plan: [...planObjects],
    };

    if (!planTitle) {
      toast.error("Muscle group must be specified");
      return;
    }

    let alertDisplayed = false;
    updatedWorkout.plan.map((section) => {
      if (section.muscleGroup === "") {
        if (!alertDisplayed) {
          alertDisplayed = true;
          toast.error("Muscle group must be specified");
        }
      } else if (section.exercises.length === 0) {
        if (!alertDisplayed) {
          alertDisplayed = true;
          toast.error("Missing exercises");
        }
      }
      return null
    });

    if (!alertDisplayed) {
     
     
      dispatch(updateWorkoutPlan(updatedWorkout));
      setIsBuffer(true);
      setTimeout(() => {
        navigate(-1);
        setIsBuffer(false);
        toast.success("Workout updated successfully!");
      }, 1000);
    }
  };



  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="workout-create-page">
      {isBuffer && <Loader />}
      <form onSubmit={handleSubmit} className="create">
        <Box
          sx={{
            backgroundColor: randomColor,
            padding: "5px 5px 10px  5px",
            margin: "20px 0 0 0",
            borderRadius: "8px",
            maxWidth: "700px",
            width: "80%",
            boxShadow:
              "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
          }}
        >
          <TextField
            value={planTitle}
            onChange={planTitleHandler}
            id="standard-basic"
            label="Workout Title"
            sx={{ width: "100%" }}
            variant="standard"
            placeholder="Push Pull Legs..."
          />
        </Box>

        {sections.map((section) => (
          <WCSection
            isFake={false}
            key={section.id}
            section={section}
            onDeleteSection={() => deleteSection(section.id)}
            onUpdate={updateSection}
          />
        ))}

        <div className="workout-create-add-container">
          <WCSection isFake={true} />
          <Button
            className="workout-create__add-btn"
            type="button"
            onClick={() =>
              addSection(Math.floor(Math.random() * 999), sections.length)
            }
          >
            <Add
              sx={{ fontSize: "90px", color: "white", pointerEvents: "none" }}
            />
          </Button>
        </div>
        <Button
          className="workout-create__create-btn"
          variant="contained"
          type="submit"
        >
          <CheckIcon
            sx={{ fontSize: "40px", color: "white", pointerEvents: "none" }}
          />{" "}
          Update Workout
        </Button>
      </form>
    </section>
  );
}

export default WorkoutEdit;
