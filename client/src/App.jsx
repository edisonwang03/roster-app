import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import StudentsList from './components/StudentsList'
import StudentToolbar from './components/StudentToolbar'

function App() {
  return (
    <div className="App">
      <StudentsList />
      <StudentToolbar />
    </div>
  );
}

export default App
