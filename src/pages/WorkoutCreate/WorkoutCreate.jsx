import "./WorkoutCreate.css";
import { useDispatch, useSelector } from "react-redux";
import { createWorkoutPlan } from "../../features/workoutPlan/workoutPlanSlice";
import Spinner from "../../components/Spinner/Spinner";

import { Fragment, useState } from "react";
import { TextField } from "@mui/material";

import WCSection from "../../components/WCSection/WCSection";
import { useEffect } from "react";

// TODO: replace components with an array of JSON objects and map them instead.
// const sections = [
//   {
//     muscleGroup: "",
//     id: Math.random() * 10,
//     customName: false,
//     exercises: [],
//   },
// ];


function WorkoutCreate() {
  const [newWorkoutPlan, setNewWorkoutPlan] = useState({});
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

  const createWorkout = () => {
    console.log(newWorkoutPlan);
    dispatch(createWorkoutPlan(newWorkoutPlan));
  };

  const planTitleHandler = (e) => {
    setPlanTitle(e.target.value);
  };

  const updateSection =  (updatedSection) => {
    setSections((prevSection) => 
    prevSection.map((section )=> section.id === updatedSection.id ? updatedSection : section ))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const planObjects = [];
    const plan = {
      title: planTitle,
      plan: [
        {
          muscleGroup: "chest",
          exercises: [
            {
              exercise: {
                name: "Barbell Bench Press",
                image:
                  "https://media.istockphoto.com/id/494037460/photo/orange-fruit-isolated-on-a-white-background.jpg?s=612x612&w=0&k=20&c=Podpyj2fviG76mCSsr3aR6O3t4o3LdkahTHSU0GBCmQ=",
                group: "chest",
                tags: ["weights", "barbell"],
                difficulty: "Intermediate",
                guide: [
                  "Lay flat on the bench with your feet on the ground. With straight arms unrack the bar.",
                  "Lower the bar to your mid chest",
                  "Raise the bar until you've locked your elbows.",
                ],
                demo: [
                  "https://res.cloudinary.com/dlvvmlrui/image/upload/v1674265312/cld-sample-5.jpg",
                  "https://res.cloudinary.com/dlvvmlrui/image/upload/v1674265311/cld-sample-4.jpg",
                ],
              },
              sets: 3,
              reps: 10,
              weight: 80,
            },
            {
              exercise: {
                name: "Decline Push Up",
                image:
                  "https://media.istockphoto.com/id/494037460/photo/orange-fruit-isolated-on-a-white-background.jpg?s=612x612&w=0&k=20&c=Podpyj2fviG76mCSsr3aR6O3t4o3LdkahTHSU0GBCmQ=",
                group: "chest",
                tags: ["bodyweight"],
                difficulty: "Beginner",
                guide: [
                  "Use a bench to elevate your feet.\n",
                  "Put your hands slightly wider than shoulder-width.\n",
                  "Slowly lower your body until your chest almost touches the ground\n",
                  "Raise your body until you almost lock your elbows.\n",
                ],
                demo: [
                  "https://res.cloudinary.com/dlvvmlrui/image/upload/v1674265312/cld-sample-5.jpg",
                  "https://res.cloudinary.com/dlvvmlrui/image/upload/v1674265311/cld-sample-4.jpg",
                ],
              },
              sets: 4,
              reps: 30,
              weight: 20,
            },
          ],
        },
      ],
    };

    console.log("submited");
    console.log(plan);
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
    <div>
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
 
    {sections.map(section => (<WCSection key={section.id} section={section} onDeleteSection={() => deleteSection(section.id)} onUpdate={updateSection} />))}

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

      <div className="select-workout">
        
      </div>
    </div>
  );
}

export default WorkoutCreate;

/*
{
    title: "testing chest",
    plan: [
      {
        muscleGroup: "chest",
        exercises: [
          {
            exercise: {
              name: "Barbell Bench Press",
              image:
                "https://media.istockphoto.com/id/494037460/photo/orange-fruit-isolated-on-a-white-background.jpg?s=612x612&w=0&k=20&c=Podpyj2fviG76mCSsr3aR6O3t4o3LdkahTHSU0GBCmQ=",
              group: "chest",
              tags: ["weights", "barbell"],
              difficulty: "Intermediate",
              guide: [
                "Lay flat on the bench with your feet on the ground. With straight arms unrack the bar.",
                "Lower the bar to your mid chest",
                "Raise the bar until you've locked your elbows.",
              ],
              demo: [
                "https://res.cloudinary.com/dlvvmlrui/image/upload/v1674265312/cld-sample-5.jpg",
                "https://res.cloudinary.com/dlvvmlrui/image/upload/v1674265311/cld-sample-4.jpg",
              ],
            },
            sets: 3,
            reps: 10,
            weight: 80,
          },
          {
            exercise: {
              name: "Decline Push Up",
              image:
                "https://media.istockphoto.com/id/494037460/photo/orange-fruit-isolated-on-a-white-background.jpg?s=612x612&w=0&k=20&c=Podpyj2fviG76mCSsr3aR6O3t4o3LdkahTHSU0GBCmQ=",
              group: "chest",
              tags: ["bodyweight"],
              difficulty: "Beginner",
              guide: [
                "Use a bench to elevate your feet.\n",
                "Put your hands slightly wider than shoulder-width.\n",
                "Slowly lower your body until your chest almost touches the ground\n",
                "Raise your body until you almost lock your elbows.\n",
              ],
              demo: [
                "https://res.cloudinary.com/dlvvmlrui/image/upload/v1674265312/cld-sample-5.jpg",
                "https://res.cloudinary.com/dlvvmlrui/image/upload/v1674265311/cld-sample-4.jpg",
              ],
            },
            sets: 4,
            reps: 30,
            weight: 20,
          },
        ],
      },
    ],
  }
*/

/* functions and jsx
  { {sections.map(({ id, title, likes, author }, index) => (
            // <Post title={title} author={author}/>
            <Fragment key={id}>{component}</Fragment>
        ))} }

  //   const addSection = (randomNum, sectionIndex) => {
  //     const newSection = (
  //       <WCSection
  //         index={sectionIndex}
  //         onDeleteSection={() => deleteSection(sectionIndex)}
  //       />
  //     );
  //     setSections((prevSections) => [...prevSections, newSection]);
  //   };

  //   const deleteSection = (index) => {
  //     console.log(`deleted index: ${index}`);
  //     const updatedSections = [...sections];
  //     updatedSections.splice(index, 1);
  //     setSections(updatedSections);
  //   };

  //   const deleteSection = (index) => {
      //     console.log(`deleted index: ${index}`);
      //     setSections((sections) => sections.filter((_, idx) => index !== idx));
      //   };
*/
