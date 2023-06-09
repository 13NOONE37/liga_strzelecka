import React from 'react';
import { Outlet } from 'react-router-dom';

export default function AdminPage() {
  return (
    <div>
      Admin
      <Outlet />
    </div>
  );
}
