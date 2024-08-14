import { createSlice } from "@reduxjs/toolkit";

type User = {
    value: {
        id: number,
        first_name: string,
        last_name: string,
        email: string,
        password: string,
        birth_date: string,
        gender: string,
        created_at: string,
        updated_at: string
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        value: typeof window !== "undefined" && window.localStorage.getItem('user') ? window.localStorage.getItem('user') : null
    },
    reducers: {
        setUser: (state, action) => {
            if (typeof window !== "undefined" && window.localStorage.getItem('user')) {
                state.value = window.localStorage.getItem('user')
            } else {
                state.value = action.payload
            }
        },
        singOut: (state) => {
            if (typeof window !== "undefined" && window.localStorage.getItem('user')) {
                window.localStorage.removeItem('user')
                window.localStorage.removeItem('token')
                state.value = null
            }
        },
        // setAllUser: (state, action) => {
        //     state.val
        // }
    }
})

export const { setUser, singOut } = userSlice.actions

export default userSlice.reducer