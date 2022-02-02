const fetchProducts = async () => {
  const response = await fetch('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  itemFetch.then((response) => {
    const promiseJson = response.json();
    promiseJson.then((object) => {
      console.log(object);
    });
  });
  // seu código aqui
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
