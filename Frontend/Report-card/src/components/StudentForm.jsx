import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
// Validation schema using Yup
  const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  fatherName: Yup.string().required('Father Name is required'),
  motherName: Yup.string().required('Mother Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phone: Yup.string().matches(/^\d{10}$/, 'Phone must be 10 digits').required('Contact number is required'),
  otherPhone: Yup.string().matches(/^\d{10}$/, 'Other phone must be 10 digits').required('Other contact number is required'),
  gender: Yup.string().required('Gender is required'),
  address: Yup.string().required('Address is required'),
  rollno: Yup.string().required('Roll Number is required'),
  course: Yup.string().required('Course is required'),
  year: Yup.string().required('Year is required'),
  totalpresent: Yup.number()
    .typeError('Total Present days must be a number')
    .min(0, 'Total Present days must be at least 0')
    .required('Total Present days is required'),
    totalabsent: Yup.number()
    .typeError('Total Absent days must be a number')
    .min(0, 'Total Absent days must be at least 0')
    .required('Total Absent days is required'),
    attenpercentage: Yup.number()
    .typeError('Attendance Percentage must be a number')
    .min(0, 'Attendance Percentage cannot be less than 0')
    .max(100, 'Attendance Percentage cannot be more than 100')
    .required('Attendance Percentage is required'),
    oneA: Yup.string().required('1A Level is required'),
    oneB: Yup.string().required('1B Level is required'),
    oneC: Yup.string().required('1C Level is required'),
    twoA: Yup.string().required('2A Level is required'),
    twoB: Yup.string().required('2B Level is required'),
    twoC: Yup.string().required('2C Level is required')
});
const StudentForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { student } = location.state || {};
  const formik = useFormik({
    initialValues: {
      name: student?.name || '',
      fatherName: student?.fatherName || '',
      motherName: student?.motherName || '',
      email: student?.email || '',
      phone: student?.phone || '',
      otherPhone: student?.otherPhone || '',
      gender: student?.gender || '',
      address: student?.address || '',
      rollno: student?.rollno || '',
      course: student?.course || '',
      year: student?.year || '',
      totalpresent: student?.totalpresent || '',
      totalabsent:student?.totalabsent||'',
      attenpercentage:student?.attenpercentage||'',
      oneA:student?.oneA ||'',
      oneB:student?.oneB|| '',
      oneC:student?.oneC|| '',
      twoA:student?.twoA|| '',
      twoB:student?.twoB|| '',
      twoC:student?.twoC|| '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      if (student?.id) {
        await axios.put(`http://localhost:9000/api/data/${student.id}`, values);
      } else {
        await axios.post('http://localhost:9000/api/data', values);
      }
      resetForm();
      navigate('/'); // Redirects back to the student table
    },
  });
  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-3xl font-bold text-orange-600 mb-6 text-center">
        {student ? 'Edit' : 'Add'} Student
      </h2>
      <form onSubmit={formik.handleSubmit} className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl mb-4">Student Information</h2>
        <div className="border-b-2 border-black w-1/4 mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Name Field */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
            <input
              type="text"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              // className="border p-2 w-full rounded-md"
              className={`p-2 w-full rounded-md border ${
                formik.touched.name && formik.errors.name
                  ? 'border-red-500'
                  : 'border-gray-300' }`}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 text-sm">{formik.errors.name}</div>
            ) : null}
          </div>
          {/* Father Name Field */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Father Name</label>
            <input
              type="text"
              name="fatherName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fatherName}
              // className="border p-2 w-full rounded-md"
              className={`p-2 w-full rounded-md border ${
                formik.touched.fatherName && formik.errors.fatherName
                  ? 'border-red-500'
                  : 'border-gray-300' }`}
            />
            {formik.touched.fatherName && formik.errors.fatherName ? (
              <div className="text-red-500 text-sm">{formik.errors.fatherName}</div>
            ) : null}
          </div>
          {/* Mother Name Field */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Mother Name</label>
            <input
              type="text"
              name="motherName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.motherName}
              // className="border p-2 w-full rounded-md"
              className={`p-2 w-full rounded-md border ${
                formik.touched.motherName && formik.errors.motherName
                  ? 'border-red-500'
                  : 'border-gray-300' }`}
            />
            {formik.touched.motherName && formik.errors.motherName ? (
              <div className="text-red-500 text-sm">{formik.errors.motherName}</div>
            ) : null}
          </div>
          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              // className="border p-2 w-full rounded-md"
              className={`p-2 w-full rounded-md border ${
                formik.touched.email&& formik.errors.email
                  ? 'border-red-500'
                  : 'border-gray-300' }`}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            ) : null}
          </div>
          {/* Contact No. Field */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Contact No.</label>
            <input
              type="number"
              name="phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              // className="border p-2 w-full rounded-md"
              className={`p-2 w-full rounded-md border ${
                formik.touched.phone && formik.errors.phone
                  ? 'border-red-500'
                  : 'border-gray-300' }`}
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="text-red-500 text-sm">{formik.errors.phone}</div>
            ) : null}
          </div>
          {/* Other Contact No. Field */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Other Contact No.</label>
            <input
              type="number"
              name="otherPhone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.otherPhone}
              // className="border p-2 w-full rounded-md"
              className={`p-2 w-full rounded-md border ${
                formik.touched.otherPhone && formik.errors.otherPhone
                  ? 'border-red-500'
                  : 'border-gray-300' }`}
            />
            {formik.touched.otherPhone && formik.errors.otherPhone ? (
              <div className="text-red-500 text-sm">{formik.errors.otherPhone}</div>
            ) : null}
          </div>
          {/* Gender Field */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Gender</label>
            <select
              name="gender"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.gender}
              // className="border p-2 w-full rounded-md"
              className={`p-2 w-full rounded-md border ${
                formik.touched.gender && formik.errors.gender
                  ? 'border-red-500'
                  : 'border-gray-300' }`}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {formik.touched.gender && formik.errors.gender ? (
              <div className="text-red-500 text-sm">{formik.errors.gender}</div>
            ) : null}
          </div>
          {/* Roll Number Field */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Roll Number</label>
            <input
              type="number"
              name="rollno"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.rollno}
              // className="border p-2 w-full rounded-md"
              className={`p-2 w-full rounded-md border ${
                formik.touched.rollno && formik.errors.rollno
                  ? 'border-red-500'
                  : 'border-gray-300' }`}
            />
            {formik.touched.rollno && formik.errors.rollno ? (
              <div className="text-red-500 text-sm">{formik.errors.rollno}</div>
            ) : null}
          </div>
          {/* Course Field */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Course</label>
            <select
              name="course"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.course}
              // className="border p-2 w-full rounded-md"
              className={`p-2 w-full rounded-md border ${
                formik.touched.course && formik.errors.course
                  ? 'border-red-500'
                  : 'border-gray-300' }`}
            >
              <option value="">Select Course</option>
              <option value="BBA+ITEG">BBA+ITEG</option>
              <option value="BCA+ITEG">BCA+ITEG</option>
              <option value="ITEG Diploma">ITEG Diploma</option>
            </select>
            {formik.touched.course && formik.errors.course ? (
              <div className="text-red-500 text-sm">{formik.errors.course}</div>
            ) : null}
          </div>
          {/* Year Field */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Year</label>
            <select
              name="year"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.year}
              // className="border p-2 w-full rounded-md" 
              className={`p-2 w-full rounded-md border ${
                formik.touched.year && formik.errors.year
                  ? 'border-red-500'
                  : 'border-gray-300' }`}
           >
              <option value="">Select Year</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
            </select>
            {formik.touched.year && formik.errors.year ? (
              <div className="text-red-500 text-sm">{formik.errors.year}</div>
            ) : null}
          </div>
          {/* Address Field */}
          <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Address</label>
   <textarea
    name="address"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.address}
    className={`p-2 w-full rounded-md border ${
      formik.touched.address && formik.errors.address
        ? 'border-red-500'
        : 'border-gray-300' }`}
  />
  {formik.touched.address && formik.errors.address && (
    <div className="text-red-500 text-sm">{formik.errors.address}</div>
  )}
