import "./WorkoutCreate.css";
import { useDispatch, useSelector } from "react-redux";
import { createWorkoutPlan } from "../../features/workoutPlan/workoutPlanSlice";
import Spinner from "../../components/Spinner/Spinner";

import { Fragment, useState } from "react";
import { TextField } from "@mui/material";

import WCSection from "../../components/WCSection/WCSection";
import { useEffect } from "react";



function WorkoutCreate() {
  const [planTitle, setPlanTitle] = useState("");
  const [sections, setSections] = useState([]);

  const dispatch = useDispatch();

  const { workoutPlans, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.workoutPlan
  );

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
    setSections((sections) =>
      sections.filter((section, idx) => section.id !== id)
    );
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
    const planObjects = sections.map((section) =>  {return {muscleGroup: section?.muscleGroup || section.customName, exercises : section?.exercises || []}});
    const plan = {
      title: planTitle,
      plan: [
        ...planObjects
      ],
    };

    

    console.log("submited");
    console.log(plan)
    dispatch(createWorkoutPlan(plan))
  };

  useEffect(() => {
    console.log(sections);
  });

  useEffect(() => {
    return () => {
      addSection();
    };
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="create">
        <TextField
          value={planTitle}
          onChange={planTitleHandler}
          sx={{ maxWidth: "800px", width: "80%" }}
          id="standard-basic"
          label="Workout Title"
          variant="standard"
          placeholder="Push Pull Legs..."
        />

        {sections.map((section) => (
          <WCSection
            key={section.id}
            section={section}
            onDeleteSection={() => deleteSection(section.id)}
            onUpdate={updateSection}
          />
        ))}

        <div>
          <button
            type="button"
            onClick={() =>
              addSection(Math.floor(Math.random() * 999), sections.length)
            }
          >
            Add another section
          </button>
        </div>
        <button type="submit">Submit Form</button>
      </form>


    </>
  );
}

export default WorkoutCreate;

