'use client';

import { useState } from 'react';
import { formatPrice } from '../../utils/formatPrice';

export default function DeliveryPage() {
  // Simulando itens trazidos do banco na sacola de compras
  const [cartItems, setCartItems] = useState([
    {
      _id: "6a14ec8b99c152c488f67a9d",
      name: "Hambúrguer Gourmet da Casa",
      price: 38.90,
      quantity: 1,
      description: "Blend artesanal de 180g, queijo cheddar derretido e molho especial."
    }
  ]);

  const [clientData, setClientData] = useState({ name: '', phone: '', address: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Monitora as entradas do formulário de entrega
  const handleInputChange = (e) => {
    setClientData({ ...clientData, [e.target.name]: e.target.value });
  };

  // Funções para alterar a quantidade do item na sacola
  const updateQuantity = (id, amount) => {
    const updated = cartItems.map(item => {
      if (item._id === id) {
        const newQty = item.quantity + amount;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    });
    setCartItems(updated);
  };

  // Calcula o valor total dinamicamente
  const totalValue = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Envia o pedido para o nosso backend
  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client: clientData,
          items: cartItems,
          total: totalValue
        }),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message || 'Erro ao enviar o pedido.');

      setMessage({ type: 'success', text: `🎯 ${result.message} Código do pedido: ${result.orderId}` });
      // Limpa formulário e carrinho após o sucesso
      setClientData({ name: '', phone: '', address: '' });
      setCartItems([]);

    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight sm:text-4xl">Finalizar Pedido</h1>
          <p className="mt-2 text-zinc-600">Revise seus itens e informe o endereço para entrega rápida.</p>
        </div>

        {message.text && (
          <div className={`p-4 rounded-xl mb-8 text-sm font-semibold max-w-2xl mx-auto ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* LADO ESQUERDO: SACOLA DE COMPRAS */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 space-y-6">
            <h2 className="text-xl font-bold text-zinc-900 border-b border-zinc-100 pb-3">Seu Carrinho</h2>
            
            {cartItems.length === 0 ? (
              <p className="text-zinc-500 text-center py-6">Nenhum item na sua sacola de compras.</p>
            ) : (
              <>
                {cartItems.map((item) => (
                  <div key={item._id} className="flex justify-between items-center bg-zinc-50 p-4 rounded-xl border border-zinc-100">
                    <div>
                      <h4 className="font-bold text-zinc-900">{item.name}</h4>
                      <p className="text-sm text-zinc-500 mt-0.5">{formatPrice(item.price)}</p>
                    </div>
                    
                    {/* Controles de Quantidade */}
                    <div className="flex items-center gap-3 bg-white border border-zinc-200 rounded-lg p-1 shadow-sm">
                      <button 
                        type="button"
                        onClick={() => updateQuantity(item._id, -1)}
                        className="w-7 h-7 flex items-center justify-center font-bold text-zinc-600 hover:bg-zinc-100 rounded transition-colors"
                      >
                        -
                      </button>
                      <span className="font-semibold text-zinc-900 w-4 text-center text-sm">{item.quantity}</span>
                      <button 
                        type="button"
                        onClick={() => updateQuantity(item._id, 1)}
                        className="w-7 h-7 flex items-center justify-center font-bold text-zinc-600 hover:bg-zinc-100 rounded transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}

                <div className="border-t border-zinc-100 pt-4 mt-6 flex justify-between items-center text-zinc-900">
                  <span className="text-base font-semibold">Total do Pedido:</span>
                  <span className="text-2xl font-black text-amber-600">{formatPrice(totalValue)}</span>
                </div>
              </>
            )}
          </div>

          {/* LADO DIREITO: FORMULÁRIO DE DADOS E ENTREGA */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100">
            <h2 className="text-xl font-bold text-zinc-900 border-b border-zinc-100 pb-3 mb-6">Informações de Entrega</h2>
            
            <form onSubmit={handleCheckout} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-zinc-700 mb-1.5">Seu Nome</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={clientData.name}
                  onChange={handleInputChange}
                  placeholder="Ex: Erick Seixas"
                  required
                  disabled={cartItems.length === 0}
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all disabled:opacity-50"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-zinc-700 mb-1.5">WhatsApp / Celular</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={clientData.phone}
                  onChange={handleInputChange}
                  placeholder="Ex: 11999999999"
                  required
                  disabled={cartItems.length === 0}
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all disabled:opacity-50"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-semibold text-zinc-700 mb-1.5">Endereço Completo</label>
                <textarea
                  id="address"
                  name="address"
                  rows="3"
                  value={clientData.address}
                  onChange={handleInputChange}
                  placeholder="Rua, número, bloco, apto e ponto de referência"
                  required
                  disabled={cartItems.length === 0}
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all disabled:opacity-50 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading || cartItems.length === 0}
                className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-zinc-300 text-white font-bold py-3.5 px-4 rounded-xl transition-colors shadow-md text-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
              >
                {loading ? 'Enviando Pedido...' : 'Confirmar e Enviar Pedido'}
              </button>
            </form>
          </div>

        </div>
      </div>
    </main>
  );
}