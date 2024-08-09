import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Student API
const fetchStudents = () => axios.get(`${API_URL}/students`);
const createStudent = (student) => axios.post(`${API_URL}/students`, student);
const updateStudent = (id, student) =>
  axios.put(`${API_URL}/students/${id}`, student);
const deleteStudent = (id) => axios.delete(`${API_URL}/students/${id}`);

// Attendance API
const recordAttendance = (attendance) =>
  axios.post(`${API_URL}/attendance`, attendance);
const updateAttendance = (id, attendance) =>
  axios.put(`${API_URL}/attendance/${id}`, attendance);
const deleteAttendance = (id) => axios.delete(`${API_URL}/attendance/${id}`);

// Teacher API
const fetchTeachers = () => axios.get(`${API_URL}/teachers`);
const createTeacher = (teacher) => axios.post(`${API_URL}/teachers`, teacher);
const updateTeacher = (id, teacher) =>
  axios.put(`${API_URL}/teachers/${id}`, teacher);
const deleteTeacher = (id) => axios.delete(`${API_URL}/teachers/${id}`);

// Admin API
const fetchAdmins = () => axios.get(`${API_URL}/admins`);
const createAdmin = (admin) => axios.post(`${API_URL}/admins`, admin);
const updateAdmin = (id, admin) => axios.put(`${API_URL}/admins/${id}`, admin);
const deleteAdmin = (id) => axios.delete(`${API_URL}/admins/${id}`);

export default {
  fetchStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  recordAttendance,
  updateAttendance,
  deleteAttendance,
  fetchTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  fetchAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
};
