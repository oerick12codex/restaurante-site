import { NextResponse } from 'next/server';
import { clientController } from '../../../controllers/clientController';

// Trata o recebimento do formulário (POST)
export async function POST(request) {
    
    
    try {
    const data = await request.json();
    const result = await clientController.createClient(data);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Cliente cadastrado com sucesso!', 
      clientId: result.insertedId 
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      message: error.message 
    }, { status: 400 });
  }
}

// Trata a listagem de clientes (GET)
export async function GET() {
  try {
    const clients = await clientController.getClients();
    return NextResponse.json(clients, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar clientes.' }, { status: 500 });
  }
}