import { Outlet } from 'react-router-dom';
import { SidebarOptionsProvider } from '../providers';
import CloudinaryProvider from '../database/cloudinary.database';
import { ColumnLayout } from '../layouts';

const Dashboard = () => {
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
