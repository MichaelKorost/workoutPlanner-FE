import "./ExerciseDetails.css";

import React from "react";

function ExerciseDetails({ exercise }) {
  const { demo, difficulty, group, guide, image, name, tags, _id } = exercise;
  return (
    <>
      <div className="exerciseDetails">
        <h1>{name}</h1>
        <img src={image} alt="exercise"  />
      </div>
    </>
  );
}

export default ExerciseDetails;
