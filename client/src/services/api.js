import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

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

// User API
const fetchUsers = () => axios.get(`${API_URL}/users`);
const createUser = (user) => axios.post(`${API_URL}/users`, user);
const updateUser = (id, user) => axios.post(`${API_URL}/users/${id}`, user);
const deleteUser = (id) => axios.post(`${API_URL}/users/${id}`, user);

export default {
  // Student
  fetchStudents,
  createStudent,
  updateStudent,
  deleteStudent,

  // Attendance
  recordAttendance,
  updateAttendance,
  deleteAttendance,

  // Teacher
  fetchTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher,

  // Admin
  fetchAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,

  // User
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
};
