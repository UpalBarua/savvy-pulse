import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Categories from '../pages/Home/Categories/Categories';

const MainLayout = () => {
  return (
    <main
      style={{
        height: '100vh',
        display: 'grid',
        gridTemplateRows: '1fr auto',
      }}>
      <div>
        <Header />
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default MainLayout;
