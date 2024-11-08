import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
const ViewReportCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { student } = location.state || {};
  const downloadPDF = () => {
    const element = document.getElementById('reportCard');
    const options = {
      margin: 1,
      filename: `${student.name}_ReportCard.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
    html2pdf().from(element).set(options).save();
  };
  return (
    <div className="max-w-lg mx-auto mt-10">
      {/* Close Button */}
      <button
        onClick={() => navigate(-1)}
        className="bg-red-500 text-white px-4 py-2 rounded-full absolute top-5 right-5">
        Close
      </button>
      <div
        id="reportCard"
        className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-6 border-t-8 border-orange-500"
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="https://ssism.org/pages/Contribute/Ssism_Logo.png" // Replace with your logo
            alt="Logo"
            className="w-15 h-20"
            style={{ display: 'block', margin: '0 auto', justify: 'left' }} // Center the logo
          />
          <h2 className="text-center text-orange-600 font-bold" style={{ fontSize: '30px' }}>
            Student Report Card
          </h2>
        </div>
        {/* Student Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-lg mb-4">
            <strong>Name:</strong> {student?.name || 'N/A'}
          </div>
          <div className="text-lg mb-4">
            <strong>Father Name:</strong> {student?.fatherName || 'N/A'}
          </div>
          <div className="text-lg mb-4">
            <strong>Mother Name:</strong> {student?.motherName || 'N/A'}
          </div>
          <div className="text-lg mb-4">
            <strong>Email:</strong> {student?.email || 'N/A'}
          </div>
          <div className="text-lg mb-4">
            <strong>Contact:</strong> {student?.phone || 'N/A'}
          </div>
          <div className="text-lg mb-4">
            <strong>Other Contact No.:</strong> {student?.otherPhone || 'N/A'}
          </div>
          <div className="text-lg mb-4">
            <strong>Gender:</strong> {student?.gender || 'N/A'}
          </div>
          <div className="text-lg mb-4">
            <strong>Address:</strong> {student?.address || 'N/A'}
          </div>
          <div className="text-lg mb-4">
            <strong>Roll Number:</strong> {student?.rollno || 'N/A'}
          </div>
          <div className="text-lg mb-4">
            <strong>Course:</strong> {student?.course || 'N/A'}
          </div>
          <div className="text-lg mb-4">
            <strong>Year:</strong> {student?.year || 'N/A'}
          </div>
          <div className="text-lg mb-4">
            <strong>Total Present days:</strong> {student?.totalpresent || 'N/A'}
          </div>
          <div className="text-lg mb-4">
            <strong>Total Absent days:</strong> {student?.totalabsent || 'N/A'}
          </div>
          <div className="text-lg mb-4">
            <strong>Attendance Percentage:</strong> {student?.attenpercentage|| 'N/A'}
          </div>
          <div className="text-lg mb-4">
            <strong>1A Level:</strong> {student?.oneA|| 'N/A'}
          </div>
          <div className="text-lg mb-4">
            <strong>1B Level:</strong> {student?.oneB|| 'N/A'}
          </div>
          <div className="text-lg mb-4">
            <strong>1C Level:</strong> {student?.oneC|| 'N/A'}
          </div>
          <div className="text-lg mb-4">
            <strong>2A Level:</strong> {student?.twoA|| 'N/A'}
          </div>
          <div className="text-lg mb-4">
            <strong>2B Level:</strong> {student?.twoB|| 'N/A'}
          </div>
          <div className="text-lg mb-4">
            <strong>2C Level:</strong> {student?.twoC|| 'N/A'}
          </div>
        </div>
      </div>
      <button
        onClick={downloadPDF}
        className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-full w-full text-xl"
      >
        Download PDF
      </button>
    </div>
  );
};

export default ViewReportCard;

