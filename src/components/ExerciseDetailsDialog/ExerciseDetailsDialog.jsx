import {  Dialog,  DialogContent } from "@mui/material";
import React, { useState } from "react";
import Tilt from "react-parallax-tilt";
import ForwardIcon from "@mui/icons-material/Forward";

const GuideStep = ({ text, number }) => {
  return (
    <div className="guide-step-container">
      <div className="guide-step__number">{number + 1}</div>
      <p className="guide-step__text"> {text}</p>
    </div>
  );
};

function ExerciseDetailsDialog({ selectedExercise }) {
  const [openImage, setOpenImage] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState("");
  const [randomColor] = useState(
    `#${Math.floor(Math.random() * 16777215).toString(16)}20`
  );

  const handleOpenImage = (link) => {
    setSelectedUrl(link);
    setOpenImage(true);
  };
  const getDifficultyColor = (diff) => {
    switch (diff) {
      case "Beginner":
        return "exercise__diff--beginner";
      case "Intermediate":
        return "exercise__diff--intermediate";
      case "Advanced":
        return "exercise__diff--advanced";
      default:
        break;
    }
  };

  return (
    <>
      <div
        className="exercise-details-container"
        style={{ backgroundColor: "#f8a5c240" }}
      >
        <Tilt
          className="exercise-details__title"
          perspective={1000}
          tiltMaxAngleX={10}
          scale={1.05}
          tiltMaxAngleY={10}
        >
          <h1 className="title-inner">{selectedExercise?.name}</h1>
        </Tilt>
        <div className="exercise-details__difficulty">
          <h3 className="exercise-details__difficulty-prompt">Difficulty:</h3>
          <span
            className={`exercise-details__difficulty-value ${getDifficultyColor(
              selectedExercise?.difficulty
            )}`}
          >
            {selectedExercise?.difficulty}
          </span>
        </div>
        <Tilt
          perspective={500}
          tiltMaxAngleX={0}
          scale={1}
          tiltMaxAngleY={1}
          className="exercise-details-img-container"
        >
          <img
            onClick={() => handleOpenImage(selectedExercise?.demo[0])}
            alt="exercise"
            className="exercise-details__img exercise-details__img--first"
            src={selectedExercise?.demo[0]}
          />

          <ForwardIcon className="next-icon" sx={{ fontSize: "60px" }} />

          <img
            onClick={() => handleOpenImage(selectedExercise?.demo[1])}
            alt="exercise-demo"
            className="exercise-details__img exercise-details__img--second"
            src={selectedExercise?.demo[1]}
          />
        </Tilt>
        <section className="guide-steps-container">
          {selectedExercise?.guide.map((step, index) => (
            <GuideStep key={index} text={step} number={index} />
          ))}
        </section>
      </div>

      <Dialog
        open={openImage}
        onClose={() => {
          setOpenImage(false);
        }}
        maxWidth={"lg"}
      >
        <DialogContent
        className="exercise-details-dialog"
          sx={{ padding: "0", maxWidth: "100%", maxHeight: "100%"}}
        >
          <img className="dialog__img" alt="exercise" src={selectedUrl} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ExerciseDetailsDialog;
