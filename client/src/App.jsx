import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AttendancePage from './pages/AttendancePage';
import DashboardPage from './pages/DashboardPage';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import StudentsPage from './pages/StudentsPage';
import TeachersPage from './pages/TeachersPage';
import AdminsPage from './pages/AdminsPage';
import UsersPage from './pages/UsersPage';
import Navbar from './components/common/NavBar';

const App = () => (
  <>
    <Header />
    <Navbar />
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/attendance" element={<AttendancePage />} />
      <Route path="/students" element={<StudentsPage />} />
      <Route path="/teachers" element={<TeachersPage />} />
      <Route path="/admins" element={<AdminsPage />} />
      <Route path="/users" element={<UsersPage />} />
    </Routes>
    <Footer />
  </>
);

export default App;
