import "./TodaysWorkout.scss";
import Tilt from "react-parallax-tilt";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import { useState } from "react";

function TodaysWorkout({ workout, title }) {
  const [randomColor] = useState(
    `#${Math.floor(Math.random() * 16777215).toString(16)}20`
  );

  return (
    <div
      className="todays-workout-card"
      style={{ backgroundColor: randomColor }}
    >
      <Tilt
        className="todays-workout-card__title"
        perspective={1000}
        tiltMaxAngleX={10}
        scale={1.05}
        tiltMaxAngleY={10}
      >
        <h1 className="todays-workout-card__title-inner">{title}</h1>
      </Tilt>

      {workout.map(({ exercises, muscleGroup }, index) => (
        <section key={index} className="todays-workout-images">
          <h2 className="workout-details-muscle-group">{muscleGroup}</h2>
          <Swiper
            pagination={{ type: "fraction" }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="todays-workout__swiper"
          >
            {exercises.map(({ exercise, reps, sets, weight }, index) => (
              <SwiperSlide
                key={index}
                className="todays-workout-swiper-container"
              >
                <img
                  alt="slider"
                  className="todays-workout-swiper__image"
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
  );
}

export default TodaysWorkout;
