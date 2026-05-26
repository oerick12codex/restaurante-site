import { connectToDatabase } from '../lib/mongodb';

export const reservationController = {
  // FUNÇÃO: Criar uma nova reserva de mesa
  async createReservation(reservationData) {
    // Validação básica de segurança
    if (!reservationData.name || !reservationData.phone || !reservationData.date || !reservationData.time || !reservationData.people) {
      throw new Error('Todos os campos são obrigatórios para realizar a reserva.');
    }

    const { db } = await connectToDatabase();

    // Organiza a estrutura que vai para o MongoDB
    const finalReservation = {
      name: reservationData.name.trim(),
      phone: reservationData.phone.trim(),
      date: reservationData.date, // Formato YYYY-MM-DD
      time: reservationData.time, // Formato HH:MM
      people: Number(reservationData.people),
      status: 'Confirmada', // Status padrão inicial
      createdAt: new Date()
    };

    const result = await db.collection('reservations').insertOne(finalReservation);
    return result;
  },

  // FUNÇÃO EXTRA: Listar todas as reservas (Útil para o gerente do restaurante)
  async getReservations() {
    const { db } = await connectToDatabase();
    return await db.collection('reservations').find({}).sort({ date: 1, time: 1 }).toArray();
  }
};