import { configureStore } from '@reduxjs/toolkit';

import giphysReducer from '../features/giphys/giphysSlice';

export default configureStore({
  reducer: {
    giphys: giphysReducer,
  },
});
