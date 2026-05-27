export function validateOrder(data) {
  const errors = [];

  if (!data.client || !data.client.name || !data.client.address || !data.client.phone) {
    errors.push('Os dados de entrega do cliente (nome, endereço e telefone) são obrigatórios.');
  }

  if (!data.items || !Array.isArray(data.items) || data.items.length === 0) {
    errors.push('O carrinho não pode estar vazio para fechar o pedido.');
  }

  const totalNum = Number(data.total);
  if (isNaN(totalNum) || totalNum <= 0) {
    errors.push('O valor total do pedido deve ser maior que zero.');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}