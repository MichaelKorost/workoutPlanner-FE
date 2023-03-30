import "./WorkoutDetails.scss";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Tilt from "react-parallax-tilt";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import {
  deleteWorkoutPlan,
  createWorkoutPlan,
  deleteWorkoutPlanFromDetailPage,
  saveNewWorkout,
} from "../../features/workoutPlan/workoutPlanSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";


function WorkoutDetails({ workout, onDelete }) {
  const [isCreatedByUser, setIsCreatedByUser] = useState(false);
  const [randomColor, setRandomColor] = useState(
    `#${Math.floor(Math.random() * 16777215).toString(16)}20`
  );
  const { plan, title, _id } = workout;
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    setIsCreatedByUser(workout.user === user._id);
  }, [user, navigate, dispatch, workout.user]);

  const handleGoBack = () => {
    navigate(-1);
    console.log("handleGoBack invoked")
  };

  const handleEditWorkout = () => {
    navigate(`/workouts/edit/id/${_id}`);
  };

  const handleDelete = () => {  
    onDelete()
  };

  const handleSaveWorkout = () => {
    const newWorkout = {
      title: workout.title,
      plan: workout.plan,
    };
    console.log({ newWorkout });
    dispatch(saveNewWorkout(newWorkout));
    alert('workout saved successfully')
  };

  console.log({ workout });
  console.log({ user });

  return (
    <>
      <div className="workout-details-page">
        <div
          className="workout-details-container"
          style={{ backgroundColor: randomColor }}
        >
          <Button
            onClick={handleGoBack}
            className="workout-details__back-button"
            variant="text"
            sx={{ backgroundColor: "white" }}
          >
            <ArrowBackIcon
              className="back-button-arrow"
              
              sx={{
                textAlign: "center",
                pointerEvents: "none",
                color: "black",
                fontSize: "64px",
              }}
            />
          </Button>

          <Tilt
            className="workout-details__title"
            perspective={1000}
            tiltMaxAngleX={10}
            scale={1.05}
            tiltMaxAngleY={10}
          >
            <h1 className="workout-details-title-inner">{title}</h1>
          </Tilt>
          {plan.map(({ exercises, muscleGroup, reps, sets, weight }, index) => (
            <section key={index} className="workout-details-images">
              <h2 className="workout-details-muscle-group">{muscleGroup}</h2>
              <Swiper
                pagination={{ type: "fraction" }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className={"workout-details__swiper"}
              >
                {exercises.map(({ exercise, reps, sets, weight }, index) => (
                  <SwiperSlide
                    key={index}
                    className="workout-details-swiper-container"
                  >
                    <img
                    alt="slider "
                      className="workout-details-swiper__image"
                      src={exercise.image}
                    />
                    <div className="workout-details-swiper-information">
                      <h3 className="workout-details-swiper__exercise-name">
                        {exercise.name}
                      </h3>
                      <div className="workout-details-swiper__terms">
                        <div className="workout-details-swiper__term">
                          <p>Sets: </p> <span>{sets}</span>
                        </div>
                        <div className="workout-details-swiper__term">
                          <p>Reps: </p> <span>{reps}</span>
                        </div>
                        <div className="workout-details-swiper__term">
                          <p>Weight: </p> <span>{weight}</span>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </section>
          ))}
          <section className="workout-actions-container">
            {isCreatedByUser ? (
              <>
                <Button
                  className="workout-delete-button"
                  sx={{ minWidth: "54px", height: "54px" }}
                  onClick={handleDelete}
                >
                  <DeleteIcon
                    sx={{
                      color: "white",
                      fontSize: "54px",
                      pointerEvents: "none",
                    }}
                  />
                </Button>
                <Button
                  className="workout-edit-button"
                  sx={{ minWidth: "54px", height: "54px" }}
                  onClick={handleEditWorkout}
                >
                  <EditIcon
                    sx={{
                      color: "white",
                      fontSize: "54px",
                      pointerEvents: "none",
                    }}
                  />
                </Button>
              </>
            ) : (
              <>
                <Button
                  className="workout-save-button"
                  sx={{ minWidth: "54px", height: "54px" }}
                  onClick={handleSaveWorkout}
                >
                  <SaveIcon
                    sx={{
                      color: "white",
                      fontSize: "54px",
                      pointerEvents: "none",
                    }}
                  />
                </Button>
              </>
            )}
          </section>
          <h1 className="workout-details__created">Created by: Arnold</h1>
        </div>
      </div>

    </>
  );
}

export default WorkoutDetails;
