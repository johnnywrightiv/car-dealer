import { configureStore } from '@reduxjs/toolkit';
import searchFormReducer from '@/store/search-form-slice';
import globalSearchReducer from './global-search-slice';

export const store = configureStore({
	reducer: {
		searchForm: searchFormReducer,
		globalSearch: globalSearchReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
