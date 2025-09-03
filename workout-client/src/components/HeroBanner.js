import React from 'react'
import { Box, Stack, Typography, Button } from '@mui/material'
import HeroBannerImage from '../assets/images/banner.jpg'

const Hero = () => {
  return (
    <Box sx={{
      mt: { lg: '212px', xs: '70px' },
      ml: { sm: '50px' }
    }} position='relative' p='20px'>
      <Typography color='#6228ad' fontWeight="700" fontSize="20px">
        Fitness Club
      </Typography>
      <Typography fontWeight='700'
      sx={{ fontSize: { lg: '44px', xs: '40px' }}}
      mb="23px" mt='30px'>
        LIFT, LAUGH,<br />LEVEL UP
      </Typography>
      <Typography fontSize='22px' lineHeight='35px' mb={4}>
        Checkout out the most effective exercises.
      </Typography>
      <Button 
        variant='contained' 
        color="secondary" 
        href="#exercises" 
        sx={{ backgroundColor: "#6228ad", padding: '10px' }}>Explore Exercises</Button>
      <Typography
        fontWeight={600}
        color="#6228ad"
        sx={{
          opacity: 0.1,
          display: { lg: 'block', xs: 'none' }
        }}
        fontSize="190px"
        zIndex={5}
        position='relative'
      >Exercises</Typography>
      <img src={HeroBannerImage} alt='banner' className='hero-banner-img'></img>
    </Box>
  )
}

export default Hero