import { NextResponse } from 'next/server';
import { orderController } from '../../../controllers/orderController';

// Método POST para receber novos pedidos
export async function POST(request) {
  try {
    const data = await request.json();
    
    // Passa a responsabilidade para o Controller fazer o trabalho sujo
    const result = await orderController.createOrder(data);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Pedido realizado com sucesso!', 
      orderId: result.insertedId 
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      message: error.message 
    }, { status: 400 });
  }
}

// Método GET opcional (Caso queiras listar os pedidos no navegador)
export async function GET() {
  try {
    const orders = await orderController.getOrders();
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar pedidos.' }, { status: 500 });
  }
}