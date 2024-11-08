const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const XLSX = require('xlsx');
const nodemailer = require('nodemailer');
const multer = require('multer');

const fs = require('fs');
const upload = multer();

const { v4: uuidv4 } = require('uuid');
const app = express();
app.use(cors());
app.use(bodyParser.json());
// const nodemailer = require('nodemailer');
const FILE_PATH = './abc.xlsx';

// Helper to read Excel data
const readExcel = () => {
  if (fs.existsSync(FILE_PATH)) {
    const workbook = XLSX.readFile(FILE_PATH);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    return XLSX.utils.sheet_to_json(sheet);
  }
  return [];
};
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'your-email@gmail.com', // Your Gmail account
//     pass: 'your-password-or-app-password', // App password or Gmail password
//   },
// });
// Helper to write Excel data
const writeExcel = (data) => {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  XLSX.writeFile(workbook, FILE_PATH);
};
// app.post('/api/send-email', async (req, res) => {
//   const student = req.body;

//   const mailOptions = {
//     from: 'your-email@gmail.com',
//     to: student.email,
//     subject: 'Your Report Details',
//     text: `Hello ${student.name},\n\nHere are your report details:\n\nRoll No: ${student.rollno}\nCourse: ${student.course}\nAttendance: ${student.attenpercentage}%\n\nRegards,\nYour Institution`,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     res.status(200).send({ message: 'Email sent successfully' });
//   } catch (error) {
//     console.error('Error sending email:', error);
//     res.status(500).send({ message: 'Failed to send email' });
//   }
// });
// POST - Add new data
app.post('/api/data', (req, res) => {
  try {
    const { name,fatherName,motherName, otherPhone,gender, email ,phone,address, rollno,course,year,totalpresent,totalabsent,attenpercentage,oneA, oneB,oneC,twoA, twoB,twoC } = req.body;
    if (!name||!fatherName||!motherName||!email||!address||!gender||!phone||!otherPhone||! rollno||!course||!year||!totalpresent||!totalabsent||!attenpercentage||!oneA||!oneB||!oneC||!twoA||! twoB||!twoC) {
      return res.status(400).send({ message: 'Name and Email are required.' });
    }

    const id = uuidv4();
    const newData = { id, name,fatherName,motherName, otherPhone,gender, rollno, email,phone,address,course,year,totalpresent,totalabsent,attenpercentage,oneA,oneB,oneC,twoA,twoB,twoB,twoC};
    const data = readExcel();
    data.push(newData);
    writeExcel(data);
    res.status(201).send({ message: 'Data added successfully', id });
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

// GET - Fetch all data
app.get('/api/data', (req, res) => {
  try {
    const data = readExcel();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

// DELETE - Delete data by ID
app.delete('/api/data/:id', (req, res) => {
  try {
    const { id } = req.params;
    let data = readExcel();
    const filteredData = data.filter(item => item.id !== id);

    if (data.length === filteredData.length) {
      return res.status(404).send({ message: 'ID not found' });
    }

    writeExcel(filteredData);
    res.status(200).send({ message: 'Data deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

// PUT - Edit data by ID
app.put('/api/data/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { name,fatherName,motherName, rollno, otherPhone,gender,email,phone,address,course,year,totalpresent,totalabsent,attenpercentage, oneA,oneB,oneC,twoA,twoB,twoC} = req.body;

    let data = readExcel();
    let item = data.find(item => item.id === id);

    if (!item) {
      return res.status(404).send({ message: 'ID not found' });
    }
    item.name = name || item.name;
    item.fatherName=fatherName||item.fatherName;
    item.motherName=motherName||item.motherName;
    item.email = email || item.email;
    item.otherPhone= otherPhone||item.otherPhone;
    item.gender=gender||item.gender
    item. rollno=rollno||item.rollno
    item.phone = phone || item.phone;
    item.address = address || item.address;
    item.course=course||item.course
    item.year=year||item.year
    item.totalpresent=totalpresent||item.totalpresent
    item.totalabsent=totalabsent||item.totalabsent
    item.attenpercentage=attenpercentage||item.attenpercentage
    item.oneA=oneA||item.oneA
    item.oneB=oneB||item.oneB
    item.oneC=oneC||item.oneC
    item.twoA=twoA||item.twoA
    item.twoB=twoB||item.twoB
    item.twoC=twoC||item.twoC
    writeExcel(data);
    res.status(200).send({ message: 'Data updated successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
});
// app.post('/api/send-email', upload.single('file'), async (req, res) => {
//   const { email } = req.body;
//   const file = req.file;

//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'your-email@gmail.com',
//       pass: 'your-email-password',
//     },
//   });

//   const mailOptions = {
//     from: 'your-email@gmail.com',
//     to: email,
//     subject: 'Student Report Card',
//     text: 'Please find attached your report card.',
//     attachments: [{ filename: file.originalname, content: file.buffer }],
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     res.status(200).send('Email sent successfully!');
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Failed to send email');
//   }
// });
// Server
app.listen(9000, () => {
  console.log('Server is running on http://localhost:9000');
});
