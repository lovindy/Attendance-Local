import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAttendanceRecord } from '../../features/attendance/attendanceSlice';
import {
  selectAttendanceError,
  selectAttendanceLoading,
} from '../../features/attendance/attendanceSelectors';

const AttendanceForm = () => {
  const [date, setDate] = useState('');
  const [studentId, setStudentId] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [present, setPresent] = useState(false);

  const dispatch = useDispatch();
  const loading = useSelector(selectAttendanceLoading);
  const error = useSelector(selectAttendanceError);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAttendance = {
      date,
      studentId,
      teacherId,
      present,
    };

    try {
      await dispatch(createAttendanceRecord(newAttendance));
      setDate('');
      setStudentId('');
      setTeacherId('');
      setPresent(false);
    } catch (error) {
      console.error('Failed to create attendance:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <div>
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Student ID:</label>
        <input
          type="number"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Teacher ID:</label>
        <input
          type="number"
          value={teacherId}
          onChange={(e) => setTeacherId(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Present:</label>
        <input
          type="checkbox"
          checked={present}
          onChange={(e) => setPresent(e.target.checked)}
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Attendance'}
      </button>
    </form>
  );
};

export default AttendanceForm;
