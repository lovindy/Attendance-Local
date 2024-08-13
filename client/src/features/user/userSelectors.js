// src/features/user/userSelectors.js

// Select the entire user state
export const selectUserState = (state) => state.user;

// Select all user records
export const selectAllUserRecords = (state) => state.user.userRecords;

// Select a specific user record by ID
export const selectUserById = (state, id) =>
  state.user.userRecords.find((user) => user.id === id);

// Select the loading state for user operations
export const selectUserLoading = (state) => state.user.loading;

// Select any error messages related to user operations
export const selectUserError = (state) => state.user.error;
