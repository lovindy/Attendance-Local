// src/features/teacher/teacherActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Fetch all teachers
export const fetchTeacherRecords = createAsyncThunk(
  'teacher/fetchTeacherRecords',
  async () => {
    const response = await api.fetchTeachers();
    return response.data;
  }
);

// Create new teacher
export const createTeacherRecord = createAsyncThunk(
  'teacher/createTeacherRecord',
  async (teacher) => {
    const response = await api.createTeacher(teacher);
    return response.data;
  }
);

// Update existing teacher
export const modifyTeacherRecord = createAsyncThunk(
  'teacher/modifyTeacherRecord',
  async ({ id, teacher }) => {
    const response = await api.updateTeacher(id, teacher);
    return response.data;
  }
);

// Delete a teacher record
export const removeTeacherRecord = createAsyncThunk(
  'teacher/removeTeacherRecord',
  async (id) => {
    await api.deleteTeacher(id);
    return id;
  }
);
