import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "store",
  initialState: {
    student: {},
    project: {},
    instruct: {},
    review: {},
    array: [],
    isShow: false,
  },
  reducers: {
    // incremented: (state) => {
    //   state.store.student = {
    //     fullname: "",
    //   };
    // },
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
    setIsShow: (state, action) => {
      state.isShow = action.payload;
    },
  },
});

export const {
  setInfoStudent,
  setInfoInstruct,
  setInfoProject,
  setInfoReview,
  setArray,
  setIsShow,
} = counterSlice.actions;

export default counterSlice.reducer;
