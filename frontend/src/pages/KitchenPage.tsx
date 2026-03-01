import { useCallback, useEffect, useState } from 'react';
import { api } from '../services/api';
import { useSocket } from '../hooks/useSocket';

export const KitchenPage = () => {
  const [tickets, setTickets] = useState<any[]>([]);
  const load = useCallback(() => api.get('/orders/kitchen-queue').then((r) => setTickets(r.data)), []);
  useSocket(load);
  useEffect(() => { load(); }, [load]);
  return <div><h2>COCINA</h2>{tickets.map((t) => <div key={t.id}>{t.product_name} x{t.quantity}</div>)}</div>;
};
