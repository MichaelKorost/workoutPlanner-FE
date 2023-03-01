import './Workout.css'

function Workout({workout}) {
    const {plan, title, _id} = workout
  return (
    <div className='workout'>
      <h1 className='workout__title'>{title}</h1>
      {plan.map(({muscleGroup, exercises}) => (
        <div key={`${muscleGroup}-${exercises[0].exercise._id}`} className="workout-img-container">
            {exercises.map(({exercise}) => (
                <img key={exercise._id} src={exercise.image} alt="exercise" className='workout__img' />
            ))}
        </div>
      ))}
    </div>
  )
}

export default Workout