import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { usersApi } from '../services/userApi'; // Import the usersApi

const store = configureStore({
  reducer: {
    // Add the usersApi reducer to the store
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(usersApi.middleware); // Add the RTK Query middleware
  },
});

// Add listener for cache-related features like refetching
setupListeners(store.dispatch);

export default store;
