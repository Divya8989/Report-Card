
import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentTable = () => {
  const dataRef = useRef([]);
  const navigate = useNavigate();
  const tableRef = useRef();

  const renderTable = () => {
    const tableBody = tableRef.current;
    tableBody.innerHTML = ''; // Clear current table rows

    dataRef.current.forEach((item, index) => {
      const row = document.createElement('tr');
      row.className = index % 2 === 0 ? 'bg-white' : 'bg-white'; // Alternate row colors
      row.innerHTML = `
        <td class="border px-2 py-3 text-center">${item.id}</td>
        <td class="border px-2 py-3 text-center">${item.name}</td>
        <td class="border px-2 py-3 text-center">${item.fatherName}</td>
        <td class="border px-2 py-3 text-center">${item.motherName}</td>
        <td class="border px-2 py-3 text-center">${item.email}</td>
        <td class="border px-2 py-3 text-center">${item.phone}</td>
        <td class="border px-2 py-3 text-center">${item.otherPhone}</td>
        <td class="border px-2 py-3 text-center">${item.gender}</td>
        <td class="border px-2 py-3 text-center">${item.address}</td>
        <td class="border px-2 py-3 text-center">${item.rollno}</td>
        <td class="border px-2 py-3 text-center">${item.course}</td>
        <td class="border px-2 py-3 text-center">${item.year}</td>
        <td class="border px-2 py-3 ">
          <div class="flex justify-around space-x-2">
            <button class="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600 transition duration-200 text-xs sm:text-sm">Edit</button>
            <button class="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition duration-200 text-xs sm:text-sm">Delete</button>
            <button class="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600 transition duration-200 text-xs sm:text-sm">Generate</button>
          </div>
        </td>
      `;
      tableBody.appendChild(row);

      // Add event listeners for the buttons inside the row
      row.querySelector('.bg-yellow-500').addEventListener('click', () => editData(item));
      row.querySelector('.bg-red-500').addEventListener('click', () => deleteData(item.id));
      row.querySelector('.bg-green-500').addEventListener('click', () => generateReport(item));
    });
  };

  const fetchData = async () => {
    const result = await axios.get('http://localhost:9000/api/data');
    dataRef.current = result.data;
    renderTable(); // Re-render table whenever data is fetched
  };

  const deleteData = async (id) => {
    await axios.delete(`http://localhost:9000/api/data/${id}`);
    fetchData();
  };

  const editData = (student) => {
    navigate('/form', { state: { student } });
  };

  const generateReport = (student) => {
    navigate(`/view-report/${student.id}`, { state: { student } });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto mt-10 p-4 sm:p-6 bg-white  rounded-lg">
      <h1 className="text-2xl sm:text-3xl font-bold text-orange-600 text-center mb-6">Student List</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-xs sm:text-sm">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="px-2 py-3 text-center">ID</th>
              <th className="px-2 py-3 text-center">Name</th>
              <th className="px-2 py-3 text-center">Father Name</th>
              <th className="px-2 py-3 text-center">Mother Name</th>
              <th className="px-2 py-3 text-center">Email</th>
              <th className="px-2 py-3 text-center">Contact No.</th>
              <th className="px-2 py-3 text-center">Other Contact No.</th>
              <th className="px-2 py-3 text-center">Gender</th>
              <th className="px-2 py-3 text-center">Address</th>
              <th className="px-2 py-3 text-center">Roll Number</th>
              <th className="px-2 py-3 text-center">Course</th>
              <th className="px-2 py-3 text-center">Year</th>
              <th className="px-2 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody ref={tableRef}></tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTable;
