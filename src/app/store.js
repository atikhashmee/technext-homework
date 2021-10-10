import { configureStore } from '@reduxjs/toolkit';
import rocketReducer from '../features/rocketLuanch/rocketLuanchSlice';

// eslint-disable-next-line import/prefer-default-export
export const store = configureStore({
  reducer: {
    rocket: rocketReducer,
  },
});
