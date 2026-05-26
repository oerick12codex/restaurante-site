import { NextResponse } from 'next/server';
import { reservationController } from '../../../controllers/reservationController';

// Método POST para receber agendamentos
export async function POST(request) {
  try {
    const data = await request.json();
    const result = await reservationController.createReservation(data);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Mesa reservada com sucesso! Esperamos você.', 
      reservationId: result.insertedId 
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      message: error.message 
    }, { status: 400 });
  }
}

// Método GET para listar os agendamentos
export async function GET() {
  try {
    const reservations = await reservationController.getReservations();
    return NextResponse.json(reservations, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar reservas.' }, { status: 500 });
  }
}