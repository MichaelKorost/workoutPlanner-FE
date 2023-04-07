import "./WorkoutDetails.scss";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Tilt from "react-parallax-tilt";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import { useDispatch, useSelector } from "react-redux";

import { saveNewWorkout } from "../../features/workoutPlan/workoutPlanSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";

function WorkoutDetails({ workout, onDelete }) {
  const [isCreatedByUser, setIsCreatedByUser] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openSaveDialog, setOpenSaveDialog] = useState(false);
  const [newTitle, setNewTitle] = useState(workout?.title);
  const [toggleEdit, setToggleEdit] = useState(true);
  const [randomColor] = useState(
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
  };

  const handleEditWorkout = () => {
    navigate(`/workouts/edit/id/${_id}`);
  };

  const handleDelete = () => {
    onDelete();
  };

  const handleSaveWorkout = () => {
    const newWorkout = {
      title: newTitle,
      plan: workout.plan,
    };

    dispatch(saveNewWorkout(newWorkout));

    toast.success("Workout saved successfully!");
  };

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleToggleEdit = () => {
    setToggleEdit(!toggleEdit);
    setNewTitle(workout.title);
  };

  const handleOpenEditDialog = () => {
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleOpenSaveDialog = () => {
    setOpenSaveDialog(true);
  };

  const handleCloseSaveDialog = () => {
    setOpenSaveDialog(false);
  };

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
          <section className="workout-actions-container">
            {isCreatedByUser ? (
              <>
                <Tooltip title="Delete" placement="top">
                  <Button
                    className="workout-delete-button"
                    sx={{ minWidth: "54px", height: "54px" }}
                    onClick={handleOpenDeleteDialog}
                  >
                    <DeleteIcon
                      sx={{
                        color: "white",
                        fontSize: "54px",
                        pointerEvents: "none",
                      }}
                    />
                  </Button>
                </Tooltip>
                <Tooltip title="Edit" placement="top">
                  <Button
                    className="workout-edit-button"
                    sx={{ minWidth: "54px", height: "54px" }}
                    onClick={handleOpenEditDialog}
                  >
                    <EditIcon
                      sx={{
                        color: "white",
                        fontSize: "54px",
                        pointerEvents: "none",
                      }}
                    />
                  </Button>
                </Tooltip>
              </>
            ) : (
              <>
                <Tooltip title="Save" placement="top">
                  <Button
                    className="workout-save-button"
                    sx={{ minWidth: "54px", height: "54px" }}
                    onClick={handleOpenSaveDialog}
                  >
                    <SaveIcon
                      sx={{
                        color: "white",
                        fontSize: "54px",
                        pointerEvents: "none",
                      }}
                    />
                  </Button>
                </Tooltip>
              </>
            )}
          </section>
          <h1 className="workout-details__created">
            Created by:{" "}
            <span className="workout-details__creator">{workout?.creator}</span>
          </h1>
        </div>
      </div>

      <Dialog
        open={openEditDialog}
        onClose={handleCloseEditDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflowX: "hidden",
            textAlign: "center",
            fontSize: "30px",
            padding: "10 20px",
          }}
          className="calendar-dialog__title"
        >
          {workout.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ textAlign: "center" }}
          >
            Are you sure you want to <b>edit</b> this workout?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            sx={{ width: "54px", height: "54", backgroundColor: "#e74c3c" }}
            onClick={handleCloseEditDialog}
            onMouseEnter={(e) => (e.target.style.backgroundColor = `#c0392b`)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = `#e74c3c`)}
          >
            <CloseIcon
              sx={{ color: "white", fontSize: "44px", pointerEvents: "none" }}
            />
          </Button>
          <Button
            sx={{ width: "54px", height: "54", backgroundColor: "#27ae60" }}
            onClick={handleEditWorkout}
            onMouseEnter={(e) => (e.target.style.backgroundColor = `#009432`)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = `#27ae60`)}
          >
            <EditIcon
              sx={{ color: "white", fontSize: "44px", pointerEvents: "none" }}
            />
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflowX: "hidden",
            textAlign: "center",
            fontSize: "30px",
            padding: "10 20px",
          }}
          className="calendar-dialog__title"
        >
          {workout.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ textAlign: "center" }}
          >
            Are you sure you want to <b>delete</b> this workout?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            sx={{ width: "54px", height: "54", backgroundColor: "#e74c3c" }}
            onClick={handleCloseDeleteDialog}
            onMouseEnter={(e) => (e.target.style.backgroundColor = `#c0392b`)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = `#e74c3c`)}
          >
            <CloseIcon
              sx={{ color: "white", fontSize: "44px", pointerEvents: "none" }}
            />
          </Button>
          <Button
            sx={{ width: "54px", height: "54", backgroundColor: "#27ae60" }}
            onClick={handleDelete}
            onMouseEnter={(e) => (e.target.style.backgroundColor = `#009432`)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = `#27ae60`)}
          >
            <DeleteIcon
              sx={{ color: "white", fontSize: "44px", pointerEvents: "none" }}
            />
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openSaveDialog}
        onClose={handleCloseSaveDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflowX: "hidden",
            textAlign: "center",
            fontSize: "30px",
            padding: "10 20px",
          }}
          className="calendar-dialog__title"
        >
          {workout.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ textAlign: "center" }}
          >
            Are you sure you want to <b>Save</b> this workout?
          </DialogContentText>
          <Box
            sx={{
              display: "flex",
              margin: "20px 0 0 ",
              alignItems: "center",
              padding: "0 10px",
              backgroundColor: "white",
              borderRadius: "8px",
              justifyContent: "center",
              boxShadow:
                " rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
              maxWidth: "400px",
              width: "100%",
              height: "80px",
            }}
          >
            <TextField
              id="input-with-sx"
              label="Workout Title"
              variant="standard"
              onChange={handleTitleChange}
              value={newTitle}
              disabled={toggleEdit}
            />
            <EditIcon
              onClick={handleToggleEdit}
              sx={{
                cursor: "pointer",
                transition: "all 0.2s ease",
                "&:hover": { backgroundColor: "#f1f2f6", borderRadius: "50%" },
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            sx={{ width: "54px", height: "54px", backgroundColor: "#e74c3c" }}
            onClick={handleCloseSaveDialog}
            onMouseEnter={(e) => (e.target.style.backgroundColor = `#c0392b`)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = `#e74c3c`)}
          >
            <CloseIcon
              sx={{ color: "white", fontSize: "44px", pointerEvents: "none" }}
            />
          </Button>
          <Button
            sx={{ width: "54px", height: "54px", backgroundColor: "#27ae60" }}
            onClick={handleSaveWorkout}
            onMouseEnter={(e) => (e.target.style.backgroundColor = `#009432`)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = `#27ae60`)}
          >
            <SaveIcon
              sx={{ color: "white", fontSize: "44px", pointerEvents: "none" }}
            />
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default WorkoutDetails;
