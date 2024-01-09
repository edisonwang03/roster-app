import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { setStudents } from '../state/index.js';
import { setSelectedStudent } from '../state/index.js';

function StudentsList() {
  const dispatch = useDispatch();
  const students = useSelector(state => state.students.allStudents);
  const [selectionModel, setSelectionModel] = useState([]);

  const handleRowSelectionChange = (newSelection) => {
    const selectedId = newSelection[newSelection.length - 1];
    setSelectionModel([selectedId]);
    const selectedStudent = students.find((student) => student._id === selectedId);
    dispatch(setSelectedStudent(selectedStudent));
  };

  useEffect(() => {
    fetch('http://localhost:5000/get_all_students')
      .then(response => response.json())
      .then(data => {
        const formattedData = data.students.map((student) => ({
          _id: student._id.toString(),
          firstName: student.firstName,
          lastName: student.lastName,
          major: student.major,
          graduationYear: student.graduationYear,
        }));
        dispatch(setStudents(formattedData));
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, [dispatch]);

  const columns = [
    { field: 'firstName', headerName: 'First name', flex: 1 },
    { field: 'lastName', headerName: 'Last name', flex: 1 },
    { field: 'major', headerName: 'Major', flex: 1 },
    { field: 'graduationYear', headerName: 'Graduation Year', flex: 1 },
  ];

  return (
    <div>
      <h1>Student Roster</h1>
      <div style={{ height: 400, width: '100%' }}>
        {students && <DataGrid
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },

          }}
          pageSizeOptions={[5, 10, 20]}
          rows={Array.from(students)}
          columns={columns}
          selectionModel={selectionModel}
          onRowSelectionModelChange={handleRowSelectionChange}
          getRowId={(row) => row._id}
        />}
      </div>
    </div>
  );
}

export default StudentsList;