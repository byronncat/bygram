import { Navigate, Outlet } from 'react-router-dom';
import { SidebarOptionsProvider } from '../providers';
import CloudinaryProvider from '../database/cloudinary.database';
import { ColumnLayout } from '../layouts';
import { useAuthenticationContext } from '@/modules/authentication';

const Dashboard = () => {
  const { isLoggedIn } = useAuthenticationContext();
  if (!isLoggedIn) return <Navigate to="/login" />;

  return (
    <CloudinaryProvider>
      <SidebarOptionsProvider>
        <ColumnLayout>
          <Outlet />
        </ColumnLayout>
      </SidebarOptionsProvider>
    </CloudinaryProvider>
  );
};

export default Dashboard;
