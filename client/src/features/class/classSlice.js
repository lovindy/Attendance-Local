import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunks for fetching, adding, updating, and deleting classes
export const fetchClasses = createAsyncThunk("class/fetchClasses", async () => {
  const response = await axios.get("/api/classes");
  return response.data;
});

export const addClass = createAsyncThunk("class/addClass", async (newClass) => {
  const response = await axios.post("/api/classes", newClass);
  return response.data;
});

export const updateClass = createAsyncThunk(
  "class/updateClass",
  async ({ id, updatedClass }) => {
    const response = await axios.put(`/api/classes/${id}`, updatedClass);
    return response.data;
  }
);

export const deleteClass = createAsyncThunk("class/deleteClass", async (id) => {
  await axios.delete(`/api/classes/${id}`);
  return id;
});

const classSlice = createSlice({
  name: "class",
  initialState: {
    classes: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClasses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.classes = action.payload;
      })
      .addCase(fetchClasses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addClass.fulfilled, (state, action) => {
        state.classes.push(action.payload);
      })
      .addCase(updateClass.fulfilled, (state, action) => {
        const index = state.classes.findIndex(
          (c) => c.id === action.payload.id
        );
        state.classes[index] = action.payload;
      })
      .addCase(deleteClass.fulfilled, (state, action) => {
        state.classes = state.classes.filter((c) => c.id !== action.payload);
      });
  },
});

export default classSlice.reducer;
