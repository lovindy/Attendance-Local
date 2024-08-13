// import React, { useState } from "react";

// const AttendanceTable = ({
//   students,
//   attendanceRecords,
//   onAddStudent,
//   onUpdateStudent,
//   onDeleteStudent,
//   onRecordAttendance,
//   onUpdateAttendance,
//   onDeleteAttendance,
// }) => {
//   const [newStudentName, setNewStudentName] = useState("");

//   const handleAddStudent = () => {
//     if (newStudentName.trim()) {
//       onAddStudent({ name: newStudentName });
//       setNewStudentName("");
//     }
//   };

//   return (
//     <div>
//       <h2>Students</h2>
//       <ul>
//         {students.map((student) => (
//           <li key={student.id}>
//             {student.name}
//             <button onClick={() => onDeleteStudent(student.id)}>Delete</button>
//             <button
//               onClick={() => {
//                 const newName = prompt("Enter new name:", student.name);
//                 if (newName) {
//                   onUpdateStudent(student.id, { name: newName });
//                 }
//               }}
//             >
//               Edit
//             </button>
//           </li>
//         ))}
//       </ul>
//       <input
//         type="text"
//         value={newStudentName}
//         onChange={(e) => setNewStudentName(e.target.value)}
//         placeholder="New student name"
//       />
//       <button onClick={handleAddStudent}>Add Student</button>

//       <h2>Attendance</h2>
//       {Object.keys(attendanceRecords).map((date) => (
//         <div key={date}>
//           <h3>{date}</h3>
//           <ul>
//             {students.map((student) => (
//               <li key={student.id}>
//                 {student.name}
//                 <input
//                   type="checkbox"
//                   checked={attendanceRecords[date][student.id] || false}
//                   onChange={(e) =>
//                     onRecordAttendance({
//                       date,
//                       studentId: student.id,
//                       present: e.target.checked,
//                     })
//                   }
//                 />
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default AttendanceTable;

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

const AttendanceTable = ({ attendance }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Student</TableCell>
          <TableCell>Date</TableCell>
          <TableCell>Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {attendance.map((record) => (
          <TableRow key={record.id}>
            <TableCell>{record.student.name}</TableCell>
            <TableCell>{record.date}</TableCell>
            <TableCell>{record.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AttendanceTable;
