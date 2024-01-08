import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedStudent, setStudents } from '../state/index.js';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import StudentForm from './StudentForm';

function StudentsToolbar() {
  const dispatch = useDispatch();
  const students = useSelector(state => state.students.allStudents);
  const selectedStudent = useSelector(state => state.students.selectedStudent);
  const [addOpen, setAddOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleAddStudent = async (student) => {
    try {
      const response = await fetch('http://localhost:5000/add_student', { // Replace with your API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
      });
        const data = await response.json();
        const newStudent = {
          id: data._id,
          firstName: data.first_name,
          lastName: data.last_name,
          major: data.major,
          graduationYear: data.graduation_year,
        };
        dispatch(setStudents([...students, newStudent]));

    } catch (error) {
      console.error('Failed to add student:', error);
    } finally {
      setAddOpen(false);
    }
  };

  const handleUpdateStudent = () => {
    if (selectedStudent) {
      // Update student logic goes here
    }
  };

  const handleDeleteStudent = async () => {
    if (selectedStudent) {
      try {
        const response = await fetch(`http://localhost:5000/delete_student/${selectedStudent.id}`, { // Replace with your API endpoint
          method: 'DELETE',
        });
        const deletedStudent = await response.json();
        if (deletedStudent) {
          // Filter out the deleted student from the students array
          const updatedStudents = students.filter((student) => student.id !== deletedStudent._id);
          // Update the Redux store
          dispatch(setStudents(updatedStudents));
          dispatch(setSelectedStudent(null));
        }
      } catch (error) {
        console.error('Failed to delete student', error);
      }
    }
  };

  return (
    <div className="toolbar">
      <Button variant="contained" color="primary" onClick={() => setAddOpen(true)}>Add Student</Button>
      <Modal open={addOpen} onClose={() => setAddOpen(false)}>
        <Box sx={{ width: 400, padding: 4, backgroundColor: 'white', margin: 'auto', marginTop: '15%', outline: 'none' }}>
          <StudentForm onSubmit={handleAddStudent} />
        </Box>
      </Modal>
      <Button variant="contained" color="primary" onClick={handleUpdateStudent}>Update Student</Button>
      <Button variant="contained" color="primary" onClick={handleDeleteStudent}>Delete Student</Button>
    </div>
  );
}

export default StudentsToolbar;