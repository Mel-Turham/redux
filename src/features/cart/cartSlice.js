import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'https://www.course-api.com/react-useReducer-cart-project';

const initialState = {
	cartItems: [],
	amount: 4,
	total: 0,
	isLoading: true,
};

export const getCartItems = createAsyncThunk(
	'cart/getCartItems',
	async (thunkAPI) => {
		try {
			const res = await axios(url);
			return res.data;
		} catch (error) {
			return thunkAPI.rejectWithValue('something went wrong');
		}
	},
);

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		clearCart: (state) => {
			state.cartItems = [];
		},
		removeItem: (state, action) => {
			const idItem = action.payload;
			state.cartItems = state.cartItems.filter((item) => item.id !== idItem);
		},

		increase: (state, action) => {
			const idItem = action.payload;
			const cartItem = state.cartItems.find((item) => item.id === idItem);
			cartItem.amount = cartItem.amount + 1;
		},
		decrease: (state, action) => {
			const idItem = action.payload;
			const cartItem = state.cartItems.find((item) => item.id === idItem);
			cartItem.amount = cartItem.amount - 1;
		},

		calculateTotal: (state) => {
			let amount = 0;
			let total = 0;
			state.cartItems.forEach((item) => {
				amount += item.amount;
				total += item.amount * item.price;
			});
			state.amount = amount;
			state.total = total.toFixed(2);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getCartItems.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getCartItems.fulfilled, (state, action) => {
				state.isLoading = false;
				state.cartItems = action.payload;
			})
			.addCase(getCartItems.rejected, (state, action) => {
				state.isLoading = false;
				console.log(action);
			});
	},
});

console.log(cartSlice);

export const { clearCart, removeItem, increase, decrease, calculateTotal } =
	cartSlice.actions;

export default cartSlice.reducer;
