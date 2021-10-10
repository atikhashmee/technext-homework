import { configureStore } from '@reduxjs/toolkit';
import rocketReducer from '../features/rocketLuanch/rocketLuanchSlice';

const store = configureStore({
  reducer: {
    rocket: rocketReducer,
  },
});
export default store;
