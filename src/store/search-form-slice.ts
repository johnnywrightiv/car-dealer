import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchFormState {
	inputA: string;
	sliderLower: number;
	sliderUpper: number;
	toggleValue: boolean;
	inputB: string;
	inputC: string;
}

const initialState: SearchFormState = {
	inputA: '',
	sliderLower: 0,
	sliderUpper: 100,
	toggleValue: false,
	inputB: '',
	inputC: '',
};

const searchFormSlice = createSlice({
	name: 'search form',
	initialState,
	reducers: {
		setInputValue: (
			state,
			action: PayloadAction<{
				field: keyof Pick<SearchFormState, 'inputA' | 'inputB' | 'inputC'>;
				value: string;
			}>
		) => {
			const { field, value } = action.payload;
			state[field] = value;
		},
		setSliderValue: (
			state,
			action: PayloadAction<{
				field: keyof Pick<SearchFormState, 'sliderLower' | 'sliderUpper'>;
				value: number;
			}>
		) => {
			const { field, value } = action.payload;
			state[field] = value;
		},
		setToggleValue: (state, action: PayloadAction<boolean>) => {
			state.toggleValue = action.payload;
		},
		resetForm: (state) => {
			return initialState;
		},
	},
});

export const { setInputValue, setSliderValue, setToggleValue, resetForm } =
	searchFormSlice.actions;

export default searchFormSlice.reducer;
