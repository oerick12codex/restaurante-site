'use client';

import { useState } from 'react';

export default function CadastroClientePage() {
  // Estados para monitorar o formulário
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Atualiza os campos dinamicamente conforme o usuário digita
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Envia os dados para a nossa API interna
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Erro ao realizar o cadastro.');
      }

      // Se deu certo, limpa o formulário e avisa o usuário
      setMessage({ type: 'success', text: result.message });
      setFormData({ name: '', email: '', phone: '' });

    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-zinc-100 p-8 w-full max-w-md">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-zinc-900">Crie sua Conta</h1>
          <p className="text-zinc-500 mt-2">Cadastre-se para acompanhar seus pedidos e acumular pontos de fidelidade!</p>
        </div>

        {/* Alertas de Feedback para o usuário */}
        {message.text && (
          <div className={`p-4 rounded-xl mb-6 text-sm font-medium ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Campo Nome */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-zinc-700 mb-1.5">
              Nome Completo
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ex: Erick Seixas"
              required
              className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
            />
          </div>

          {/* Campo E-mail */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-zinc-700 mb-1.5">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="seuemail@exemplo.com"
              required
              className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
            />
          </div>

          {/* Campo Telefone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-zinc-700 mb-1.5">
              WhatsApp / Telefone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Ex: 11999999999"
              required
              className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
            />
          </div>

          {/* Botão de Envio */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-zinc-900 hover:bg-zinc-800 disabled:bg-zinc-400 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-900 text-center"
          >
            {loading ? 'Cadastrando...' : 'Finalizar Cadastro'}
          </button>
        </form>
      </div>
    </main>
  );
}