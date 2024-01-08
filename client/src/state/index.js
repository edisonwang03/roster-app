import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    students: [],
};

const studentsSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
      setStudents: (state, action) => {
        return action.payload;
      }
    },
  });
  
export const { setStudents } = studentsSlice.actions;
export default studentsSlice.reducer;