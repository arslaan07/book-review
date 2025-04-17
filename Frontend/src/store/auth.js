import { createSlice } from '@reduxjs/toolkit'
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        role: 'user',
        email: ''
    },
    reducers: {
        login(state, action) {
            state.isAuthenticated = true,
            state.email = action.payload.email
        },
        logout(state) {
            state.isAuthenticated = false,
            state.email = ''
        },
        changeRole(state, action) {
            const role = action.payload
            state.role = role
        }
    }
})

export const { login, logout, changeRole } = authSlice.actions 
export default authSlice.reducer