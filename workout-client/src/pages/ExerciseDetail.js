import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { fetchData } from '../utils/fetchData';
import Detail from '../components/Detail';
import ExerciseVideos from '../components/ExerciseVideos';
import SimilarExercises from '../components/SimilarExercises';

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchExercisesData = async () => {
      try {
        // ✅ Get full exercise detail from your backend
        const detailData = await fetchData(`/api/exercises/${id}`);
        setExerciseDetail(detailData);

        // ✅ Get related YouTube videos from backend
        const videoData = await fetchData(`/api/videos/${encodeURIComponent(detailData.name)}`);
        setExerciseVideos(videoData.contents || []);

        // ✅ Get similar exercises by target muscle
        const targetData = await fetchData(`/api/exercises/target/${encodeURIComponent(detailData.target)}`);
        setTargetMuscleExercises(targetData);

        // ✅ Get similar exercises by equipment
        const equipmentData = await fetchData(`/api/exercises/equipment/${encodeURIComponent(detailData.equipment)}`);
        setEquipmentExercises(equipmentData);
      } catch (err) {
        console.error('Error loading exercise detail page:', err.message);
      }
    };

    fetchExercisesData();
  }, [id]);

  return (
    <Box>
      <Detail exerciseDetail={exerciseDetail} />
      <ExerciseVideos exerciseVideos={exerciseVideos} name={exerciseDetail.name} />
      <SimilarExercises
        targetMuscleExercises={targetMuscleExercises}
        equipmentExercises={equipmentExercises}
      />
    </Box>
  );
};

export default ExerciseDetail;
