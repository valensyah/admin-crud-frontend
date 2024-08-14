import { createSlice } from "@reduxjs/toolkit";

type Transaction = {
    id: number,
    tr_id: string,
    tr_type: string,
    tr_product_id: number,
    tr_product_stock: number,
    created_at: string,
    updated_at: string
}

type Value = {
    value: Transaction[]
}

const initialState: Value = {
    value: []
}

export const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        setTransaction: (state, action) => {
            state.value = action.payload
        },
        updateTransaction: (state, action) => {
            const index: number = state.value.findIndex(item => item.id === action.payload.id)
            state.value[index] = action.payload
        },
        deleteTransaction: (state, action) => {
            const index: number = state.value.findIndex(item => item.id == action.payload)
            state.value.splice(index, 1)
        }
    }
})

export const { updateTransaction, setTransaction, deleteTransaction } = transactionSlice.actions

export default transactionSlice.reducer