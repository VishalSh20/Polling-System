import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  socket: null,
  currentPoll: null,
  preservedPoll: null, // Keep poll data even after currentPoll is cleared
  pollResults: null,
  preservedPollResults: null, // Keep poll results even after pollResults is cleared
  isAnswered: false,
  timeRemaining: 0,
  pastPolls: [],
  connectedStudents: 0,
  loading: false,
  error: null
};

const pollSlice = createSlice({
  name: 'poll',
  initialState,
  reducers: {
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
    setCurrentPoll: (state, action) => {
      state.currentPoll = action.payload;
      state.preservedPoll = action.payload; // Preserve poll data when setting current poll
      state.isAnswered = false;
      state.timeRemaining = action.payload?.timeLimit || 60;
      state.pollResults = null;
    },
    setPollResults: (state, action) => {
      state.pollResults = action.payload;
      state.preservedPollResults = action.payload; // Preserve poll results when setting them
    },
    setAnswered: (state, action) => {
      state.isAnswered = action.payload;
    },
    setTimeRemaining: (state, action) => {
      state.timeRemaining = action.payload;
    },
    setPastPolls: (state, action) => {
      state.pastPolls = action.payload;
    },
    setConnectedStudents: (state, action) => {
      state.connectedStudents = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearCurrentPoll: (state) => {
      state.currentPoll = null;
      state.isAnswered = false;
      state.timeRemaining = 0;
      state.pollResults = null;
      // Note: preservedPoll and preservedPollResults are NOT cleared here, they stay for display
    },
    clearPreservedPoll: (state) => {
      state.preservedPoll = null;
      state.preservedPollResults = null;
    },
    endCurrentPoll: (state) => {
      // This action is for when poll ends but we want to keep the data visible
      state.currentPoll = { ...state.currentPoll, status: 'ENDED' };
      state.timeRemaining = 0;
    }
  }
});

export const {
  setSocket,
  setCurrentPoll,
  setPollResults,
  setAnswered,
  setTimeRemaining,
  setPastPolls,
  setConnectedStudents,
  setLoading,
  setError,
  clearCurrentPoll,
  clearPreservedPoll,
  endCurrentPoll
} = pollSlice.actions;

export default pollSlice.reducer;