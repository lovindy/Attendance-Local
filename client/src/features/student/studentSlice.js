import { createSlice } from '@reduxjs/toolkit';
import api from '../../services/api';

import {
  fetchStudentRecords,
  createStudentRecord,
  modifyStudentRecord,
  removeStudentRecord,
} from './studentActions';

const studentSlice = createSlice({
  name: 'student',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetching student records
      .addCase(fetchStudentRecords.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStudentRecords.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchStudentRecords.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Handle creating a new student record
      .addCase(createStudentRecord.fulfilled, (state, action) => {
        state.data.push(action.payload); // Add the new student to the data array
      })

      // Handle updating an existing student record
      .addCase(modifyStudentRecord.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (student) => student.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = action.payload; // Update the student data in the array
        }
      })

      // Handle removing a student record
      .addCase(removeStudentRecord.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (student) => student.id !== action.payload
        );
      });
  },
});

export default studentSlice.reducer;
