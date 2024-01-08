import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const GraduationYearCount = () => {
  const allStudents = useSelector(state => state.students.allStudents);
  const [gradYears, setGradYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch('http://localhost:5000/get_all_grad_years')
      .then(response => response.json())
      .then(data => {
        setGradYears(data.graduationYears);
        if (selectedYear && !data.graduationYears.includes(selectedYear)) {
          setSelectedYear('');
        }
      });
  }, [allStudents, selectedYear]);

  useEffect(() => {
    if (selectedYear) {
      fetch(`http://localhost:5000/count_students_by_year/${selectedYear}`)
        .then(response => response.json())
        .then(data => setCount(data.count));
    }
  }, [allStudents, selectedYear]);

  return (
    <div>
      <h2>Graduation Year Count</h2>
      <select value={selectedYear} onChange={e => setSelectedYear(e.target.value)}>
        <option value="">Select a graduation year</option>
        {gradYears.map(year => <option key={year} value={year}>{year}</option>)}
      </select>
      {selectedYear && <p>Number of students graduating in {selectedYear}: {count}</p>}
    </div>
  );
}

export default GraduationYearCount;