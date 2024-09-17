import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-64px)] bg-secondary">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