</div><br />
<h2 className="text-2xl mb-4">Attendance Information</h2><br />
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Total Present days</label>
            <input
              type="number"
              name="totalpresent"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.totalpresent}
              // className="border p-2 w-full rounded-md"
              className={`p-2 w-full rounded-md border ${
                formik.touched.totalpresent && formik.errors.totalpresent
                  ? 'border-red-500'
                  : 'border-gray-300' }`}
            />
            {formik.touched.totalpresent && formik.errors.totalpresent ? (
              <div className="text-red-500 text-sm">{formik.errors.totalpresent}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Total Absent days</label>
            <input
              type="number"
              name="totalabsent"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.totalabsent}
              // className="border p-2 w-full rounded-md"
              className={`p-2 w-full rounded-md border ${
                formik.touched.totalabsent && formik.errors.totalabsent
                  ? 'border-red-500'
                  : 'border-gray-300' }`}
            />
            {formik.touched.totalabsent && formik.errors.totalabsent ? (
              <div className="text-red-500 text-sm">{formik.errors.totalabsent}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Attendance Percentage</label>
            <input
              type="number"
              name="attenpercentage"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.attenpercentage}
              // className="border p-2 w-full rounded-md"
              className={`p-2 w-full rounded-md border ${
                formik.touched.attenpercentage && formik.errors.attenpercentage
                  ? 'border-red-500'
                  : 'border-gray-300' }`}
            />
            {formik.touched.attenpercentage && formik.errors.attenpercentage ? (
              <div className="text-red-500 text-sm">{formik.errors.attenpercentage}</div>
            ) : null}
          </div><br />
          <h2 className="text-2xl mb-4">Level Certificate</h2>
          <div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2">1A Level</label>
  <select
    name="oneA"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.oneA}
    className={`p-2 w-full rounded-md border ${
      formik.touched.oneA && formik.errors.oneA
        ? 'border-red-500'
        : 'border-gray-300'
    }`}>
    <option value="" label="Select level" />
    <option value="Clear" label="Clear" />
    <option value="Pending" label="Pending" />
    <option value="InProgress" label="InProgress" />
  </select>
  {formik.touched.oneA && formik.errors.oneA ? (
    <div className="text-red-500 text-sm">{formik.errors.oneA}</div>
  ) : null}
</div>
<div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2">1B Level</label>
  <select
    name="oneB"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.oneB}
    className={`p-2 w-full rounded-md border ${
      formik.touched.oneB && formik.errors.oneB
        ? 'border-red-500'
        : 'border-gray-300'
    }`}>
    <option value="" label="Select level" />
    <option value="Clear" label="Clear" />
    <option value="Pending" label="Pending" />
    <option value="InProgress" label="InProgress" />
  </select>
  {formik.touched.oneB && formik.errors.oneB ? (
    <div className="text-red-500 text-sm">{formik.errors.oneB}</div>
  ) : null}
