import { connectToDatabase } from '../lib/mongodb';
import { validateOrder } from '../models/Order'; // 1. Importa o "guarda" (Model do Pedido)

export const orderController = {
  // FUNÇÃO: Criar e salvar um novo pedido de delivery blindado
  async createOrder(orderData) {
    
    // 2. Passa os dados pelo pente fino do Model antes de chamar o banco
    const validation = validateOrder(orderData);
    
    if (!validation.isValid) {
      // Se o carrinho estiver vazio ou faltar endereço, para aqui e joga o erro para a API
      throw new Error(validation.errors.join(' '));
    }

    // 3. Se os dados passaram no teste do Model, abre a conexão com o MongoDB
    const { db } = await connectToDatabase();

    // Organiza a estrutura exata que vai ser gravada na coleção
    const finalOrder = {
      client: {
        name: orderData.client.name.trim(),
        phone: orderData.client.phone.trim(),
        address: orderData.client.address.trim(),
      },
      items: orderData.items.map(item => ({
        name: item.name,
        price: Number(item.price),
        quantity: Number(item.quantity)
      })),
      total: Number(orderData.total),
      status: 'Pendente', // Status inicial para o painel de controle do restaurante
      createdAt: new Date()
    };

    // Insere com segurança na coleção 'orders'
    const result = await db.collection('orders').insertOne(finalOrder);
    return result;
  },

  // FUNÇÃO EXTRA: Listar todos os pedidos (Para a cozinha ou painel do Admin)
  async getOrders() {
    const { db } = await connectToDatabase();
    return await db.collection('orders').find({}).sort({ createdAt: -1 }).toArray();
  }
};