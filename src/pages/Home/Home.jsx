import './Home.css';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {getAllWorkoutPlans, reset} from "../../features/workoutPlan/workoutPlanSlice"
// import Spinner from '../components/Spinner/Spinner';
import Spinner from '../../components/Spinner/Spinner';

const baseUrl = `https://workout-planner-be.vercel.app/api/workouts`

function Home() {
const dispatch = useDispatch();

const {workoutPlans,isError,isLoading,message} = useSelector((state) => state.workoutPlan)

useEffect(() => {
    if (isError) {
        console.log(message);
    }

    dispatch(getAllWorkoutPlans())

    return () => {
        dispatch(reset())
    }
},[isError,message,dispatch])

    if (isLoading) {
        return <Spinner />
    }

  return (
    <>
    {workoutPlans.map((workoutPlan) => (<div>
        <h1>{workoutPlan.title}</h1>
        {workoutPlan.plan.map((plan) => (<div>{plan.muscleGroup}</div>))}
     </div>))}
    </>
  )
}

export default Home