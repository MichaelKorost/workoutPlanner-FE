import { useEffect, useState } from "react";
import "./WorkoutCard.scss";
import Tilt from "react-parallax-tilt";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import {
  deleteWorkoutPlan,
  reset,
} from "../../features/workoutPlan/workoutPlanSlice";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function WorkoutCard({ workout, onDelete }) {
  // const [clickedCard, setClickedCard] = useState({});
  const [isCreatedByUser, setIsCreatedByUser] = useState(false)
  const [open, setOpen] = useState(false);
  const { plan, title, _id } = workout;

  const { user } = useSelector((state) => state.auth);
  const { workoutPlans, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.workoutPlan
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

    useEffect(()=>{
      setIsCreatedByUser(workout?.user === user._id)
    },[user._id, workout?.user])

  const handleClose = () => {
    setOpen(false);
  };

  const openMoreExercises = () => {
    setOpen(true);
  };

  const remainingExercisesCount = plan.length - 2;

  const handleOpenWorkout = () => {
    console.log(`card with id of ${_id}`);
    navigate("/workouts/id/" + _id);
  };

  const handleEditWorkout = () => {
    navigate(`/workouts/edit/id/${workout._id}`);
  };

  const handleDelete = () => {
    console.log(_id);
    onDelete(_id)
  };

  // console.log({ workout });

  return (
    <>
      <div className="workout">
        <button className="workout-title-button" onClick={handleOpenWorkout}>
          <Tilt
            className="workout__title"
            perspective={1000}
            tiltMaxAngleX={10}
            scale={1.05}
            tiltMaxAngleY={10}
            onClick={handleOpenWorkout}
          >
            <h1 onClick={handleOpenWorkout} className="workout-title-inner">
              {title}
            </h1>
          </Tilt>
        </button>
        {plan.length > 2 ? (
          <>
            {plan.slice(0, 2).map(({ muscleGroup, exercises }) => (
              <div key={`${muscleGroup}-${Math.random() * 99}`}>
                <h1 className="workout__muscle-group">{muscleGroup}</h1>
                <Swiper
                  pagination={{ type: "fraction" }}
                  navigation={true}
                  modules={[Pagination, Navigation]}
                  className={"workout-card__swiper"}
                >
                  {exercises.map(({ exercise }) => (
                    <SwiperSlide
                      className="workout-card__swiper-slide"
                      key={`${Math.random() * 99}`}
                    >
                      <img
                        className="workout-card__image"
                        src={exercise.image}
                        alt={exercise.name}
                      ></img>
                      <h2 className="workout-card__exercise-name">
                        {exercise.name}
                      </h2>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            ))}
            <h3 onClick={openMoreExercises} className="workout-card__extra">
              {remainingExercisesCount} more...
            </h3>
            <section className="workout-card-actions">
              {isCreatedByUser ? ( <><Button
                className="workout-delete-button"
                sx={{ minWidth: "44px", height: "44px" }}
                onClick={handleDelete}
              >
                <DeleteIcon
                  sx={{
                    color: "white",
                    fontSize: "34px",
                    pointerEvents: "none",
                  }}
                />
              </Button>
              <Button
                className="workout-edit-button"
                sx={{ minWidth: "44px", height: "44px" }}
                onClick={handleEditWorkout}
              >
                <EditIcon
                  sx={{
                    color: "white",
                    fontSize: "34px",
                    pointerEvents: "none",
                  }}
                />
              </Button>
              <Button
                className="workout-open-button"
                sx={{ minWidth: "44px", height: "44px" }}
                onClick={handleOpenWorkout}
              >
                <OpenInNewIcon
                  sx={{
                    color: "white",
                    fontSize: "34px",
                    pointerEvents: "none",
                  }}
                />
              </Button> </>) : ( <> <Button
                className="workout-open-button"
                sx={{ minWidth: "44px", height: "44px" }}
                onClick={handleOpenWorkout}
              >
                <OpenInNewIcon
                  sx={{
                    color: "white",
                    fontSize: "34px",
                    pointerEvents: "none",
                  }}
                />
              </Button></>)}
              
            </section>
          </>
        ) : (
          <>
            {plan.map(({ muscleGroup, exercises }) => (
              <div key={`${muscleGroup}-${Math.random() * 99}`}>
                <h1 className="workout__muscle-group">{muscleGroup}</h1>
                <Swiper
                  pagination={{ type: "fraction" }}
                  navigation={true}
                  modules={[Pagination, Navigation]}
                  className={"workout-card__swiper"}
                >
                  {exercises.map(({ exercise }) => (
                    <SwiperSlide
                      className="workout-card__swiper-slide"
                      key={`${Math.random() * 99}`}
                    >
                      <img
                        className="workout-card__image"
                        src={exercise.image}
                        alt={exercise.name}
                      ></img>
                      <h2 className="workout-card__exercise-name">
                        {exercise.name}
                      </h2>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            ))}
            <section className="workout-card-actions">
            {isCreatedByUser ? ( <><Button
                className="workout-delete-button"
                sx={{ minWidth: "44px", height: "44px" }}
                onClick={handleDelete}
              >
                <DeleteIcon
                  sx={{
                    color: "white",
                    fontSize: "34px",
                    pointerEvents: "none",
                  }}
                />
              </Button>
              <Button
                className="workout-edit-button"
                sx={{ minWidth: "44px", height: "44px" }}
                onClick={handleEditWorkout}
              >
                <EditIcon
                  sx={{
                    color: "white",
                    fontSize: "34px",
                    pointerEvents: "none",
                  }}
                />
              </Button>
              <Button
                className="workout-open-button"
                sx={{ minWidth: "44px", height: "44px" }}
                onClick={handleOpenWorkout}
              >
                <OpenInNewIcon
                  sx={{
                    color: "white",
                    fontSize: "34px",
                    pointerEvents: "none",
                  }}
                />
              </Button> </>) : ( <> <Button
                className="workout-open-button"
                sx={{ minWidth: "44px", height: "44px" }}
                onClick={handleOpenWorkout}
              >
                <OpenInNewIcon
                  sx={{
                    color: "white",
                    fontSize: "34px",
                    pointerEvents: "none",
                  }}
                />
              </Button></>)}
            </section>
          </>
        )}
      </div>

      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogActions sx={{ justifyContent: "flex-end" }}>
          <Button
            sx={{ width: "54px", height: "54px", backgroundColor: "#e74c3c" }}
            onClick={handleClose}
            onMouseEnter={(e) => (e.target.style.backgroundColor = `#c0392b`)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = `#e74c3c`)}
          >
            <CloseIcon
              sx={{ color: "white", fontSize: "44px", pointerEvents: "none" }}
            />
          </Button>
        </DialogActions>
        <DialogTitle
          sx={{
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflowX: "hidden",
            textAlign: "center",
            fontSize: "40px",
            padding: "10 20px",
          }}
          className="calendar-dialog__title"
        >
          {title}
        </DialogTitle>
        <DialogContent
          sx={{
            padding: "20px",
          }}
        >
          <div className="calendar-dialog-container">
            {plan?.map(({ exercises, muscleGroup }) => (
              <section
                key={Math.random() * 99}
                className="workout-details-images"
              >
                <h2 className="workout-details-muscle-group">{muscleGroup}</h2>
                <Swiper
                  pagination={{ type: "fraction" }}
                  navigation={true}
                  modules={[Pagination, Navigation]}
                  className={"workout-details__swiper"}
                >
                  {exercises?.map(({ exercise, reps, sets, weight }, index) => (
                    <SwiperSlide
                      key={index}
                      className="workout-details-swiper-container"
                    >
                      <img
                      alt="slider"
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
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default WorkoutCard;
