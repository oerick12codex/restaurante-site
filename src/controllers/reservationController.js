import { connectToDatabase } from '../lib/mongodb';
import { validateReservation } from '../models/Reservation'; // 1. Importa o "guarda" (Model)

export const reservationController = {
  // FUNÇÃO: Criar uma nova reserva de mesa protegida
  async createReservation(reservationData) {
    
    // 2. Passa os dados pelo pente fino do Model antes de gastar conexão com o banco
    const validation = validateReservation(reservationData);
    
    if (!validation.isValid) {
      // Se tiver erro de validação (ex: data faltando), para o código aqui e avisa a API
      throw new Error(validation.errors.join(' '));
    }

    // 3. Se os dados passaram no teste, o controlador abre o banco e salva com segurança
    const { db } = await connectToDatabase();

    const finalReservation = {
      name: reservationData.name.trim(),
      phone: reservationData.phone.trim(),
      date: reservationData.date, // Formato YYYY-MM-DD
      time: reservationData.time, // Formato HH:MM
      people: Number(reservationData.people),
      status: 'Confirmada',
      createdAt: new Date()
    };

    const result = await db.collection('reservations').insertOne(finalReservation);
    return result;
  },

  // FUNÇÃO EXTRA: Listar todas as reservas (Mantém igual para o gerente usar)
  async getReservations() {
    const { db } = await connectToDatabase();
    return await db.collection('reservations').find({}).sort({ date: 1, time: 1 }).toArray();
  }
};