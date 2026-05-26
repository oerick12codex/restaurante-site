import { NextResponse } from 'next/server';
import { menuController } from '../../../controllers/menuController';



// Trata requisições do tipo GET (buscar dados)
export async function GET() {
  try {
    // 1. Pede ao controlador para buscar os pratos no banco
    const menuItems = await menuController.getMenu();
    
    // 2. Responde para o front-end enviando a lista em formato JSON com status 200 (Sucesso)
    return NextResponse.json(menuItems, { status: 200 });
  } catch (error) {
    // Se o banco cair ou der erro, responde com status 500 (Erro no Servidor)
    return NextResponse.json({ error: 'Erro ao buscar o cardápio.' }, { status: 500 });
  }
}

// Trata requisições do tipo POST (salvar dados)
export async function POST(request) {
  try {
    // 1. Pega os dados do prato enviados pelo corpo da requisição HTTP
    const body = await request.json();
    
    // 2. Passa os dados para o controlador salvar no banco
    const result = await menuController.createMenuItem(body);
    
    return NextResponse.json({ message: 'Prato adicionado com sucesso!', id: result.insertedId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Erro ao processar requisição.' }, { status: 400 });
  }
}