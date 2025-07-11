import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    role: '',
    participants: []
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setName: (state, action) => {
            state.name = action.payload;
        },
        setRole: (state, action) => {
            state.role = action.payload;
            console.log("Role set to: ", action.payload);
        },
        setParticipants: (state, action) => {
            state.participants = action.payload;
        }
    }
});

export const { setName, setRole, setParticipants } = userSlice.actions;
export default userSlice.reducer;