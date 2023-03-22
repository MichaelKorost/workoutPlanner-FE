import "./WorkoutDetails.scss";
import { useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Tilt from "react-parallax-tilt";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

function WorkoutDetails({ workout }) {
  const [randomColor, setRandomColor] = useState(
    `#${Math.floor(Math.random() * 16777215).toString(16)}20`
  );
  const { plan, title, _id } = workout;

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  console.log(workout);
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
          {plan.map(({ exercises, muscleGroup, reps, sets, weight }) => (
            <section className="workout-details-images">
              <h2 className="workout-details-muscle-group">{muscleGroup}</h2>
              <Swiper
                pagination={{ type: "fraction" }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className={"workout-details__swiper"}
              >
                {exercises.map(({ exercise, reps, sets, weight }) => (
                  <SwiperSlide className="workout-details-swiper-container">
                    <img
                      className="workout-details-swiper__image"
                      src={exercise.image}
                    />
                    <div className="workout-details-swiper-information">
                      <h3 className="workout-details-swiper__exercise-name">
                        {exercise.name}
                      </h3>
                      <div className="workout-details-swiper__terms" >
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
          <Button>Save workout</Button>
          </section>
          <h1 className="workout-details__created">Created by: Arnold</h1>
        </div>
      </div>
    </>
  );
}

export default WorkoutDetails;
