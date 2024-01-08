import StudentsList from './components/StudentsList'
import StudentToolbar from './components/StudentToolbar'
import MajorCount from './components/MajorCount'
import GraduationYearCount from './components/GraduationYearCount';

function App() {
  return (
    <div className="App">
      <StudentsList />
      <StudentToolbar />
      <MajorCount />
      <GraduationYearCount />
    </div>
  );
}

export default App
