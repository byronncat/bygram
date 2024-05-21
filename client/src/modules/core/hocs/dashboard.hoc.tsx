import { Outlet } from 'react-router-dom';
import ColumnLayout from '../layouts/root.layout';

export default function Dashboard() {
  return (
    <ColumnLayout>
      <Outlet />
    </ColumnLayout>
  );
}
