'use client';

import { useState } from 'react';

export default function ReservasPage() {
  const [formData, setFormData] = useState({ name: '', phone: '', date: '', time: '', people: '2' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message || 'Erro ao processar reserva.');

      setMessage({ type: 'success', text: result.message });
      setFormData({ name: '', phone: '', date: '', time: '', people: '2' });

    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-50 flex items-center justify-center p-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl border border-zinc-100 p-8 w-full max-w-md">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-zinc-900">Reserve uma Mesa</h1>
          <p className="text-zinc-500 mt-2">Planeje seu almoço ou jantar especial conosco de forma rápida.</p>
        </div>

        {message.text && (
          <div className={`p-4 rounded-xl mb-6 text-sm font-medium ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-1">Nome Responsável</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ex: Erick Seixas"
              required
              className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-1">WhatsApp de Contato</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Ex: 11999999999"
              required
              className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-zinc-700 mb-1">Data</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-zinc-700 mb-1">Horário</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-1">Número de Pessoas</label>
            <select
              name="people"
              value={formData.people}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                <option key={num} value={num}>{num} {num === 1 ? 'Pessoa' : 'Pessoas'}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-zinc-900 hover:bg-zinc-800 disabled:bg-zinc-400 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-md mt-2"
          >
            {loading ? 'Agendando...' : 'Garantir Minha Mesa'}
          </button>
        </form>
      </div>
    </main>
  );
}