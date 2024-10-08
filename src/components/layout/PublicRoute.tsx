import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';

export default function PublicRoute({ children }: { children: ReactNode }) {
  const user = useAppSelector((state) => state.auth.user);

  if (user) {
    return <Navigate to="/" />;
  }

  return children;
}
