import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../features/student/studentSlice";
import StudentCard from "../components/specific/StudentCard";

const StudentsPage = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.student.data);
  const status = useSelector((state) => state.student.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchStudents());
    }
  }, [status, dispatch]);

  return (
    <div>
      <h1>Students</h1>
      {students.map((student) => (
        <StudentCard key={student.id} student={student} />
      ))}
    </div>
  );
};

export default StudentsPage;
