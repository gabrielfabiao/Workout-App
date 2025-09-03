import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Stack } from '@mui/material'
import Logo from './Logo.js'
import "./Navbar.css"

const Navbar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <Stack
      direction='row'
      justifyContent='space-around'
      alignItems='center'
      sx={{ gap: { sm: '122px', xs:'40px' }, mt: { sm: '32px', xs:'20px' }, justifyContent:'none'}}>
      <Link to="/">
        <Logo></Logo>
      </Link>
      <Stack
        direction='row'
        gap='40px'
        fontSize='20px'
        alignItems='flex-end'>
        <Link className="navbar-home" to="/">Home</Link>
        {location.pathname === '/' &&
        <a className='navbar-exercises' href="#exercises">Exercises</a>}
        <Link className='navbar-myplan' to="/myplan">My Plan</Link>
      </Stack>
    </Stack>
  )
}

export default Navbar