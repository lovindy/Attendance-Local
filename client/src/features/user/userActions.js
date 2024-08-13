// src/features/user/userActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
} from '../../services/api';

// Fetch all Users
export const fetchUserRecords = createAsyncThunk(
  'user/fetchUserRecords',
  async () => {
    const response = await fetchUsers();
    return response.data;
  }
);

// Create new user
export const createUserRecord = createAsyncThunk(
  'user/createUserRecord',
  async (user) => {
    const response = await createUser(user);
    return response.data;
  }
);

// Update existing user
export const modifyUserRecord = createAsyncThunk(
  'user/modifyUserRecord',
  async ({ id, user }) => {
    const response = await updateUser(id, user);
    return response.data;
  }
);

// Delete a user record
export const removeUserRecord = createAsyncThunk(
  'user/removeUserRecord',
  async (id) => {
    await deleteUser(id);
    return id;
  }
);
