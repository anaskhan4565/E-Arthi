import { configureStore } from '@reduxjs/toolkit';
import emarketReducer from './emarketSlice';

const store = configureStore({
  reducer: {
    emarket: emarketReducer,  
  },
});

export default store;
