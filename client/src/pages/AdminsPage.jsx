import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdmins } from "../features/admin/adminSlice";
import AdminCard from "../components/specific/AdminCard";

const AdminsPage = () => {
  const dispatch = useDispatch();
  const admins = useSelector((state) => state.admin.data);
  const status = useSelector((state) => state.admin.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAdmins());
    }
  }, [status, dispatch]);

  return (
    <div>
      <h1>Admins</h1>
      {admins.map((admin) => (
        <AdminCard key={admin.id} admin={admin} />
      ))}
    </div>
  );
};

export default AdminsPage;
