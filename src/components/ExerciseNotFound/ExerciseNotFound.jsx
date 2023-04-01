import "./ExerciseNotFound.scss";
import personalTrainer from "../../assets/undraw_personal_trainer_re_cnua.svg";
import Tilt from "react-parallax-tilt";

function ExerciseNotFound({errorMessage}) {
  return (
    <Tilt
      className="exercise-not-found"
      perspective={500}
      tiltMaxAngleX={10}
      scale={1.05}
      tiltMaxAngleY={10}
    >
      <img
        className="exercise__img2"
        src={personalTrainer}
        alt="exercise"
      />
      <div className="exercise-not-found__text">
        <div>{errorMessage}</div>
        <div>😢</div>
      </div>
    </Tilt>
  );
}

export default ExerciseNotFound;
