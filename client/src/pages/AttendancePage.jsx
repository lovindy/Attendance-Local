import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAttendanceRecords } from '../features/attendance/attendanceActions';
import AttendanceTable from '../components/specific/AttendanceTable';
import AttendanceForm from '../components/specific/AttendanceForm';

const AttendancePage = () => {
  const dispatch = useDispatch();
  const attendance = useSelector((state) => state.attendance.data);
  const status = useSelector((state) => state.attendance.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAttendanceRecords());
    }
  }, [status, dispatch]);

  return (
    <div>
      <h1>Attendance Management</h1>
      <AttendanceForm attendance={attendance} />
      <AttendanceTable attendance={attendance} />
    </div>
  );
};

export default AttendancePage;
