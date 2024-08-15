import { createSlice } from '@reduxjs/toolkit';
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
      });
  },
});

export default studentSlice.reducer;
