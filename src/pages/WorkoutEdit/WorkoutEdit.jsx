import "./WorkoutEdit.scss";
import { useDispatch, useSelector } from "react-redux";
import { updateWorkoutPlan } from "../../features/workoutPlan/workoutPlanSlice";
import Spinner from "../../components/Spinner/Spinner";

import { Fragment, useState } from "react";
import { Button, TextField } from "@mui/material";

import WCSection from "../../components/WCSection/WCSection";
import { useEffect } from "react";
import { Box } from "@mui/system";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Add, TransformOutlined } from "@mui/icons-material";
import CheckIcon from "@mui/icons-material/Check";
import Loader from "../../components/Loader/Loader";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Navigate, useNavigate } from "react-router-dom";

// TODO: add validations

function WorkoutEdit({ workout }) {
  const { title, plan, _id } = workout;
  //   const { exercises, muscleGroup } = plan;
  const [planTitle, setPlanTitle] = useState("");
  const [sections, setSections] = useState([]);
  const [randomColor, setRandomColor] = useState(
    `#${Math.floor(Math.random() * 16777215).toString(16)}20`
  );
  const [isBuffer, setIsBuffer] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { workoutPlans, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.workoutPlan
  );

  const currentWorkoutPlan = workoutPlans[0]

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
          return ({
            muscleGroup: section.muscleGroup,
            id: Math.random() * 99,
            isCustom: false,
            customName: "",
            exercises: section.exercises,
          });
        } else {
            return ({
                muscleGroup: "",
                id: Math.random() * 99,
                isCustom: true,
                customName: section.muscleGroup,
                exercises: section.exercises,
              })
        }
      });
      console.log(transformedSections);
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
    console.log(`deleted id: ${id}`);
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
    const plan = {
      title: planTitle,
      _id: _id,
      plan: [...planObjects],
    };

    if (!planTitle) {
      alert("Please provide a title");
      return;
    }

    let alertDisplayed = false;
    plan.plan.map((section) => {
      if (section.muscleGroup === "") {
        if (!alertDisplayed) {
          alertDisplayed = true;
          alert("Muscle Group must be specified");
        }
      } else if (section.exercises.length === 0) {
        if (!alertDisplayed) {
          alertDisplayed = true;
          alert("missing exercises");
        }
      }
    });

    if (!alertDisplayed) {
        console.log("submited");
        console.log(plan);
        dispatch(updateWorkoutPlan(plan));
        setIsBuffer(true)
        setTimeout(() => {
            navigate(-1)
            setIsBuffer(false)
        },1000)
        
    }
  };


  console.log(currentWorkoutPlan);

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
