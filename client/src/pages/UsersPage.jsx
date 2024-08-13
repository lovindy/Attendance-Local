import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../features/user/userSlice';
import AdminCard from '../components/specific/AdminCard';

const UsersPage = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.data);
  const status = useSelector((state) => state.user.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  return (
    <div>
      <h1>Users</h1>
      {users.map((user) => (
        <AdminCard key={user.id} admin={user} />
      ))}
    </div>
  );
};

export default UsersPage;
