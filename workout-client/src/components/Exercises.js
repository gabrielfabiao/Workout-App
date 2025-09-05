import React, { useEffect, useState } from 'react'
import Pagination from '@mui/material/Pagination'
import { Box, Stack } from '@mui/material/'

import ExerciseCard from './ExerciseCard'

const Exercises = ({ exercises, setExercises, bodyPart, allExercises }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const exercisesPerPage = 9

  console.log("exercises with gif", allExercises)

  useEffect(() => {
    if (bodyPart === 'all') {
      setExercises(allExercises)
    } else {
      const filteredExercises = allExercises.filter(
        (exercise) => exercise.bodyPart.toLowerCase() === bodyPart.toLowerCase()
      )
      setExercises(filteredExercises)
    }
    setCurrentPage(1)
  }, [bodyPart, allExercises, setExercises])

  const indexOfLastExercise = currentPage * exercisesPerPage
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage
  const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise)

  const paginate = (e, value) => {
    setCurrentPage(value)
    window.scrollTo({ top: 1600, behavior: 'smooth' })
  }

  return (
    <Box id="exercises" sx={{ mt: { lg: '110px' }, p: '20px' }} mt="50px">
      <Stack
        direction="row"
        sx={{ gap: { lg: '110px', xs: '50px' } }}
        flexWrap="wrap"
        justifyContent="center"
      >
        {Array.isArray(exercises) && exercises.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}
      </Stack>
      <Stack mt="100px" alignItems="center">
        {exercises.length > exercisesPerPage && (
          <Pagination
            color="standard"
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