const fetchProducts = async () => {
  const response = await fetch('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  const object = await response.json();
  console.log(object);  
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
