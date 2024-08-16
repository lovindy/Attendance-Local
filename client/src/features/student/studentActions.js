// src/features/student/studentActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Fetch all students
export const fetchStudentRecords = createAsyncThunk(
  'student/fetchStudentRecords',
  async () => {
    const response = await api.fetchStudents();
    console.log('API Response:', response.data); // Add this line
    return response.data;
  }
);

// Create new student
export const createStudentRecord = createAsyncThunk(
  'student/createStudentRecord',
  async (student) => {
    const response = await api.createStudent(student);
    return response.data;
  }
);

// Update existing student
export const modifyStudentRecord = createAsyncThunk(
  'student/modifyStudentRecord',
  async ({ id, student }) => {
    const response = await api.updateStudent(id, student);
    return response.data;
  }
);

// Delete a student record
export const removeStudentRecord = createAsyncThunk(
  'student/removeStudentRecord',
  async (id) => {
    await api.deleteStudent(id);
    return id;
  }
);
