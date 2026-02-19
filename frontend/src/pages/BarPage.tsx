import { useCallback, useEffect, useState } from 'react';
import { api } from '../services/api';
import { useSocket } from '../hooks/useSocket';

export const BarPage = () => {
  const [tickets, setTickets] = useState<any[]>([]);
  const load = useCallback(() => api.get('/orders/bar-queue').then((r) => setTickets(r.data)), []);
  useSocket(load);
  useEffect(() => { load(); }, [load]);
  return <div><h2>BAR</h2>{tickets.map((t) => <div key={t.id}>{t.product_name} x{t.quantity}</div>)}</div>;
};
