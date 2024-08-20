import React, { useState } from 'react';
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Checkbox,
  IconButton,
  Box,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import {
  useFetchAttendanceByStudentsQuery,
  // useCreateAttendanceMutation,
  useUpdateAttendanceMutation,
  useDeleteAttendanceMutation,
} from '../services/attandanceApi';

// Example student data mapping (could be fetched from an API)
const students = {
  1: 'John Doe',
  2: 'Jane Smith',
  3: 'Alice Johnson',
  // Add more students here...
};

function AttendancePage() {
  const { data, error, isLoading } = useFetchAttendanceByStudentsQuery();
  // const [createAttendance] = useCreateAttendanceMutation();
  const [updateAttendance] = useUpdateAttendanceMutation();
  const [deleteAttendance] = useDeleteAttendanceMutation();

  const [newAttendance, setNewAttendance] = useState({
    student_id: '',
    date: new Date().toISOString().split('T')[0],
    present: false,
  });
  const [searchQuery, setSearchQuery] = useState('');

  const handleUpdate = async (id) => {
    try {
      await updateAttendance({ id, ...newAttendance }).unwrap();
    } catch (err) {
      console.error('Failed to update attendance:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAttendance(id).unwrap();
    } catch (err) {
      console.error('Failed to delete attendance:', err);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = data?.filter((attendance) =>
    attendance.student_id.toString().includes(searchQuery)
  );

  if (isLoading) return <CircularProgress />;
  if (error) {
    console.error('Error fetching attendance:', error);
    return (
      <div>Error: {error.data?.message || 'An unknown error occurred'}</div>
    );
  }

  return (
    <div className="app-component">
      <h1>Search Student</h1>
      <TextField
        label="Search by Student ID"
        value={searchQuery}
        onChange={handleSearchChange}
        variant="outlined"
        margin="normal"
        fullWidth
      />

      <h1>Attendance List</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student ID</TableCell>
              <TableCell>Student Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Present</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData?.map((attendance) => (
              <TableRow
                key={
                  attendance.attendance_id ||
                  `${attendance.student_id}-${attendance.date}`
                }
              >
                <TableCell>{[attendance.student_id]}</TableCell>
                <TableCell>
                  {students[attendance.student_id] || 'Unknown Student'}
                </TableCell>
                <TableCell>{attendance.date}</TableCell>
                <TableCell>
                  <Checkbox checked={attendance.present} />
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleUpdate(attendance.attendance_id)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(attendance.attendance_id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default AttendancePage;
