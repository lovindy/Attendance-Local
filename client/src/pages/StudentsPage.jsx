// src/pages/StudentsPage.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudentRecords } from '../features/student/studentActions';
import {
  selectAllStudentRecords,
  selectStudentLoading,
  selectStudentError,
} from '../features/student/studentSelectors';
import StudentCard from '../components/specific/StudentCard';

const StudentsPage = () => {
  const dispatch = useDispatch();

  // Use selectors to access specific parts of the state
  const students = useSelector(selectAllStudentRecords);
  const status = useSelector(selectStudentLoading);
  const error = useSelector(selectStudentError);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchStudentRecords());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Students</h1>
      {Array.isArray(students) && students.length > 0 ? (
        students.map((student) => (
          <StudentCard key={student.id} student={student} />
        ))
      ) : (
        <p>No students available.</p>
      )}
    </div>
  );
};

export default StudentsPage;
