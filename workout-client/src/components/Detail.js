import React from 'react'
import { Typography, Stack, Button } from '@mui/material'

import BodyPartImage from '../assets/icons/body-part.png'
import TargetImage from '../assets/icons/target.png'
import EquipmentImage from '../assets/icons/equipment.png' 

const Detail = ({ exerciseDetail }) => {
    const { name, bodyPart, target, equipment } = exerciseDetail;

    const extraDetail = [
        {
            icon: BodyPartImage,
            name: bodyPart
        },  
        {
            icon: TargetImage,
            name: target
        },
        {
            icon: EquipmentImage,
            name: equipment
        }
    ]


  return (
    <Stack gap='60px' sx={{ flexDirection: { lg: 'row' }, p: '20px', alignItems: 'center' }}>
        <img src={`workout-app-production.up.railway.app/api/exercise-image/${exerciseDetail.id}`} alt={name} loading='lazy' className='detail-image' />
        <Stack sx={{ gap: { lg: '35px', xs: '20px' } }}>
            <Typography variant='h3' textTransform='capitalize' color="#6228ad">
                {name}
            </Typography>
            <Typography variant='h6'>
                Exercises keep you strong. <Typography textTransform='capitalize' variant='h7' sx={{ display: 'inline' }}>{name}</Typography> is one of the best exercises to target your {target}. It will help you improve your mood and gain energy.
            </Typography>
            {extraDetail.map((item) => (
                <Stack key={item.name} direction='row' gap='24px' alignItems='center'>
                    <Button sx={{ background: '#a07ecd', borderRadius: '10%', width: '100px', height: '100px' }}>
                        <img src={item.icon} alt={bodyPart} style={{ width: '50px', height: '50px' }} />
                    </Button>
                    <Typography variant='h5' textTransform='capitalize'>
                        {item.name}
                    </Typography>
                </Stack>
            ))}
        </Stack>
    </Stack>
  )
}

export default Detail