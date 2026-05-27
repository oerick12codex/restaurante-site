import { connectToDatabase } from '../lib/mongodb';
import { validateClient } from '../models/Client';

export const clientController = {
  // FUNÇÃO 1: Cadastrar um novo cliente
  async createClient(clientData) {
    // Passa os dados pelo pente fino do Model
    const validation = validateClient(clientData);
    
    if (!validation.isValid) {
      throw new Error(validation.errors.join(' '));
    }

    const { db } = await connectToDatabase();

    // Organiza os dados e adiciona a data de cadastro automaticamente
    const finalData = {
      name: clientData.name.trim(),
      email: clientData.email.trim().toLowerCase(),
      phone: clientData.phone.trim(),
      createdAt: new Date()
    };

    // Insere na coleção 'clients'
    const result = await db.collection('clients').insertOne(finalData);
    return result;
  },

  // FUNÇÃO 2: Buscar todos os clientes (Útil para uma tela de Admin)
  async getClients() {
    const { db } = await connectToDatabase();
    const clients = await db.collection('clients').find({}).sort({ createdAt: -1 }).toArray();
    return clients;
  }
};