import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {},
    reducers: {
        addUser: (state, action) => {
            console.log('this is action.payload inside userSlice', action.payload)
            return action.payload
        }

    }
})

export const { addUser } = userSlice.actions;
export default userSlice.reducer;