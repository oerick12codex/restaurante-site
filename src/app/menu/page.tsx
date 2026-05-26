'use client';

import { useEffect, useState } from 'react';
import FoodCard from '../../components/FoodCard';

// Definição do formato do prato para evitar erros
interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

export default function CardapioPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // 🧠 Consome a API que você acabou de testar no localhost!
    async function fetchMenu() {
      try {
        const response = await fetch('/api/menu');
        if (!response.ok) throw new Error();
        const data = await response.json();
        setMenuItems(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchMenu();
  }, []);

  if (loading) return <div className="text-center py-20 font-bold text-xl text-orange-500">Carregando o cardápio de alta performance...</div>;
  if (error) return <div className="text-center py-20 font-bold text-red-500">Ops! Houve um erro ao carregar o cardápio.</div>;

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Nosso Cardápio Dinâmico
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Pratos preparados na hora com ingredientes selecionados e integrados com MongoDB Atlas!
          </p>
        </div>

        {/* Grid de pratos puxados do banco */}
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {menuItems.map((prato) => (
            <FoodCard key={prato._id} item={prato} />
          ))}
        </div>
      </div>
    </main>
  );
}