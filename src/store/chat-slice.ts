import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './store';

interface Message {
	id: string;
	content: string;
	senderId: string;
	isAgent: boolean;
	createdAt: string;
}

interface ChatSession {
	id: string;
	status: 'ACTIVE' | 'CLOSED' | 'WAITING';
	visitor: string;
	email: string;
	phone: string | null;
	agentId: string | null;
	messages: Message[];
	createdAt: string;
	updatedAt: string;
}

interface ChatState {
	sessions: ChatSession[];
	activeChatId: string | null;
	loading: boolean;
	error: string | null;
}

const initialState: ChatState = {
	sessions: [],
	activeChatId: null,
	loading: false,
	error: null,
};

export const fetchSessions = createAsyncThunk(
	'chat/fetchSessions',
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetch('/api/chat-sessions');
			if (!response.ok) {
				throw new Error('Failed to fetch chat sessions');
			}
			return await response.json();
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const joinChat = createAsyncThunk(
	'chat/joinChat',
	async (sessionId: string, { rejectWithValue, getState }) => {
		try {
			const state = getState() as RootState;
			const agentId = state.auth.user?.id;
			if (!agentId) {
				throw new Error('Agent not authenticated');
			}

			const response = await fetch(`/api/chat-sessions/${sessionId}/join`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ agentId }),
			});

			if (!response.ok) {
				throw new Error('Failed to join chat');
			}

			return await response.json();
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		addSession: (state, action: PayloadAction<ChatSession>) => {
			state.sessions.push(action.payload);
		},
		updateSession: (state, action: PayloadAction<ChatSession>) => {
			const index = state.sessions.findIndex(
				(session) => session.id === action.payload.id
			);
			if (index !== -1) {
				state.sessions[index] = action.payload;
			}
		},
		addMessage: (
			state,
			action: PayloadAction<{ sessionId: string; message: Message }>
		) => {
			const session = state.sessions.find(
				(s) => s.id === action.payload.sessionId
			);
			if (session) {
				session.messages.push(action.payload.message);
			}
		},
		setActiveChat: (state, action: PayloadAction<string | null>) => {
			state.activeChatId = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchSessions.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchSessions.fulfilled, (state, action) => {
				state.loading = false;
				state.sessions = action.payload;
			})
			.addCase(fetchSessions.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			.addCase(joinChat.fulfilled, (state, action) => {
				const index = state.sessions.findIndex(
					(session) => session.id === action.payload.id
				);
				if (index !== -1) {
					state.sessions[index] = action.payload;
				}
				state.activeChatId = action.payload.id;
			});
	},
});

export const { addSession, updateSession, addMessage, setActiveChat } =
	chatSlice.actions;

export default chatSlice.reducer;
