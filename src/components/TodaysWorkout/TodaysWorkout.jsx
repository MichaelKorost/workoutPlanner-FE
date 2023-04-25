import "./TodaysWorkout.scss";
import Tilt from "react-parallax-tilt";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import { useState } from "react";

function TodaysWorkout({ workout, title }) {


  return (
    <div
      className="todays-workout-card"
      style={{ backgroundColor: "#f5f6fa" }}
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
                 pagination={{
                  dynamicBullets: true,
                }}
                slidesPerView={"auto"}
                spaceBetween={0}
                centeredSlides={true}
                navigation={false}
                modules={[Pagination]}
                className={"workout-details__swiper"}
              >
                {exercises.map(({ exercise, reps, sets, weight }, index) => (
                  <SwiperSlide
                    key={index}
                    className="workout-details-swiper-container workout-details-swiper-slide"
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
  );
}

export default TodaysWorkout;
