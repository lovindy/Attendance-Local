// src/features/admin/adminActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} from '../../services/api';

// Fetch all admins
export const fetchAdminRecords = createAsyncThunk(
  'admin/fetchAdminRecords',
  async () => {
    const response = await fetchAdmins();
    return response.data;
  }
);

// Create new admin
export const createAdminRecord = createAsyncThunk(
  'admin/createAdminRecord',
  async (admin) => {
    const response = await createAdmin(admin);
    return response.data;
  }
);

// Update existing admin
export const modifyAdminRecord = createAsyncThunk(
  'admin/modifyAdminRecord',
  async ({ id, admin }) => {
    const response = await updateAdmin(id, admin);
    return response.data;
  }
);

// Delete an admin record
export const removeAdminRecord = createAsyncThunk(
  'admin/removeAdminRecord',
  async (id) => {
    await deleteAdmin(id);
    return id;
  }
);
