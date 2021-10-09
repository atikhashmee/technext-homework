import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import rocketReducer from '../features/rocketLuanch/rocketLuanchSlice';

// eslint-disable-next-line import/prefer-default-export
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    rocket: rocketReducer,
  },
});
