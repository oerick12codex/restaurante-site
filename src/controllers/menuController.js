import { connectToDatabase } from '../lib/mongodb';
import { validateMenuItem } from '../models/menu';

export const menuController = {
  // FUNÇÃO 1: Buscar todos os pratos do cardápio
  async getMenu() {
    // Liga para o banco de dados através do nosso "telefonista"
    const { db } = await connectToDatabase();
    
    // Acessa a coleção 'menu' e busca todos os documentos ({}) em forma de Array
    const items = await db.collection('menu').find({}).toArray();
    
    return items;
  },

  // FUNÇÃO 2: Adicionar um novo prato (Caso queira criar uma tela de Admin depois)
  async createMenuItem(itemData) {
    // Valida os dados usando o Model que criamos
    const validation = validateMenuItem(itemData);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(' '));
    }

    const { db } = await connectToDatabase();
    
    // Insere o prato na coleção 'menu'
    const result = await db.collection('menu').insertOne(itemData);
    return result;
  }
};