import { configureStore } from '@reduxjs/toolkit';
import searchFormReducer from '@/store/search-form-slice'

export const store = configureStore({
  reducer: {
    searchForm: searchFormReducer
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
