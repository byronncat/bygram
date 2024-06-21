import { Outlet } from 'react-router-dom';
import { SidebarOptionsProvider } from '../providers';
import { ColumnLayout } from '../layouts';

const Dashboard = () => {
  return (
    <SidebarOptionsProvider>
      <ColumnLayout>
        <Outlet />
      </ColumnLayout>
    </SidebarOptionsProvider>
  );
};

export default Dashboard;
