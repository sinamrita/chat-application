import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedConversation: null,
  messages: []
};

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    addConversation: (state, action) => {
      state.selectedConversation = action.payload;
    },
    resetConversation: (state, action) => {
      state.selectedConversation = null
    },
    addMessages: (state,action) => {
      state.messages = action.payload
    },
    resetMessages: (state, action) => {
      state.messages = []
    },
  }
});

export const { addConversation,resetConversation,addMessages,resetMessages } = conversationSlice.actions;
export default conversationSlice.reducer;