</div>
<div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2">1C Level</label>
  <select
    name="oneC"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.oneC}
    className={`p-2 w-full rounded-md border ${
      formik.touched.oneC && formik.errors.oneC
        ? 'border-red-500'
        : 'border-gray-300'
    }`}>
    <option value="" label="Select level" />
    <option value="Clear" label="Clear" />
    <option value="Pending" label="Pending" />
    <option value="InProgress" label="InProgress" />
  </select>
  {formik.touched.oneC && formik.errors.oneC ? (
    <div className="text-red-500 text-sm">{formik.errors.oneC}</div>
  ) : null}
    </div>

    <div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2">2A Level</label>
  <select
    name="twoA"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.twoA}
    className={`p-2 w-full rounded-md border ${
      formik.touched.twoA && formik.errors.twoA
        ? 'border-red-500'
        : 'border-gray-300'
    }`}
  >
    <option value="" label="Select level" />
    <option value="Clear" label="Clear" />
    <option value="Pending" label="Pending" />
    <option value="InProgress" label="InProgress" />
  </select>
  {formik.touched.twoA && formik.errors.twoA ? (
    <div className="text-red-500 text-sm">{formik.errors.twoA}</div>
  ) : null}
</div>
<div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2">2B Level</label>
  <select
    name="twoB"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.twoB}
    className={`p-2 w-full rounded-md border ${
      formik.touched.twoB && formik.errors.twoB
        ? 'border-red-500'
        : 'border-gray-300'
    }`}
  >
    <option value="" label="Select level" />
    <option value="Clear" label="Clear" />
    <option value="Pending" label="Pending" />
    <option value="InProgress" label="InProgress" />
  </select>
  {formik.touched.twoB && formik.errors.twoB ? (
    <div className="text-red-500 text-sm">{formik.errors.twoB}</div>
  ) : null}
</div>
<div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2">2C Level</label>
  <select
    name="twoC"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.twoC}
    className={`p-2 w-full rounded-md border ${
      formik.touched.twoC && formik.errors.twoC
        ? 'border-red-500'
        : 'border-gray-300'
    }`}
  >
    <option value="" label="Select level" />
    <option value="Clear" label="Clear" />
    <option value="Pending" label="Pending" />
    <option value="InProgress" label="InProgress" />
  </select>
  {formik.touched.twoC && formik.errors.twoC ? (
    <div className="text-red-500 text-sm">{formik.errors.twoC}</div>
  ) : null}
    </div>
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="bg-orange-600 text-white font-bold py-2 px-4 rounded mt-4 hover:bg-orange-500">
          {student ? 'Update' : 'Submit'}
        </button>
      </form>
    </div>
  );
};
export default StudentForm;