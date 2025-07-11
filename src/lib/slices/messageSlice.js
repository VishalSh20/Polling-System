import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
  isOpen: false
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    toggleChat: (state) => {
      state.isOpen = !state.isOpen;
    },
    clearMessages: (state) => {
      state.messages = [];
    }
  }
});

export const { addMessage, toggleChat, clearMessages } = chatSlice.actions;
export default chatSlice.reducer;