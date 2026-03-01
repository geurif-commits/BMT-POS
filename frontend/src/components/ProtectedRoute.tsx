import { Navigate } from 'react-router-dom';
import { Role } from '../types';
import { useAuthStore } from '../store/auth.store';

export const ProtectedRoute = ({ allow, children }: { allow: Role[]; children: JSX.Element }) => {
  const session = useAuthStore((s) => s.session);
  if (!session) return <Navigate to="/login" replace />;
  if (!allow.includes(session.role)) return <Navigate to="/" replace />;
  return children;
};
