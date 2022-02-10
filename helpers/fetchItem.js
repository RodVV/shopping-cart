async function fetchItem(idItem) {
  try {
  const fetchApiItem = await fetch(`https://api.mercadolibre.com/items/${idItem}`);
  const apiJson = await fetchApiItem.json();
  return apiJson;  
} catch (error) {
  return error;
}
}

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
