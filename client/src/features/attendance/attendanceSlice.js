import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchAttendance = createAsyncThunk(
  'attendance/fetchAttendance',
  async () => {
    const response = await api.get('/attendance');
    return response.data;
  }
);

export const createAttendanceRecord = createAsyncThunk(
  'attendance/createAttendanceRecord',
  async (attendance) => {
    const response = await api.post('/attendance', attendance);
    return response.data;
  }
);

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
      .addCase(fetchAttendance.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAttendance.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchAttendance.rejected, (state, action) => {
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
