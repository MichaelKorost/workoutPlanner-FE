import "./WorkoutCreate.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createWorkoutPlan,
  reset,
} from "../../features/workoutPlan/workoutPlanSlice";

import { forwardRef, useState } from "react";
import { Button, TextField } from "@mui/material";

import WCSection from "../../components/WCSection/WCSection";
import { useEffect } from "react";
import { Box } from "@mui/system";

import { Add } from "@mui/icons-material";
import CheckIcon from "@mui/icons-material/Check";
import Loader from "../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {toast} from "react-toastify"
// TODO: add validations

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function WorkoutCreate() {
  const [planTitle, setPlanTitle] = useState("");
  const [sections, setSections] = useState([]);
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")
  const [randomColor] = useState(
    `#${Math.floor(Math.random() * 16777215).toString(16)}20`
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading } = useSelector((state) => state.workoutPlan);



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
      plan: [...planObjects],
    };

    if (!planTitle) {
      
      toast.error("Workout is missing a title")
      return;
    }

    let alertDisplayed = false;
    plan.plan.map((section) => {
      if (section.muscleGroup === "") {
        if (!alertDisplayed) {
          alertDisplayed = true;
          toast.error("Muscle group must be specified")
        }
      } else if (section.exercises.length === 0) {
        if (!alertDisplayed) {
          alertDisplayed = true;

          // alert("missing exercises");
          toast.error("Missing exercises")
          // setOpen(true);
          // setErrorMessage("missing exercises")
        }
      }
    });

    if (!alertDisplayed) {
      console.log("submited");
      console.log(plan);
      dispatch(createWorkoutPlan(plan));
      dispatch(reset());
      toast.success("Workout created successfully!")
      navigate(-1);
    }
  };

  useEffect(() => {
    // console.log(sections);
  });

  useEffect(() => {
    addSection();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
    <section className="workout-create-page">
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
          Create Workout
        </Button>
      </form>

    </section>
    </>
  );
}

export default WorkoutCreate;
