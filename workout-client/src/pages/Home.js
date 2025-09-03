import React, {useState} from 'react'
import { Box } from '@mui/material'
import HeroBanner from '../components/HeroBanner'
import SearchExercises from '../components/SearchExercises'
import Exercises from '../components/Exercises'
import { useEffect } from 'react'
import { fetchData } from '../utils/fetchData'
import { exerciseOptions } from '../utils/fetchData'

const Home = () => {
  const [exercises, setExercises] = useState([])
  const [allExercises, setAllExercises] = useState([])
  const [bodyPart, setBodyPart] = useState('all')

    useEffect(() => {
    const fetchExercisesData = async () => {
      const data = await fetchData(
        'https://exercisedb.p.rapidapi.com/exercises',
        exerciseOptions
      )
      setAllExercises(data)
      setExercises(data)
    }

    
    fetchExercisesData()
  }, [])

  useEffect(() => {
    if (bodyPart === 'all') {
      setExercises(allExercises)
    } else {
      const filtered = allExercises.filter(
        (exercise) => exercise.bodyPart.toLowerCase() === bodyPart.toLowerCase()
      )
      setExercises(filtered)
    }
  }, [bodyPart, allExercises])

  return (
    <>
    <Box>
      <HeroBanner />
      <SearchExercises 
        setExercises={setExercises}
        bodyPart={bodyPart}
        setBodyPart={setBodyPart}
      />
      <Exercises 
        setExercises={setExercises}
        bodyPart={bodyPart}
        exercises={exercises}
        allExercises={allExercises}
      />
    </Box>
    </>
  )
}

export default Home