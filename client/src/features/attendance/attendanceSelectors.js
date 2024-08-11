// src/features/attendance/attendanceSelectors.js

// Select the entire attendance state
export const selectAttendanceState = (state) => state.attendance;

// Select all attendance records
export const selectAllAttendanceRecords = (state) =>
  state.attendance.attendanceRecords;

// Select a specific attendance record by ID
export const selectAttendanceById = (state, id) =>
  state.attendance.attendanceRecords.find((record) => record.id === id);

// Select the loading state for attendance operations
export const selectAttendanceLoading = (state) => state.attendance.loading;

// Select any error messages related to attendance operations
export const selectAttendanceError = (state) => state.attendance.error;
