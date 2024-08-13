// import axios from 'axios';

// const API_URL = 'http://localhost:8000/api';

// // Student API
// const fetchStudents = () => axios.get(`${API_URL}/students`);
// const createStudent = (student) => axios.post(`${API_URL}/students`, student);
// const updateStudent = (id, student) =>
//   axios.put(`${API_URL}/students/${id}`, student);
// const deleteStudent = (id) => axios.delete(`${API_URL}/students/${id}`);

// // Attendance API
// const recordAttendance = (attendance) =>
//   axios.post(`${API_URL}/attendance`, attendance);
// const updateAttendance = (id, attendance) =>
//   axios.put(`${API_URL}/attendance/${id}`, attendance);
// const deleteAttendance = (id) => axios.delete(`${API_URL}/attendance/${id}`);

// // Teacher API
// const fetchTeachers = () => axios.get(`${API_URL}/teachers`);
// const createTeacher = (teacher) => axios.post(`${API_URL}/teachers`, teacher);
// const updateTeacher = (id, teacher) =>
//   axios.put(`${API_URL}/teachers/${id}`, teacher);
// const deleteTeacher = (id) => axios.delete(`${API_URL}/teachers/${id}`);

// // Admin API
// const fetchAdmins = () => axios.get(`${API_URL}/admins`);
// const createAdmin = (admin) => axios.post(`${API_URL}/admins`, admin);
// const updateAdmin = (id, admin) => axios.put(`${API_URL}/admins/${id}`, admin);
// const deleteAdmin = (id) => axios.delete(`${API_URL}/admins/${id}`);

// // User API
// const fetchUsers = () => axios.get(`${API_URL}/users`);
// const createUser = (user) => axios.post(`${API_URL}/users`, user);
// const updateUser = (id, user) => axios.post(`${API_URL}/users/${id}`, user);
// const deleteUser = (id) => axios.post(`${API_URL}/users/${id}`, user);

// export default {
//   // Student
//   fetchStudents,
//   createStudent,
//   updateStudent,
//   deleteStudent,

//   // Attendance
//   recordAttendance,
//   updateAttendance,
//   deleteAttendance,

//   // Teacher
//   fetchTeachers,
//   createTeacher,
//   updateTeacher,
//   deleteTeacher,

//   // Admin
//   fetchAdmins,
//   createAdmin,
//   updateAdmin,
//   deleteAdmin,

//   // User
//   fetchUsers,
//   createUser,
//   updateUser,
//   deleteUser,
// };

import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Generic function for GET requests
const getRequest = async (endpoint) => {
  try {
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    console.error(`GET ${endpoint} failed`, error);
    throw error;
  }
};

// Generic function for POST requests
const postRequest = async (endpoint, data) => {
  try {
    const response = await apiClient.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error(`POST ${endpoint} failed`, error);
    throw error;
  }
};

// Generic function for PUT requests
const putRequest = async (endpoint, data) => {
  try {
    const response = await apiClient.put(endpoint, data);
    return response.data;
  } catch (error) {
    console.error(`PUT ${endpoint} failed`, error);
    throw error;
  }
};

// Generic function for DELETE requests
const deleteRequest = async (endpoint) => {
  try {
    const response = await apiClient.delete(endpoint);
    return response.data;
  } catch (error) {
    console.error(`DELETE ${endpoint} failed`, error);
    throw error;
  }
};

// Student API
const fetchStudents = () => getRequest('/students');
const createStudent = (student) => postRequest('/students', student);
const updateStudent = (id, student) => putRequest(`/students/${id}`, student);
const deleteStudent = (id) => deleteRequest(`/students/${id}`);

// Attendance API
const recordAttendance = (attendance) => postRequest('/attendance', attendance);
const updateAttendance = (id, attendance) =>
  putRequest(`/attendance/${id}`, attendance);
const deleteAttendance = (id) => deleteRequest(`/attendance/${id}`);

// Teacher API
const fetchTeachers = () => getRequest('/teachers');
const createTeacher = (teacher) => postRequest('/teachers', teacher);
const updateTeacher = (id, teacher) => putRequest(`/teachers/${id}`, teacher);
const deleteTeacher = (id) => deleteRequest(`/teachers/${id}`);

// Admin API
const fetchAdmins = () => getRequest('/admins');
const createAdmin = (admin) => postRequest('/admins', admin);
const updateAdmin = (id, admin) => putRequest(`/admins/${id}`, admin);
const deleteAdmin = (id) => deleteRequest(`/admins/${id}`);

// User API
const fetchUsers = () => getRequest('/users');
const createUser = (user) => postRequest('/users', user);
const updateUser = (id, user) => putRequest(`/users/${id}`, user);
const deleteUser = (id) => deleteRequest(`/users/${id}`);

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
