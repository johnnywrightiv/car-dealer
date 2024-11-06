import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/store/auth-slice';
import chatReducer from '@/store/chat-slice';
// import searchFormReducer from '@/store/search-form-slice';
// import globalSearchReducer from './global-search-slice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		chat: chatReducer,
		// searchForm: searchFormReducer,
		// globalSearch: globalSearchReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
