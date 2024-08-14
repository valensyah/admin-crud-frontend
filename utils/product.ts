import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../helpers/axios";

type Product = {
    id: number,
    product_name: string,
    image: string,
    stock: number,
    description: string,
    created_at: string,
    updated_at: string,
    category: string,
    category_id: number
}

type Value = {
    value: Product[]
}

const initialState: Value = {
    value: []
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProduct: (state, action) => {
            state.value = action.payload
        },
        updateProduct: (state, action) => {
            const index: number = state.value.findIndex(item => item.id === action.payload.id)
            state.value[index] = action.payload
        },
        deleteProduct: (state, action) => {
            const index: number = state.value.findIndex(item => item.id == action.payload)
            state.value.splice(index, 1)
        }
    }
})

export const { updateProduct, setProduct, deleteProduct } = productSlice.actions

export default productSlice.reducer