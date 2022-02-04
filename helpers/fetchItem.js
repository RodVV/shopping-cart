async function fetchItem(idItem = 'MLB1341706310') {
  const fetchApiItem = await fetch(`https://api.mercadolibre.com/items/${idItem}`);
  const apiJson = await fetchApiItem.json();
  return apiJson;  
}

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
