import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function AddStudentDialog({ open, handleClose }) {
  const [newStudent, setNewStudent] = useState({});

  const handleInputChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  const handleAddStudent = () => {
    fetch('http://localhost:5000/add_student', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newStudent),
    })
    .then(response => response.json())
    .then(data => {
      // Handle response
      console.log(data);
      handleClose();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Student</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="first_name"
          label="First Name"
          type="text"
          fullWidth
          variant="standard"
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          name="last_name"
          label="Last Name"
          type="text"
          fullWidth
          variant="standard"
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          name="major"
          label="Major"
          type="text"
          fullWidth
          variant="standard"
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          name="graduation_year"
          label="Graduation Year"
          type="number"
          fullWidth
          variant="standard"
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleAddStudent}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddStudentDialog;