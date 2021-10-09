/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllData } from './rocketLuanchApi';

const initialState = {
  items: [],
  originalItems: [],
  filters: {
    status: '',
    time: '',
    upcoming: false,
  },
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const rocketSync = createAsyncThunk(
  'rocketLuanch/rocketLuanchApi',
  async () => {
    const response = await fetchAllData();
    // The value we return becomes the `fulfilled` action payload
    return response;
  },
);

export const rocketSlice = createSlice({
  name: 'rocket',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    filterData: (state, action) => {
      state.filters = { ...action.payload };
      state.items = state.originalItems;
      if (state.filters.status !== '' && state.filters.status === 'success') {
        state.items = state.items.filter((item) => item.launch_success === true);
      }

      if (state.filters.status !== '' && state.filters.status === 'failed') {
        state.items = state.items.filter((item) => item.launch_success === false);
      }
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(rocketSync.pending, (state) => {
        // pending... state
      })
      .addCase(rocketSync.fulfilled, (state, action) => {
        state.items = action.payload;
        state.originalItems = action.payload;
      });
  },
});

export const { filterData } = rocketSlice.actions;
export const selectLuncher = (state) => state.rocket;

// export const selectCount = (state) => state.counter.value;
export default rocketSlice.reducer;
