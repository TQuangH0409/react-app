import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "store",
  initialState: {
    student: {} | undefined,
    project: {} | undefined,
    instruct: {} | undefined,
    review: {} | undefined,
    array: [],
  },
  reducers: {
    incremented: (state) => {
      state.student = undefined;
      state.project = undefined;
      state.instruct = undefined;
      state.review = undefined;
    },
    setInfoStudent: (state, action) => {
      state.student = action.payload;
    },
    setInfoInstruct: (state, action) => {
      state.instruct = action.payload;
    },
    setInfoProject: (state, action) => {
      state.project = action.payload;
    },
    setInfoReview: (state, action) => {
      state.review = action.payload;
    },
    setArray: (state, action) => {
      state.array = action.payload;
    },
  },
});

export const {
  incremented,
  setInfoStudent,
  setInfoInstruct,
  setInfoProject,
  setInfoReview,
  setArray,
} = counterSlice.actions;

export default counterSlice.reducer;
