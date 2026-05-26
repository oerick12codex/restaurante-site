import { connectToDatabase } from '../lib/mongodb';

export const orderController = {
  // FUNÇÃO: Salvar um novo pedido vindo do Delivery
  async createOrder(orderData) {
    // Validação de segurança antes de chamar o banco
    if (!orderData.client || !orderData.items || orderData.items.length === 0 || !orderData.total) {
      throw new Error('Dados incompletos. Carrinho ou dados do cliente vazios.');
    }

    const { db } = await connectToDatabase();

    // Estrutura o documento final exatamente como vai para o MongoDB
    const finalOrder = {
      client: {
        name: orderData.client.name.trim(),
        phone: orderData.client.phone.trim(),
        address: orderData.client.address.trim(),
      },
      items: orderData.items.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      total: Number(orderData.total),
      status: 'Pendente', // Status para o painel do restaurante
      createdAt: new Date()
    };

    // Insere na coleção 'orders'
    const result = await db.collection('orders').insertOne(finalOrder);
    return result;
  },

  // FUNÇÃO EXTRA: Listar pedidos (Útil para uma futura tela de Admin/Cozinha)
  async getOrders() {
    const { db } = await connectToDatabase();
    return await db.collection('orders').find({}).sort({ createdAt: -1 }).toArray();
  }
};