import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './reducers/authReducer';
import { likeReducer } from './reducers/likeReducer';
const store = configureStore({
  reducer: {
    authReducer,
    likeReducer,
  },
});
export default store;
