// Libraries
import React from 'react';
import { Routes, Route } from 'react-router-dom';
// Pages Components
import AttendancePage from './pages/attendance/AttendancePage';
import DashboardPage from './pages/DashboardPage';
import StudentsPage from './pages/students/StudentsPage';
import TeachersPage from './pages/teachers/TeachersPage';
import AdminsPage from './pages/admins/AdminsPage';
import UsersPage from './pages/users/UsersPage';
import UserDetail from './pages/users/UserDetail';
import ClassPage from './pages/classes/ClassPage';
// Common Components
import Navbar from './components/layout/Header';
import Footer from './components/layout/Footer';

const App = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/attendance" element={<AttendancePage />} />
      <Route path="/students" element={<StudentsPage />} />
      <Route path="/teachers" element={<TeachersPage />} />
      <Route path="/admins" element={<AdminsPage />} />
      <Route exact path="/users" element={<UsersPage />} />
      <Route path="/users/:id" element={<UserDetail />} />
      <Route path="/classes" element={<ClassPage />} />
    </Routes>
    <Footer />
  </>
);

export default App;
