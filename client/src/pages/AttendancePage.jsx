// import React, { useEffect, useState } from "react";
// import {
//   fetchStudents,
//   createStudent,
//   updateStudent,
//   deleteStudent,
//   recordAttendance,
//   updateAttendance,
//   deleteAttendance,
// } from "../services/api";
// import AttendanceTable from "../components/specific/AttendanceTable";

// const AttendancePage = () => {
//   const [students, setStudents] = useState([]);
//   const [attendanceRecords, setAttendanceRecords] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetchStudents();
//         setStudents(response.data);
//         const records = response.data.reduce((acc, student) => {
//           student.Attendances.forEach((attendance) => {
//             if (!acc[attendance.date]) {
//               acc[attendance.date] = {};
//             }
//             acc[attendance.date][student.id] = attendance.present;
//           });
//           return acc;
//         }, {});
//         setAttendanceRecords(records);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleAddStudent = async (student) => {
//     try {
//       const response = await createStudent(student);
//       setStudents([...students, response.data]);
//     } catch (error) {
//       console.error("Error adding student:", error);
//     }
//   };

//   const handleUpdateStudent = async (id, student) => {
//     try {
//       const response = await updateStudent(id, student);
//       setStudents(students.map((s) => (s.id === id ? response.data : s)));
//     } catch (error) {
//       console.error("Error updating student:", error);
//     }
//   };

//   const handleDeleteStudent = async (id) => {
//     try {
//       await deleteStudent(id);
//       setStudents(students.filter((s) => s.id !== id));
//     } catch (error) {
//       console.error("Error deleting student:", error);
//     }
//   };

//   const handleRecordAttendance = async (attendance) => {
//     try {
//       const response = await recordAttendance(attendance);
//       const { date, studentId, present } = response.data;
//       setAttendanceRecords({
//         ...attendanceRecords,
//         [date]: {
//           ...attendanceRecords[date],
//           [studentId]: present,
//         },
//       });
//     } catch (error) {
//       console.error("Error recording attendance:", error);
//     }
//   };

//   const handleUpdateAttendance = async (id, attendance) => {
//     try {
//       const response = await updateAttendance(id, attendance);
//       const { date, studentId, present } = response.data;
//       setAttendanceRecords({
//         ...attendanceRecords,
//         [date]: {
//           ...attendanceRecords[date],
//           [studentId]: present,
//         },
//       });
//     } catch (error) {
//       console.error("Error updating attendance:", error);
//     }
//   };

//   const handleDeleteAttendance = async (id) => {
//     try {
//       await deleteAttendance(id);
//       const updatedRecords = { ...attendanceRecords };
//       for (const date in updatedRecords) {
//         delete updatedRecords[date][id];
//         if (Object.keys(updatedRecords[date]).length === 0) {
//           delete updatedRecords[date];
//         }
//       }
//       setAttendanceRecords(updatedRecords);
//     } catch (error) {
//       console.error("Error deleting attendance:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Student and Attendance Management</h1>
//       {/* Student management components */}
//       {/* Attendance management components */}
//       <AttendanceTable
//         students={students}
//         attendanceRecords={attendanceRecords}
//         onAddStudent={handleAddStudent}
//         onUpdateStudent={handleUpdateStudent}
//         onDeleteStudent={handleDeleteStudent}
//         onRecordAttendance={handleRecordAttendance}
//         onUpdateAttendance={handleUpdateAttendance}
//         onDeleteAttendance={handleDeleteAttendance}
//       />
//     </div>
//   );
// };

// export default AttendancePage;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAttendance } from '../features/attendance/attendanceSlice';
import AttendanceTable from '../components/specific/AttendanceTable';
import AttendanceForm from '../components/specific/AttendanceForm';

const AttendancePage = () => {
  const dispatch = useDispatch();
  const attendance = useSelector((state) => state.attendance.data);
  const status = useSelector((state) => state.attendance.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAttendance());
    }
  }, [status, dispatch]);

  return (
    <div>
      <h1>Attendance Management</h1>
      <AttendanceForm attendance={attendance} />
      <AttendanceTable attendance={attendance} />
    </div>
  );
};

export default AttendancePage;
