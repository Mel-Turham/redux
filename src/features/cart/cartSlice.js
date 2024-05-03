import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cartItems from '../../cartItems';

const url = 'https://course-api.com/react-useReducer-cart-project';

const initialState = {
	cartItems: cartItems,
	amount: 4,
	total: 0,
	isLoading: true,
};

export const getCartItems = createAsyncThunk('cart/getCartItems', () => {
	return fetch(url)
		.then((res) => res.json())
		.catch((err) => console.log(err));
});

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
	extraReducers: {
		[getCartItems.pending]: (state) => {
			state.isLoading = true;
		},
		[getCartItems.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.cartItems = action.payload;
		},
		[getCartItems.rejected]: (state) => {
			state.isLoading = false;
		},
	},
});

console.log(cartSlice);

export const { clearCart, removeItem, increase, decrease, calculateTotal } =
	cartSlice.actions;

export default cartSlice.reducer;
