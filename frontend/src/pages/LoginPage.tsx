import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useAuthStore } from '../store/auth.store';

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const setSession = useAuthStore((s) => s.setSession);
  const navigate = useNavigate();

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const { data } = await api.post('/auth/login', { username, password });
    const payload = JSON.parse(atob(data.token.split('.')[1]));
    setSession({ token: data.token, role: payload.role, username: payload.username, branchId: payload.branchId });
    navigate('/');
  };

  return (
    <form onSubmit={submit} style={{ display: 'grid', gap: 12, maxWidth: 360, margin: '48px auto' }}>
      <h2>BMTECHRD POS Login</h2>
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="usuario" required />
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="contraseña" required />
      <button>Entrar</button>
    </form>
  );
};
