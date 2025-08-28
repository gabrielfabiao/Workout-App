import React, { useEffect, useState } from 'react'
import { Box, Button, Stack, TextField } from '@mui/material'
import { exerciseOptions, fetchData } from '../utils/fetchData'
import HorizontalScrollBar from './HorizontalScrollBar'

const SearchExercises = ({ setExercises, bodyPart, setBodyPart, setAllExercises }) => {
  const [search, setSearch] = useState('')
  const [bodyParts, setBodyParts] = useState([])

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // ✅ Fetch body parts list safely
        const bodyPartsData = await fetchData(
          'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
          exerciseOptions
        )

        if (Array.isArray(bodyPartsData)) {
          setBodyParts(['all', ...bodyPartsData])
        } else {
          setBodyParts(['all'])
        }

        // ✅ Fetch all exercises once
        const exercisesData = await fetchData(
          'https://exercisedb.p.rapidapi.com/exercises?limit=1000',
          exerciseOptions
        )

        if (Array.isArray(exercisesData)) {
          setAllExercises(exercisesData)
          setExercises(exercisesData) // show all initially
        } else {
          setAllExercises([])
          setExercises([])
        }
      } catch (error) {
        console.error('Error fetching initial data:', error)
        setBodyParts(['all'])
        setAllExercises([])
        setExercises([])
      }
    }

    fetchInitialData()
  }, [setExercises, setAllExercises])

  const handleSearch = () => {
    if (search.trim()) {
      setExercises((prev) =>
        prev.filter(
          (exercise) =>
            exercise.name.toLowerCase().includes(search) ||
            exercise.target.toLowerCase().includes(search) ||
            exercise.equipment.toLowerCase().includes(search) ||
            exercise.bodyPart.toLowerCase().includes(search)
        )
      )
      setSearch('')
    }
  }

  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
      <Box position="relative" mb="72px">
        <TextField
          sx={{
            input: { fontWeight: '300', border: 'none' },
            width: { lg: '400px', xs: '350px' },
            backgroundColor: '#fff',
          }}
          height="76px"
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          placeholder="Search Exercises"
          type="text"
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <Button
          className="search-btn"
          sx={{
            bgcolor: '#6228ad',
            color: '#fff',
            textTransform: 'none',
            width: { lg: '175px', xs: '80px' },
            fontSize: { lg: '20px', xs: '14px' },
            height: '56px',
            position: 'absolute',
            right: 0,
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>
      <Box sx={{ position: 'relative', width: '100%', p: '20px' }}>
        <HorizontalScrollBar
          data={bodyParts}
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
          isBodyPart
        />
      </Box>
    </Stack>
  )
}

export default SearchExercises