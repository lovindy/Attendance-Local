// src/features/teacher/teacherSelectors.js

// Select the entire teacher state
export const selectTeacherState = (state) => state.teacher;

// Select all teacher records
export const selectAllTeacherRecords = (state) => state.teacher.teacherRecords;

// Select a specific teacher record by ID
export const selectTeacherById = (state, id) =>
  state.teacher.teacherRecords.find((teacher) => teacher.id === id);

// Select the loading state for teacher operations
export const selectTeacherLoading = (state) => state.teacher.loading;

// Select any error messages related to teacher operations
export const selectTeacherError = (state) => state.teacher.error;
