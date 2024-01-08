import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    allStudents: [],
    selectedStudent: null,
};

const studentsSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
      setStudents: (state, action) => {
        state.allStudents = action.payload;
        console.log(state.allStudents)
      },
      setSelectedStudent: (state, action) => {
        state.selectedStudent = action.payload;
        console.log(state.selectedStudent)
      }
    },
  });
  
export const { setStudents, setSelectedStudent} = studentsSlice.actions;
export default studentsSlice.reducer;