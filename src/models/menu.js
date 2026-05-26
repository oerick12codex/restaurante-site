export function validateMenuItem(data) {
  const errors = [];

  // 1. Valida se o nome existe e é um texto
  if (!data.name || typeof data.name !== 'string') {
    errors.push('O nome do prato é obrigatório e deve ser um texto.');
  }

  // 2. Valida se a descrição existe
  if (!data.description || typeof data.description !== 'string') {
    errors.push('A descrição do prato é obrigatória.');
  }

  // 3. Valida se o preço é um número positivo
  if (typeof data.price !== 'number' || data.price <= 0) {
    errors.push('O preço deve ser um número maior que zero.');
  }

  // 4. Valida se pertence a uma categoria (ex: Entradas, Bebidas)
  if (!data.category || typeof data.category !== 'string') {
    errors.push('A categoria do prato é obrigatória.');
  }

  return {
    isValid: errors.length === 0, // Retorna true se não houver erros
    errors,
  };
}