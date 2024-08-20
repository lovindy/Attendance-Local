import React, { useState, useEffect } from 'react';
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import {
  useFetchClassesQuery,
  useUpdateClassMutation,
  useDeleteClassMutation,
} from '../services/classApi';

function ClassPage() {
  const { data, error, isLoading } = useFetchClassesQuery();
  const [updateClass] = useUpdateClassMutation();
  const [deleteClass] = useDeleteClassMutation();
  const [searchQuery, setSearchQuery] = useState('');
  const [classesData, setClassesData] = useState([]);

  useEffect(() => {
    if (data) {
      setClassesData(data);
    }
  }, [data]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleUpdateClass = async (classData) => {
    try {
      await updateClass(classData).unwrap();
    } catch (err) {
      console.error('Failed to update class:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteClass(id).unwrap();
      setClassesData((prevData) =>
        prevData.filter((classItem) => classItem.id !== id)
      );
    } catch (err) {
      console.error('Failed to delete class:', err);
    }
  };

  const filteredData = classesData?.filter((classItem) =>
    classItem.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) return <CircularProgress />;

  if (error) {
    console.error('Error fetching classes:', error);
    const errorMessage = error.data?.message || 'An unknown error occurred';
    return (
      <div className="app-component">
        <h1>Class List</h1>
        <div>Error: {errorMessage}</div>
      </div>
    );
  }

  return (
    <div className="app-component">
      <h1>Search Class</h1>
      <TextField
        label="Search by Class Name"
        value={searchQuery}
        onChange={handleSearchChange}
        variant="outlined"
        margin="normal"
        fullWidth
      />

      <h1>Class List</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Class ID</TableCell>
              <TableCell>Class Name</TableCell>
              <TableCell>Teacher</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData?.map((classItem) => (
              <TableRow key={classItem.id}>
                <TableCell>{classItem.id}</TableCell>
                <TableCell>{classItem.name}</TableCell>
                <TableCell>{classItem.teacher?.name || 'N/A'}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleUpdateClass(classItem)}
                    title="Edit"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(classItem.id)}
                    title="Delete"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {filteredData.length === 0 && (
              <TableRow>
                <TableCell colSpan={4}>No Classes Found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ClassPage;
