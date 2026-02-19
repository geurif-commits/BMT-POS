import { useEffect, useState } from 'react';
import { api } from '../services/api';

export const DashboardPage = () => {
  const [rows, setRows] = useState<any[]>([]);
  useEffect(() => {
    api.get('/dashboard/cashier-overview').then((r) => setRows(r.data)).catch(() => setRows([]));
  }, []);
  return (
    <div>
      <h2>Vista Cajera</h2>
      <table><thead><tr><th>Mesa</th><th>Estado</th><th>Camarero</th><th>Pago</th></tr></thead><tbody>
        {rows.map((r) => <tr key={r.code}><td>{r.code}</td><td>{r.status}</td><td>{r.waiter_name ?? '-'}</td><td>{r.payment_status}</td></tr>)}
      </tbody></table>
    </div>
  );
};
