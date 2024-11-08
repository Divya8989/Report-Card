
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import TeacherDashbord from './components/TeacherDashbord'; // Correct name for ReportCard component
import Reportcard from './components/Reportcard'; // Container for cards
function App() {
  return (
    <Router>
      <div className="container mx-auto p-6">
        {/* <h1 className="text-3xl mb-4 text-center">Student ReportCard</h1> */}
        <Routes>
          {/* Home: Cards Container */}
          <Route path="/" element={<TeacherDashbord/>} />

          {/* Student Form */}
          <Route path="/form" element={<StudentForm />} />

          {/* Manage Students */}
          <Route path="/manage-students" element={<StudentList />} />

          {/* View Report */}
          <Route path="/view-report/:id" element={<Reportcard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
