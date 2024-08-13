import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeachers } from '../features/teacher/teacherSlice';
import TeacherCard from '../components/specific/TeacherCard';

const TeachersPage = () => {
  const dispatch = useDispatch();
  const teachers = useSelector((state) => state.teacher.data);
  const status = useSelector((state) => state.teacher.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTeachers());
    }
  }, [status, dispatch]);

  return (
    <div>
      <h1>Teachers</h1>
      {teachers.map((teacher) => (
        <TeacherCard key={teacher.id} teacher={teacher} />
      ))}
    </div>
  );
};

export default TeachersPage;
