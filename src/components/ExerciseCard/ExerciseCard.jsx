import "./ExerciseCard.scss";
import Tilt from "react-parallax-tilt";

function ExerciseCard({ exercise = {}, onCardClick, isSelect, onExerciseSelect = () => {} }) {
  const { name, difficulty, group, image, tags } = exercise;

  const cardClickHandler = () => {
    if (isSelect) {
      onExerciseSelect(exercise);
    } else {
      onCardClick();
    }
  };

  const getTagColor = (tag) => {
    switch (tag?.toLowerCase()) {
      case "weights":
        return "exercise-tag--weights";
      case "chest":
        return "exercise-tag--chest";
      case "traps":
        return "exercise-tag--traps";
      case "shoulders":
        return "exercise-tag--shoulders";
      case "biceps":
        return "exercise-tag--biceps";
      case "forearms":
        return "exercise-tag--forearms";
      case "obliques":
        return "exercise-tag--obliques";
      case "abdominals":
        return "exercise-tag--abdominals";
      case "quads":
        return "exercise-tag--quads";
      case "calves":
        return "exercise-tag--calves";
      case "traps-mid-back":
        return "exercise-tag--traps-mid-back";
      case "lower back":
        return "exercise-tag--lower-back";
      case "glutes":
        return "exercise-tag--glutes";
      case "hamstrings":
        return "exercise-tag--hamstrings";
      case "bodyweight":
        return "exercise-tag--bodyweight";
      case "dumbbell":
        return "exercise-tag--dumbbell";
      case "dumbbells":
        return "exercise-tag--dumbbells";
      case "barbell":
        return "exercise-tag--barbell";
      case "kettlebell":
        return "exercise-tag--kettlebell";
      case "band":
        return "exercise-tag--band";
      case "cable":
        return "exercise-tag--cables";
      case "stretches":
        return "exercise-tag--stretches";
      case "machine":
        return "exercise-tag--machine";
      case "triceps":
        return "exercise-tag--triceps";
      default:
        break;
    }
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
    <Tilt tiltMaxAngleX={10} scale={1.1} tiltMaxAngleY={10}>
      <div className="exercise" onClick={cardClickHandler}>
        <img className="exercise__img" src={image} alt="exercise" />
        <div className="exercise-information">
          <div className="exercise__title">
            <span className="highlighted-text">
              {name ? name : "missing name"}
            </span>
          </div>
          <div className="exercise-footer">
            <section className="exercise__tags ">
              <p className={`exercise__tag ${getTagColor(group)}`}>{group}</p>
              {Array.isArray(tags) &&
                tags.map((tag, i) => (
                  <p className={`exercise__tag ${getTagColor(tag)}`} key={i}>
                    {tag}
                  </p>
                ))}
            </section>
            <p className="exercise-difficulty-container">
              <span
                className={`exercise__difficulty ${getDifficultyColor(
                  difficulty
                )}`}
              >
                {difficulty}
              </span>
            </p>
          </div>
        </div>
      </div>
    </Tilt>
  );
}

export default ExerciseCard;
