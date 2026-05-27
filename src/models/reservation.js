export function validateReservation(data) {
  const errors = [];

  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 3) {
    errors.push('O nome do responsável é obrigatório e deve ter mais de 3 caracteres.');
  }

  if (!data.phone || data.phone.trim().length < 10) {
    errors.push('O telefone/WhatsApp deve conter um DDD válido.');
  }

  if (!data.date) {
    errors.push('A data da reserva é obrigatória.');
  }

  if (!data.time) {
    errors.push('O horário da reserva é obrigatório.');
  }

  const peopleNum = Number(data.people);
  if (isNaN(peopleNum) || peopleNum < 1 || peopleNum > 10) {
    errors.push('O número de pessoas deve ser entre 1 e 10.');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}