import { FormEvent, useState } from 'react';
import { api } from '../services/api';

export const WaiterPage = () => {
  const [tableId, setTableId] = useState('');
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [msg, setMsg] = useState('');

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    await api.post('/orders/items', { tableId, items: [{ productId, quantity }] });
    setMsg('Orden enviada');
  };

  return <form onSubmit={submit}><h2>Mesas Camarero</h2><input placeholder="table uuid" value={tableId} onChange={(e) => setTableId(e.target.value)} /><input placeholder="product uuid" value={productId} onChange={(e) => setProductId(e.target.value)} /><input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} /><button>Agregar</button><p>{msg}</p></form>;
};
