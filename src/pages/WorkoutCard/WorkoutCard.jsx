import { useEffect, useState } from "react";
import "./WorkoutCard.scss";
import Tilt from "react-parallax-tilt";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Navigate, useNavigate } from "react-router-dom";

function Workout({ workout }) {
  const { plan, title, _id } = workout;

  const remainingExercisesCount = plan.length - 2;

  const navigate = useNavigate();

  const handleOpenWorkout = () => {
    console.log(`card with id of ${_id}`);
    navigate("/workouts/id/" + _id);
  };

  console.log({ plan });

  return (
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
          <h3 className="workout-card__extra">{remainingExercisesCount} more...</h3>
          <Button onClick={handleOpenWorkout} className="workout-open-button">
             Open<OpenInNewIcon />
          </Button>
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
          <Button onClick={handleOpenWorkout} className="workout-open-button">
            Open <OpenInNewIcon />
          </Button>
        </>
      )}
    </div>
  );
}

export default Workout;

