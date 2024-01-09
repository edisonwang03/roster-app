import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedStudent, setStudents } from '../state/index.js';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import StudentForm from './StudentForm';
import Typography from '@mui/material/Typography';

function StudentsToolbar() {
  const dispatch = useDispatch();
  const students = useSelector(state => state.students.allStudents);
  const selectedStudent = useSelector(state => state.students.selectedStudent);
  const [addOpen, setAddOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleAddStudent = async (student) => {
    try {
      const response = await fetch('http://localhost:5000/add_student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
      });
      const data = await response.json();
      const newStudent = {
        _id: data._id,
        firstName: data.firstName,
        lastName: data.lastName,
        major: data.major,
        graduationYear: data.graduationYear,
      };
      dispatch(setStudents([...students, newStudent]));
      alert('Student added successfully!')

    } catch (error) {
      console.error('Failed to add student:', error);
    } finally {
      setAddOpen(false);
    }
  };

  const handleUpdateStudent = async (student) => {
    if (selectedStudent) {
      try {
        const response = await fetch(`http://localhost:5000/update_student/${selectedStudent._id.toString()}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(student),
        });
        const updatedStudent = await response.json();
        if (updatedStudent) {
          const updatedStudents = students.filter((student) => student._id.toString() !== updatedStudent._id);
          dispatch(setStudents([...updatedStudents, updatedStudent]));
          dispatch(setSelectedStudent(updatedStudent));
          alert('Student updated successfully!')
        }
      } catch (error) {
        console.error('Failed to update student', error);
      } finally {
        setUpdateOpen(false);
      }
    }
  };

  const handleDeleteStudent = async () => {
    if (selectedStudent) {
      try {
        console.log(selectedStudent._id.toString());
        const response = await fetch(`http://localhost:5000/delete_student/${selectedStudent._id.toString()}`, { 
          method: 'DELETE',
        });
        const deletedStudent = await response.json();
        if (deletedStudent) {
          const updatedStudents = students.filter((student) => student._id.toString() !== deletedStudent._id);
          dispatch(setStudents(updatedStudents));
          dispatch(setSelectedStudent(null));
          alert('Student deleted successfully!')
        }
      } catch (error) {
        console.error('Failed to delete student', error);
      } finally {
        setDeleteOpen(false);
      }
    }
  };

  return (
    <div className="toolbar">
      <Button variant="contained" color="primary" onClick={() => setAddOpen(true)}>Add Student</Button>
      <Modal open={addOpen} onClose={() => setAddOpen(false)}>
        <Box sx={{ width: 400, padding: 4, backgroundColor: 'white', margin: 'auto', marginTop: '15%', outline: 'none' }}>
          <StudentForm onSubmit={handleAddStudent} onCancel={() => setAddOpen(false)} isUpdating={false} />
        </Box>
      </Modal>
      <Button variant="contained" color="primary" onClick={() => setUpdateOpen(true)} disabled={!selectedStudent}>Update Student</Button>
      <Modal open={updateOpen} onClose={() => setUpdateOpen(false)}>
        <Box sx={{ width: 400, padding: 4, backgroundColor: 'white', margin: 'auto', marginTop: '15%', outline: 'none' }}>
          <StudentForm onSubmit={handleUpdateStudent} onCancel={() => setUpdateOpen(false)} isUpdating={true} />
        </Box>
      </Modal>
      <Button variant="contained" color="primary" onClick={() => setDeleteOpen(true)} disabled={!selectedStudent}>Delete Student</Button>
      <Modal open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <Box sx={{ width: 400, padding: 4, backgroundColor: 'white', margin: 'auto', marginTop: '15%', outline: 'none' }}>
          <Typography variant="h6">Are you sure you want to delete this student?</Typography>
          <Button variant="contained" color="primary" onClick={handleDeleteStudent}>Yes</Button>
          <Button variant="contained" color="secondary" onClick={() => setDeleteOpen(false)}>No</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default StudentsToolbar;