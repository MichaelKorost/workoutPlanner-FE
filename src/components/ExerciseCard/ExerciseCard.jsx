import { useEffect } from "react";
import "./ExerciseCard.css";

function ExerciseCard({ exercise, onCardClick, isSelect, onExerciseSelect }) {
  const { _id, name, demo, difficulty, group, image, tags } = exercise;


    const cardClickHandler = () => {
      if(isSelect){
        onExerciseSelect(exercise)
      }else{
        onCardClick()
      }
    }

  return (
    <div className="exercise" onClick={cardClickHandler}>
      <h1 className="exercise__title">{name? name : "missing name"}</h1>
      <h6 className="exercise__title">{_id}</h6>
      <img className="exercise__img" src={image} alt="exercise image" />
      <div className="exercise-footer">
        <section className="exercise__tags">
          {Array.isArray(tags) && tags.map((tag, i) => <p key={i}>{tag}</p>)}
        </section>
        <section className="exercise__difficulty">{difficulty}</section>
        <section className="exercise__group">{group}</section>
      </div>
    </div>
  );
}

export default ExerciseCard;
