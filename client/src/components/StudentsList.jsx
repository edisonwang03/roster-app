import React, { useEffect} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { setStudents } from '../state/index.js';

function StudentsList() {
  const dispatch = useDispatch();
  const students = useSelector(state => state.students); // Select the students state from the Redux store

  useEffect(() => {
    fetch('http://localhost:5000/get_all_students')
      .then(response => response.json())
      .then(data => {
        // Map the data to match the DataGrid component's format
        const formattedData = data.students.map((student) => ({
          id: student._id,
          firstName: student.first_name,
          lastName: student.last_name,
          major: student.major,
          graduationYear: student.graduation_year,
        }));
        dispatch(setStudents(formattedData)); // Dispatch the setStudents action with the formatted data
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, [dispatch]); // Add dispatch to the dependency array

  const columns = [
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    { field: 'major', headerName: 'Major', width: 130 },
    { field: 'graduationYear', headerName: 'Graduation Year', width: 160 },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      {students && <DataGrid
        rows={Array.from(students)}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />}
    </div>
  );
}

export default StudentsList;