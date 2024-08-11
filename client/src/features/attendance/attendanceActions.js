// src/features/attendance/attendanceActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  recordAttendance,
  updateAttendance,
  deleteAttendance,
  fetchAttendance,
} from "../../services/api";

// Fetch all attendance records
export const fetchAttendanceRecords = createAsyncThunk(
  "attendance/fetchAttendanceRecords",
  async () => {
    const response = await fetchAttendance();
    return response.data;
  }
);

// Record new attendance
export const createAttendanceRecord = createAsyncThunk(
  "attendance/createAttendanceRecord",
  async (attendance) => {
    const response = await recordAttendance(attendance);
    return response.data;
  }
);

// Update existing attendance
export const modifyAttendanceRecord = createAsyncThunk(
  "attendance/modifyAttendanceRecord",
  async ({ id, attendance }) => {
    const response = await updateAttendance(id, attendance);
    return response.data;
  }
);

// Delete an attendance record
export const removeAttendanceRecord = createAsyncThunk(
  "attendance/removeAttendanceRecord",
  async (id) => {
    await deleteAttendance(id);
    return id;
  }
);
