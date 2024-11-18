
import React, { useEffect, useState } from 'react';
import GenericTable from '../Table/Table';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const DashUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>();
  useEffect(() => {
    axios.get('http://localhost:8000/api/users').then((response) => {
      setUsers(response.data);
      console.log(response.data);
    });
  });
  const columns = [
    { key: 'id', label: 'آی‌دی' },
    { key: 'name', label: 'نام' },
    { key: 'email', label: 'ایمیل' },
    { key: 'role', label: 'نقش' },
  ];

  return (
    <div className='px-2 min-h-screen'>
      {/* <GenericTable
        data={users}
        columns={columns}
      /> */}
      users
    </div>
  );
};

export default DashUsers;
