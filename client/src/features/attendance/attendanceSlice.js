import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchAttendanceRecords,
  createAttendanceRecord,
  modifyAttendanceRecord,
  removeAttendanceRecord,
} from './attendanceActions';

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttendanceRecords.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAttendanceRecords.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchAttendanceRecords.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createAttendanceRecord.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(createAttendanceRecord.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default attendanceSlice.reducer;
