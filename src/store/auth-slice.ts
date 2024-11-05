import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface AuthState {
	isAuthenticated: boolean;
	user: { id: string; username: string } | null;
	token: string | null;
	loading: boolean;
	error: string | null;
}

const initialState: AuthState = {
	isAuthenticated: false,
	user: null,
	token: null,
	loading: false,
	error: null,
};

export const login = createAsyncThunk(
	'auth/login',
	async (
		credentials: { username: string; password: string },
		{ rejectWithValue }
	) => {
		try {
			const apiUrl = process.env.NEXT_PUBLIC_API_URL;
			if (!apiUrl) {
				throw new Error('API URL is not defined');
			}

			const response = await fetch(`${apiUrl}/auth/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(credentials),
			});

			if (!response.ok) {
				const errorData = await response.json();
				return rejectWithValue(errorData.message || 'Login failed');
			}

			const data = await response.json();
			localStorage.setItem('token', data.token);
			return data;
		} catch (error) {
			console.error('Login error:', error);
			return rejectWithValue(`An error occurred during login: ${error}`);
		}
	}
);

export const logout = createAsyncThunk('auth/logout', async () => {
	localStorage.removeItem('token');
});

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (
			state,
			action: PayloadAction<{ id: string; username: string } | null>
		) => {
			state.isAuthenticated = !!action.payload;
			state.user = action.payload;
		},
		setToken: (state, action: PayloadAction<string | null>) => {
			state.token = action.payload;
			state.isAuthenticated = !!action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isAuthenticated = true;
				state.user = action.payload.user;
				state.token = action.payload.token;
				state.loading = false;
			})
			.addCase(login.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			.addCase(logout.fulfilled, (state) => {
				state.isAuthenticated = false;
				state.user = null;
				state.token = null;
			});
	},
});

export const { setUser, setToken } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
