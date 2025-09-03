import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Stack, Typography } from '@mui/material'

const ExerciseCard = ({ exercise }) => {

  return (
    <Link className="exercise-card" to={`/exercise/${exercise.id}`}>
        <img src={`workout-app-production.up.railway.app/api/exercise-image/${exercise.id}`} alt={exercise.name} loading="lazy"/>
        <Stack direction="row">
            <Button sx={{ ml: '21px', color: 'black', background: '#a07ecd', fontSize: '14px', borderRadius: '20px', textTransform:'capitalize' }}>
                {exercise.bodyPart}
            </Button>
            <Button sx={{ ml: '21px', color: 'black', background: '#CDA07E', fontSize: '14px', borderRadius: '20px', textTransform:'capitalize' }}>
                {exercise.target}
            </Button>
        </Stack>
        <Typography ml="21px" color="#000" fontWeight="400" mt="11px" pb="10px" textTransform='capitalize' fontSize='24px'>
            {exercise.name}
        </Typography>
    </Link>
  )
}

export default ExerciseCard