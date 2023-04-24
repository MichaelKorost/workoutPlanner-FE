import "./ExerciseDetails.scss";
import { useState } from "react";
import ForwardIcon from "@mui/icons-material/Forward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, Dialog, DialogContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Tilt from "react-parallax-tilt";

const GuideStep = ({ text, number }) => {
  return (
    <div className="guide-step-container">
      <div className="guide-step__number">{number + 1}</div>
      <p className="guide-step__text"> {text}</p>
    </div>
  );
};

function ExerciseDetails({ exercise }) {

  const [open, setOpen] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState("");

  const { demo, difficulty, guide, name } = exercise;

  const handleClose = () => {
    setOpen(false);
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

  const handleOpenImage = (link) => {
    setSelectedUrl(link);
    setOpen(true);
  };

  return (
    <>
      <div className="exercise-details-page">
        <div
          className="exercise-details-container"
          style={{ backgroundColor: "#ecf0f1" }}
        >
          <Tilt
            className="exercise-details__title"
            perspective={1000}
            tiltMaxAngleX={10}
            scale={1.05}
            tiltMaxAngleY={10}
          >
            <h1 className="title-inner">{name}</h1>
          </Tilt>
          <div className="exercise-details__difficulty">
            <h3 className="exercise-details__difficulty-prompt">Difficulty:</h3>
            <span
              className={`exercise-details__difficulty-value ${getDifficultyColor(
                difficulty
              )}`}
            >
              {difficulty}
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
              onClick={() => handleOpenImage(demo[0])}
              alt="exercise"
              className="exercise-details__img exercise-details__img--first"
              src={demo[0]}
            />

            <ForwardIcon className="next-icon" sx={{ fontSize: "60px" }} />

            <img
              onClick={() => handleOpenImage(demo[1])}
              alt="exercise-demo"
              className="exercise-details__img exercise-details__img--second"
              src={demo[1]}
            />
          </Tilt>
          <section className="guide-steps-container">
            {guide.map((step, index) => (
              <GuideStep key={index} text={step} number={index} />
            ))}
          </section>
        </div>
      </div>

      <Dialog open={open} onClose={handleClose} maxWidth={"lg"}>
        <DialogContent
          sx={{ padding: "0", maxWidth: "100%", maxHeight: "100%" }}
        >
          <img className="dialog__img" alt="exercise" src={selectedUrl} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ExerciseDetails;
