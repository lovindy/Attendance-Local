import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { usersApi } from '../services/usersApi';
import { teachersApi } from '../services/teachersApi';

const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,

    [teachersApi.reducerPath]: teachersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(usersApi.middleware)
      .concat(teachersApi.middleware),
});

setupListeners(store.dispatch);

export default store;
