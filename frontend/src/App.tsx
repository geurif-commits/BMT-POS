import { Link, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { BarPage } from './pages/BarPage';
import { KitchenPage } from './pages/KitchenPage';
import { WaiterPage } from './pages/WaiterPage';

export const App = () => (
  <div style={{ fontFamily: 'sans-serif', padding: 16 }}>
    <h1>BMTECHRD POS TERMINAL ENTERPRISE</h1>
    <nav style={{ display: 'flex', gap: 10 }}><Link to="/">Dashboard</Link><Link to="/waiter">Waiter</Link><Link to="/bar">Bar</Link><Link to="/kitchen">Kitchen</Link></nav>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<ProtectedRoute allow={['CASHIER', 'SUPERVISOR', 'ADMIN']}><DashboardPage /></ProtectedRoute>} />
      <Route path="/waiter" element={<ProtectedRoute allow={['WAITER']}><WaiterPage /></ProtectedRoute>} />
      <Route path="/bar" element={<ProtectedRoute allow={['BAR', 'SUPERVISOR', 'ADMIN']}><BarPage /></ProtectedRoute>} />
      <Route path="/kitchen" element={<ProtectedRoute allow={['KITCHEN', 'SUPERVISOR', 'ADMIN']}><KitchenPage /></ProtectedRoute>} />
    </Routes>
  </div>
);
