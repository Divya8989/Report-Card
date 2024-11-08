
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CardContainer = () => {
  const navigate = useNavigate();

  return (
    <div>   <h1 className="text-3xl mb-4 text-center">Student ReportCard</h1>
    <div className="flex justify-between items-center mt-10 space-x-8"> {/* Added space between cards */}
      {/* Student Form Card */}
      <div
        className="bg-orange-500 text-white shadow-lg rounded-lg p-10 w-1/3 cursor-pointer hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
        onClick={() => navigate('/form')}
      >
        <h2 className="text-3xl font-bold mb-6">Add Student</h2> {/* Increased font size */}
        <p className="text-lg font-semibold">Click to add a new student</p> {/* Bold text */}
      </div>

      {/* Student Management Card */}
      <div
        className="bg-orange-500 text-white shadow-lg rounded-lg p-10 w-1/3 cursor-pointer hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
        onClick={() => navigate('/manage-students')}
      >
        <h2 className="text-3xl font-bold mb-6">Manage Students</h2>
        <p className="text-lg font-semibold">Click to view and manage student </p>
      </div>

      {/* View Report Card */}
      <div
        className="bg-orange-500 text-white shadow-lg rounded-lg p-10 w-1/3 cursor-pointer hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
        onClick={() => navigate('/view-report/1')}
      >
        <h2 className="text-3xl font-bold mb-6">View Report Card</h2>
        <p className="text-lg font-semibold">Click to view the report card</p>
      </div>
    </div>
    </div>
  );
};

export default CardContainer;
