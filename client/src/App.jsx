import React from "react";
import { Routes, Route } from "react-router-dom";
import AttendancePage from "./pages/AttendancePage";
import DashboardPage from "./pages/DashboardPage";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import StudentsPage from "./pages/StudentsPage";
import TeachersPage from "./pages/TeachersPage";
import AdminsPage from "./pages/AdminsPage";

const App = () => (
  <>
    <Header />
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/attendance" element={<AttendancePage />} />
      <Route path="/students" element={<StudentsPag />} />
      <Route path="/teachers" element={<TeachersPage />} />
      <Route path="/admins" element={<AdminsPage />} />
    </Routes>
    <Footer />
  </>
);

export default App;
