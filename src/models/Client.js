export function validateClient(data) {
  const errors = [];

  // 1. Valida o nome
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 3) {
    errors.push('O nome do cliente é obrigatório e deve ter pelo menos 3 caracteres.');
  }

  // 2. Valida o e-mail (usando uma expressão regular simples)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.push('Insira um endereço de e-mail válido.');
  }

  // 3. Valida o telefone/WhatsApp
  if (!data.phone || typeof data.phone !== 'string' || data.phone.trim().length < 10) {
    errors.push('O telefone/WhatsApp é obrigatório e deve conter DDD (ex: 11999999999).');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}