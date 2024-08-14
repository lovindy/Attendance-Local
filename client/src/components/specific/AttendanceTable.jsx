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

const AttendanceTable = ({ attendance }) => {
  if (!attendance || attendance.length === 0) {
    return <p>No attendance records found.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Student ID</th>
          <th>Teacher ID</th>
          <th>Present</th>
        </tr>
      </thead>
      <tbody>
        {attendance.map((record) => (
          <tr key={record.attendance_id}>
            <td>{record.date}</td>
            <td>{record.studentId}</td>
            <td>{record.teacherId}</td>
            <td>{record.present ? 'Yes' : 'No'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AttendanceTable;
