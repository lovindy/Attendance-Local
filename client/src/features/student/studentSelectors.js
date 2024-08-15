// src/features/student/studentSelectors.js

// Select the entire student state
export const selectStudentState = (state) => state.student;

// Select all student records
export const selectAllStudentRecords = (state) => state.student.data;

// export const selectAllStudentRecords = (state) => state.student.data;

// Select a specific student record by ID
export const selectStudentById = (state, id) =>
  state.student.studentRecords.find((student) => student.id === id);

// Select the loading state for student operations
export const selectStudentLoading = (state) => state.student.loading;

// Select any error messages related to student operations
export const selectStudentError = (state) => state.student.error;
