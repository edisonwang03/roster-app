import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const MajorCount = () => {
  const allStudents = useSelector(state => state.students.allStudents)
  const [majors, setMajors] = useState([]);
  const [selectedMajor, setSelectedMajor] = useState('');
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch('http://localhost:5000/get_all_majors')
      .then(response => response.json())
      .then(data => {
        setMajors(data.majors);
        if (selectedMajor && !data.majors.includes(selectedMajor)) {
          setSelectedMajor('');
        }
      });
  }, [allStudents, selectedMajor]);

  useEffect(() => {
    if (selectedMajor) {
      fetch(`http://localhost:5000/count_students_by_major/${selectedMajor}`)
        .then(response => response.json())
        .then(data => setCount(data.count));
    }
  }, [allStudents, selectedMajor]);

  return (
    <div>
      <h2>Major Count</h2>
      <select value={selectedMajor} onChange={e => setSelectedMajor(e.target.value)}>
        <option value="">Select a major</option>
        {majors.map(major => <option key={major} value={major}>{major}</option>)}
      </select>
      {selectedMajor && <p>Number of students majoring in {selectedMajor}: {count}</p>}
    </div>
  );
}

export default MajorCount;