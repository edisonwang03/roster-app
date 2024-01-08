import React, { useState } from 'react';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import { useSelector } from 'react-redux';

function StudentForm({ onSubmit, onCancel, isUpdating }) {
  const { selectedStudent } = useSelector(state => state.students);
  const [firstName, setFirstName] = useState(isUpdating ? selectedStudent.firstName : '');
  const [lastName, setLastName] = useState(isUpdating ? selectedStudent.lastName : '');
  const [major, setMajor] = useState(isUpdating ? selectedStudent.major : '');
  const [gradYear, setGradYear] = useState(isUpdating ? selectedStudent.graduationYear : '');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ firstName: firstName,
        lastName: lastName,
        major: major,
        graduationYear: gradYear });
  };

  const handleCancel = () => {
    onCancel();
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <InputLabel>First Name</InputLabel>
        <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </FormControl>
      <FormControl>
        <InputLabel>Last Name</InputLabel>
        <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </FormControl>
      <FormControl>
        <InputLabel>Major</InputLabel>
        <Input value={major} onChange={(e) => setMajor(e.target.value)} />
      </FormControl>
      <FormControl>
        <InputLabel>Graduation Year</InputLabel>
        <Input value={gradYear} onChange={(e) => setGradYear(e.target.value)} />
      </FormControl>
      <Button type="submit" variant="contained" color="primary" >{isUpdating ? 'Update Student' : 'Add Student'}</Button>
      <Button type="button" variant="contained" color="secondary" onClick={handleCancel}>Cancel</Button>
    </form>
  );
}

export default StudentForm;