import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setStudents } from '../state/index.js';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import StudentForm from './StudentForm';

function StudentsToolbar({ selectedStudent, setSelectedStudent }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const students = useSelector(state => state.students);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddStudent = async (student) => {
    try {
      const response = await fetch('http://localhost:5000/add_student', { // Replace with your API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
      });
  
      if (response.ok) {
        const data = await response.json();
        const newStudent = {
          id: data._id,
          firstName: data.first_name,
          lastName: data.last_name,
          major: data.major,
          graduationYear: data.graduation_year,
        };
        dispatch(setStudents([...students, newStudent]));
      
        handleClose();
      } else {
        console.error('Failed to add student:', response);
      }
    } catch (error) {
      console.error('Failed to add student:', error);
    } finally {
      handleClose();
    }
  };

  const handleUpdateStudent = () => {
    if (selectedStudent) {
      // Update student logic goes here
    }
  };

  const handleDeleteStudent = () => {
    if (selectedStudent) {
      // Delete student logic goes here
    }
  };

  return (
    <div className="toolbar">
      <Button variant="contained" color="primary" onClick={handleOpen}>Add Student</Button>
      <Modal open={open} onClose={handleClose}>
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