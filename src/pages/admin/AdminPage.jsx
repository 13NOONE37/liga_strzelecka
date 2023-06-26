import React from 'react';
import { Outlet } from 'react-router-dom';

import AdminSidebar from '../../components/adminSidebar/AdminSidebar';
import styles from './AdminPage.module.css';
export default function AdminPage() {
  return (
    <div className={styles.container}>
      <AdminSidebar />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
