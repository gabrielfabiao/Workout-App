import React, { useEffect, useState } from 'react'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { exerciseOptions, fetchData } from '../utils/fetchData'
import HorizontalScrollBar from './HorizontalScrollBar'

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
  const [ search, setSearch ] = useState('')

  const [ bodyParts, setBodyParts ] = useState([])

  useEffect(() => {
    const fetchExercisesData = async () => {
      const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList?limit=2', exerciseOptions)

      setBodyParts(['all', ...bodyPartsData])
    }

    fetchExercisesData()
  }, [])

  const handleSearch = async () => {
    if(search) {
      const exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises?limit=2', exerciseOptions);

      console.log("search exercises", exercisesData)

      const searchedExercises = exercisesData.filter(
        (exercise) => exercise.name.toLowerCase().includes(search)
        || exercise.target.toLowerCase().includes(search)
        || exercise.equipment.toLowerCase().includes(search)
        || exercise.bodyPart.toLowerCase().includes(search)
      );

      setSearch('')
      setExercises(searchedExercises)
    }
  }

  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px" >
      <Box position="relative" mb="72px">
        <TextField
          sx={{
            input: { fontWeight: '300', border: 'none'},
            width: { lg: '400px', sx: '350px' },
            backgroundColor: "#fff",
          }}
          height="76px"
          value={search}
          onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())}
          placeholder='Search Exercises'
          type="text"
        />
        <Button className='search-btn'
          sx={{
            bgcolor: '#6228ad',
            color: '#fff',
            textTransform: 'none',
            width: { lg: '175px', xs: '80px' },
            fontSize: { lg: '20px', xs: '14px' },
            height: '56px',
            position: 'absolute',
            right: 0
          }}
          onClick={handleSearch}>
          Search
        </Button>
      </Box>
      <Box sx={{ position: 'relative', width: '100%', p: '20px' }}>
          <HorizontalScrollBar data={bodyParts} bodyPart={bodyPart} setBodyPart={setBodyPart} isBodyPart/>
      </Box>
    </Stack>
  )
}

export default SearchExercises