'use client'; // Avisa ao Next.js que esta página usa interatividade do React (hooks)

import { useEffect, useState } from 'react';
import FoodCard from '../../components/FoodCard'; // Importa o componente visual de cada prato

export default function CardapioPage() {
  // 1. ESTADOS DA PÁGINA (Variáveis de controle)
  // menuItems: começa como uma lista vazia [] onde vamos guardar os pratos vindos do banco
  const [menuItems, setMenuItems] = useState([]);
  // loading: controla a mensagem de "Carregando...". Começa como TRUE (ativo)
  const [loading, setLoading] = useState(true);
  // error: controla o aviso de falha. Começa como FALSE (desativado)
  const [error, setError] = useState(false);

  // 2. EFEITO COLATERAL (Dispara assim que a página abre no navegador)
  useEffect(() => {
    // Função assíncrona para buscar os dados na nossa API
    async function fetchMenu() {
      try {
        // Faz a requisição HTTP GET para a rota que você consertou e conectou ao Atlas
        const response = await fetch('/api/menu');
        
        // Se a rota falhar (status diferente de 200), joga o código direto para o catch
        if (!response.ok) throw new Error();
        
        // Transforma a resposta bruta em dados JSON (a lista de hambúrgueres)
        const data = await response.json();
        
        // Guarda a lista de pratos dentro do nosso estado menuItems
        setMenuItems(data);
      } catch (err) {
        // Se a internet cair ou a API falhar, ativa o estado de erro
        setError(true);
      } finally {
        // Independentemente de dar certo ou errado, desativa o "Carregando..."
        setLoading(false);
      }
    }
    
    // Executa a função de busca
    fetchMenu();
  }, []); // Os colchetes vazios [] garantem que essa busca só rode uma vez ao abrir a tela

  // 3. RENDERIZAÇÕES CONDICIONAIS (HTML de transição)
  // Se ainda estiver carregando, mostra apenas essa tag centralizada em laranja
  if (loading) {
    return (
      <div className="text-center py-20 font-bold text-xl text-orange-500">
        Carregando o cardápio de alta performance...
      </div>
    );
  }

  // Se der erro de conexão, mostra apenas essa tag centralizada em vermelho
  if (error) {
    return (
      <div className="text-center py-20 font-bold text-red-500">
        Ops! Houve um erro ao carregar o cardápio.
      </div>
    );
  }

  // 4. ESTRUTURA HTML PRINCIPAL DA PÁGINA
  return (
    // <main> indica o conteúdo principal e central da página (Bom para o SEO do Google)
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Container estrutural para limitar a largura máxima do conteúdo */}
      <div className="max-w-7xl mx-auto">
        
        {/* Cabeçalho da página (Título e Subtítulo) */}
        <div className="text-center mb-12">
          {/* <h1> é o título principal e mais importante da página */}
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Peça sua comida para hoje
          </h1>
          {/* <p> é usado para blocos de texto comuns/parágrafos */}
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            suculencia e sabor em um lugar só
          </p>
        </div>

        {/* Grid invisível para organizar as colunas do cardápio */}
        {/* 'grid' ativa o posicionamento em grade. Ele mostra 1 coluna no celular, 2 no tablet e 3 em telas grandes */}
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          
          {/* LOOP DINÂMICO (A mágica do React/JSX) */}
          {/* O .map passa por cada prato dentro do array e cria um componente <FoodCard /> para ele */}
          {menuItems.map((prato) => (
            // Passamos o prato encontrado para dentro da propriedade 'item' do componente FoodCard
            // A propriedade 'key' é obrigatória no React e recebe o _id único do MongoDB para indexação rápida
            <FoodCard key={prato._id} item={prato} />
          ))}
          
        </div>
      </div>
    </main>
  );
}