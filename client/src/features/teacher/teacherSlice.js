import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import { fetchTeacherRecords } from './teacherActions';

export const fetchTeachers = createAsyncThunk(
  'teacher/fetchTeachers',
  async () => {
    const response = await api.get('/teachers');
    return response.data;
  }
);

const teacherSlice = createSlice({
  name: 'teacher',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeacherRecords.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTeacherRecords.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchTeacherRecords.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default teacherSlice.reducer;
