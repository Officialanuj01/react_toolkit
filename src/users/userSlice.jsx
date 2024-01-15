import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'


const initialState = {
    users: [],
    status: 'idle',
    error: null
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users')
    return response.data
})

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        clearuser: (state, action) => {
            state.users = [];
            state.status='idle';
        }
    },
    extraReducers(builder) {
        builder
          .addCase(fetchUsers.pending, (state, action) => {
            state.status = 'loading'
          })
          .addCase(fetchUsers.fulfilled, (state, action) => {
            state.status = 'succeeded'
            // Add any fetched users to the array
            state.users = state.users.concat(action.payload)
          })
          .addCase(fetchUsers.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
          })
      }
})

export const {clearuser} = userSlice.actions

export const userslist = state => state.users

export default userSlice.reducer