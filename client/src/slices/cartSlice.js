import { createSlice } from "@reduxjs/toolkit";
import toast from 'react-hot-toast';

const initialState = {
    totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        setTotalItems: (state, value) => {
            state.totalItems = value.payload
        },

        //add to cart:
        addToCart: (state, value) => {
            state.totalItems.push(value.payload);
            toast.success("Item added to cart")
        },
        removeFromCart: (state, value) => {
            state.totalItems.filter((el) => el !== value.payload);
            toast.error("Item removed from cart")
        },
        resetCart: (state, value) => {
            state.totalItems = 0
        }
    }
})

export const {setTotalItems} = cartSlice.actions;
export default cartSlice.reducer   