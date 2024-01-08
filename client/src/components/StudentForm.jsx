import React, { useState } from 'react';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';

function StudentForm({ onSubmit }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [major, setMajor] = useState('');
  const [gradYear, setGradYear] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ first_name: firstName,
        last_name: lastName,
        major: major,
        graduation_year: gradYear });
  };

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
      <Button type="submit" variant="contained" color="primary">Add Student</Button>
    </form>
  );
}

export default StudentForm;