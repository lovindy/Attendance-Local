import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Student API
export const fetchStudents = () => axios.get(`${API_URL}/students`);
export const createStudent = (student) =>
  axios.post(`${API_URL}/students`, student);
export const updateStudent = (id, student) =>
  axios.put(`${API_URL}/students/${id}`, student);
export const deleteStudent = (id) => axios.delete(`${API_URL}/students/${id}`);

// Attendance API
export const recordAttendance = (attendance) =>
  axios.post(`${API_URL}/attendance`, attendance);
export const updateAttendance = (id, attendance) =>
  axios.put(`${API_URL}/attendance/${id}`, attendance);
export const deleteAttendance = (id) =>
  axios.delete(`${API_URL}/attendance/${id}`);

// Teacher API
export const fetchTeachers = () => axios.get(`${API_URL}/teachers`);
export const createTeacher = (teacher) =>
  axios.post(`${API_URL}/teachers`, teacher);
export const updateTeacher = (id, teacher) =>
  axios.put(`${API_URL}/teachers/${id}`, teacher);
export const deleteTeacher = (id) => axios.delete(`${API_URL}/teachers/${id}`);

// Admin API
export const fetchAdmins = () => axios.get(`${API_URL}/admins`);
export const createAdmin = (admin) => axios.post(`${API_URL}/admins`, admin);
export const updateAdmin = (id, admin) =>
  axios.put(`${API_URL}/admins/${id}`, admin);
export const deleteAdmin = (id) => axios.delete(`${API_URL}/admins/${id}`);
