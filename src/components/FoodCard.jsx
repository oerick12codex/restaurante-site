import { formatPrice } from '../utils/formatPrice'; // Utilitário de preço caso tenham criado

export default function FoodCard({ item }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col h-full">
      <div className="p-6 flex flex-col flex-grow">
        <span className="text-xs font-semibold tracking-wider text-orange-600 uppercase mb-1">
          {item.category}
        </span>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {item.name}
        </h3>
        <p className="text-gray-600 text-sm flex-grow line-clamp-3">
          {item.description}
        </p>
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-2xl font-black text-green-600">
            R$ {item.price.toFixed(2)}
          </span>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors">
            Pedir Agora
          </button>
        </div>
      </div>
    </div>
  );
}