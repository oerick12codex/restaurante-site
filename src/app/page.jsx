import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-50 flex flex-col justify-between">
      
      {/* 1. SEÇÃO HERO (Banner Principal) */}
      <section className="relative bg-zinc-900 text-white py-24 px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center flex-grow">
        <div className="absolute inset-0 bg-black opacity-40 pointer-events-none"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="text-amber-500 font-bold uppercase tracking-widest text-sm bg-amber-500/10 px-4 py-1.5 rounded-full">
            Alta Performance Gourmet
          </span>
          <h1 className="mt-6 text-4xl font-extrabold sm:text-6xl tracking-tight text-white">
            Sabores Únicos Integrados na Nuvem
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-zinc-300 max-w-2xl mx-auto">
            Descubra uma experiência gastronômica impecável com pratos preparados na hora e ingredientes premium.
          </p>
          
          {/* 🔥 Botões de Chamada para Ação (CTAs) - Agora com Delivery e Reserva inclusos */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link 
              href="/menu" 
              className="px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-xl border border-zinc-700 transition-all transform hover:-translate-y-0.5"
            >
              📖 Ver Cardápio
            </Link>

            <Link 
              href="/delivery" 
              className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              🚀 Pedir Delivery
            </Link>

            <Link 
              href="/reservas" 
              className="px-8 py-4 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              🪑 Reservar Mesa
            </Link>
            
            <Link 
              href="/cadastro" 
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 backdrop-blur-sm transition-all transform hover:-translate-y-0.5"
            >
              🔑 Criar Conta Cliente
            </Link>
          </div>
        </div>
      </section>

      {/* 2. SEÇÃO DE RESERVAS (Chamada dedicada para agendamento) */}
      <section className="bg-zinc-100 py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-zinc-200">
          <div className="text-amber-500 text-4xl mb-3">🍷</div>
          <h2 className="text-2xl font-bold text-zinc-900 mb-2">Planeje seu Almoço ou Jantar</h2>
          <p className="text-zinc-600 text-sm mb-6">
            Evite filas e garanta uma mesa exclusiva para você, sua família ou amigos. Nosso sistema de agendamento garante sua mesa em poucos cliques.
          </p>
          <Link
            href="/reservas"
            className="inline-block bg-zinc-950 hover:bg-zinc-850 text-white font-semibold py-3 px-6 rounded-xl transition-all"
          >
            Agendar uma Mesa agora
          </Link>
        </div>
      </section>

      {/* 3. SEÇÃO DE INFORMAÇÕES (Endereço e Horários) */}
      <section className="bg-white border-t border-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-center md:text-left">
          
          {/* Horários */}
          <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100">
            <h3 className="text-lg font-bold text-zinc-900 flex items-center justify-center md:justify-start gap-2 mb-3">
              🕒 Horário de Funcionamento
            </h3>
            <p className="text-zinc-600 text-sm leading-relaxed">
              Terça a Quinta: <span className="font-semibold text-zinc-800">18h às 23h</span> <br />
              Sexta a Domingo: <span className="font-semibold text-zinc-800">18h às 00h</span> <br />
              <span className="text-xs text-amber-600 font-medium">Segunda-feira: Fechado</span>
            </p>
          </div>

          {/* Localização */}
          <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100">
            <h3 className="text-lg font-bold text-zinc-900 flex items-center justify-center md:justify-start gap-2 mb-3">
              📍 Onde Estamos
            </h3>
            <p className="text-zinc-600 text-sm leading-relaxed">
              Avenida da Gastronomia High-Tech, nº 102 <br />
              Bairro do MongoDB Atlas, Nuvem <br />
              <span className="text-xs text-zinc-400">Estacionamento gratuito no local</span>
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}