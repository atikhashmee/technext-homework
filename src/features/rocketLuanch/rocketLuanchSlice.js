import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fetchAllData from './rocketLuanchApi';

const initialState = {
  items: [],
  originalItems: [],
  filters: {
    status: '',
    time: {
      last_week: '',
      last_month: '',
      last_year: '',
    },
    upcoming: false,
    searchTxt: '',
  },
};

export const rocketSync = createAsyncThunk(
  'rocketLuanch/rocketLuanchApi',
  async () => {
    const response = await fetchAllData();
    return response;
  },
);

export const rocketSlice = createSlice({
  name: 'rocket',
  initialState,
  reducers: {
    filterData: (stateObj, action) => {
      const state = stateObj;
      state.filters = { ...action.payload };
      state.items = state.originalItems;
      if (state.filters.status !== '' && state.filters.status === 'success') {
        state.items = state.items.filter((item) => item.launch_success === true);
      }

      if (state.filters.status !== '' && state.filters.status === 'failed') {
        state.items = state.items.filter((item) => item.launch_success === false);
      }

      if (state.filters.time.last_week !== '') {
        state.items = state.items.filter((item) => item.launch_date_unix >= state.filters.time.last_week.split(',')[0] && item.launch_date_unix <= state.filters.time.last_week.split(',')[1]);
      }

      if (state.filters.time.last_month !== '') {
        state.items = state.items.filter((item) => item.launch_date_unix >= state.filters.time.last_month.split(',')[0] && item.launch_date_unix <= state.filters.time.last_month.split(',')[1]);
      }

      if (state.filters.time.last_year !== '') {
        state.items = state.items.filter((item) => item.launch_date_unix >= state.filters.time.last_year.split(',')[0] && item.launch_date_unix <= state.filters.time.last_year.split(',')[1]);
      }

      if (state.filters.upcoming === true) {
        state.items = state.items.filter((item) => item.upcoming === true);
      } else {
        state.items = state.items.filter((item) => item.upcoming === false);
      }

      if (state.filters.searchTxt !== '') {
        const regex = new RegExp(state.filters.searchTxt, 'gi');
        state.items = state.items.filter((item) => {
          const rocketName = item.rocket.rocket_name || '';
          return rocketName.match(regex) !== null ? rocketName.length > 0 : false;
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(rocketSync.pending, (state) => {
        // pending... state
      })
      .addCase(rocketSync.fulfilled, (stateObj, action) => {
        const state = stateObj;
        state.items = action.payload;
        state.originalItems = action.payload;
      });
  },
});

export const { filterData } = rocketSlice.actions;
export const selectLuncher = (state) => state.rocket;
export default rocketSlice.reducer;
