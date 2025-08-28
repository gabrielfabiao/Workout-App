import React from 'react'
import { Box, Stack, Typography } from '@mui/material'

import Logo from "./Logo"

const Footer = () => {
  return (
    <Box mt="80px" bgcolor="#fff" color="#000">
      <Stack gap="20px" alignItems="center" px="40px" pt="24px">
        <Logo/>
        <Typography variant="p" pb="40px">
          Made by <a href="https://github.com/gabrielfabiao" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: '#6228ad', color: 'inherit' }}>Gabriel Rodrigues</a></Typography>
      </Stack>
    </Box>  
  )
}

export default Footer