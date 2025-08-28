import React, { useEffect, useState } from 'react'
import Pagination from '@mui/material/Pagination'
import { Box, Stack } from '@mui/material/'

import { exerciseOptions, fetchData } from '../utils/fetchData'
import ExerciseCard from './ExerciseCard'

const Exercises = ({ exercises, setExercises, bodyPart }) => {
  const [ currentPage, setCurrentPage ] = useState(1)
  const exercisesPerPage = 9

  const indexOfLastExercise = currentPage * exercisesPerPage
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage
  const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise)

  console.log("the log:", exercises)

  const paginate = (e, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: '1600', behavior: 'smooth' })
  }

  useEffect(() => {
    const fetchExercisesData = async () => {
      let exercisesData = []

      if(bodyPart === 'all') {
        exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises?limit=2000', exerciseOptions)
      } else {
        exercisesData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}?limit=2000`, exerciseOptions)
      }

    setExercises(exercisesData)
    console.log("search exercises List", exercisesData)
    }

    fetchExercisesData()
  }, [bodyPart])

  return (
    <Box
      id="exercises"
      sx={{mt: { lg: '110px' }}}
      mt='50px'
      p='20px'
    >
      <Stack
        direction='row' 
        sx={{ gap: { lg: '110px', xs: '50px' }}}
        flexWrap='wrap' justifyContent='center'
      >
        {currentExercises.map((exercise, index) => (
          <ExerciseCard exercise={exercise} key={index}>{exercise.name}</ExerciseCard>
        ))}
      </Stack>
      <Stack mt="100px" alignItems="center">
        {exercises.length > 9 && (
          <Pagination 
            color='standard'
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(exercises.length / exercisesPerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        )}
      </Stack>
    </Box>
  )
}

export default Exercises