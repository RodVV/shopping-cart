async function fetchProducts() {
  const compQuery = 'computador';
  const fetchApi = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${compQuery}`);
  const apiJson = await fetchApi.json();
  return apiJson;
}

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
