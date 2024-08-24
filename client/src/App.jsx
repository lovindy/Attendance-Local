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
import ClassPage from './pages/classes/ClassPage';
import TestPage from './pages/TestPage';
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
      <Route path="/users" element={<UsersPage />} />
      <Route path="/classes" element={<ClassPage />} />
      <Route path="/test" element={<TestPage />} />
    </Routes>
    <Footer />
  </>
);

export default App;
