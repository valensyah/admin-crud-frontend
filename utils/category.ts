import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/helpers/axios";

type Category = {
    id: number,
    category: string,
    description: string,
    created_at: string,
    updated_at: string
}

type Value = {
    value: Category[]
}

const initialState: Value = {
    value: []
}

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setCategory: (state, action) => {
            state.value = action.payload
        },
        updateCategory: (state, action) => {
            const index: number = state.value.findIndex(item => item.id === action.payload.id)
            state.value[index] = action.payload
        },
        deleteCategory: (state, action) => {
            const index: number = state.value.findIndex(item => item.id == action.payload)
            state.value.splice(index, 1)
        }
    }
})

export const { updateCategory, setCategory, deleteCategory } = categorySlice.actions

export default categorySlice.reducer