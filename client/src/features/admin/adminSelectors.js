// src/features/admin/adminSelectors.js

// Select the entire admin state
export const selectAdminState = (state) => state.admin;

// Select all admin records
export const selectAllAdminRecords = (state) => state.admin.adminRecords;

// Select a specific admin record by ID
export const selectAdminById = (state, id) =>
  state.admin.adminRecords.find((admin) => admin.id === id);

// Select the loading state for admin operations
export const selectAdminLoading = (state) => state.admin.loading;

// Select any error messages related to admin operations
export const selectAdminError = (state) => state.admin.error;
