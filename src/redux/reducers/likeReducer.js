import { createSlice } from '@reduxjs/toolkit';
const likeSlice = createSlice({
  name: 'like',
  initialState: {
    ids: [],
  },
  reducers: {
    addLike: (state, action) => {
      state.ids.push(action.payload.id);
    },
    removeLike: (state, action) => {
      state.ids.splice(state.ids.indexOf(action.payload.id), 1);
    },
  },
});

export const likeReducer = likeSlice.reducer;
export const { addLike, removeLike } = likeSlice.actions;
export const likeSelector = (state) => state.likeReducer.ids;
