// Home.js
import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import HeroBanner from '../components/HeroBanner';
import SearchExercises from '../components/SearchExercises';
import Exercises from '../components/Exercises';
import { fetchData } from '../utils/fetchData';

const Home = () => {
  const [exercises, setExercises] = useState([]);
  const [allExercises, setAllExercises] = useState([]);
  const [bodyPart, setBodyPart] = useState('all');

  useEffect(() => {
    const fetchExercisesData = async () => {
      try {
        // Call your own backend route, which proxies the external API
        const data = await fetchData('/api/exercises');
        setAllExercises(data);
        setExercises(data);
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    };

    fetchExercisesData();
  }, []);

  useEffect(() => {
    if (bodyPart === 'all') {
      setExercises(allExercises);
    } else {
      const filtered = allExercises.filter(
        (exercise) => exercise.bodyPart.toLowerCase() === bodyPart.toLowerCase()
      );
      setExercises(filtered);
    }
  }, [bodyPart, allExercises]);

  return (
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
  );
};

export default Home;
