import "./ExerciseDetails.scss";
import ForwardIcon from "@mui/icons-material/Forward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, useMediaQuery } from "@mui/material";
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
  const { demo, difficulty, group, guide, image, name, tags, _id } = exercise;

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const getDifficultyColor = (diff) => {
    switch (diff) {
      case "Beginner":
        return "exercise__diff--beginner";
      case "Intermediate":
        return "exercise__diff--intermediate";
      case "Advanced":
        return "exercise__diff--advanced";
    }
  };

  const isTablet = useMediaQuery((theme) => theme.breakpoints.down("tablet"));

  return (
    <div className="exercise-details-page">
      <div className="exercise-details-container">
        <Button
          onClick={handleGoBack}
          className="exercise-details__back-button"
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
          className="exercise-details__title"
          perspective={1000}
          tiltMaxAngleX={10}
          scale={1.05}
          tiltMaxAngleY={10}
        >
          <h1 className="title-inner">{name}</h1>
        </Tilt>
        <div className="exercise-details__difficulty">
          <h3 className="exercise-details__difficulty-prompt">difficulty:</h3>
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
          <img className="exercise-details__img" src={demo[0]} />
          <ForwardIcon className="next-icon" sx={{ fontSize: "60px" }} />
          <img className="exercise-details__img" src={demo[1]} />
        </Tilt>
        <section className="guide-steps-container">
          {guide.map((step, index) => (
            <GuideStep key={index} text={step} number={index} />
          ))}
        </section>
      </div>
    </div>
  );
}

export default ExerciseDetails;
