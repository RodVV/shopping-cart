require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  it('É função', () => {
    expect(typeof fetchProducts).toBe('function');
  })
  it('chamando com o argumento "MLB1615760527"', async () => {
    const test = await fetchProducts('computador');
    expect(fetch).toBeCalledWith(expect.anything());
    expect(fetch).toBeCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
    expect(test).toMatchObject(computadorSearch);
  })
  it('Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro', () => {
    expect(fetchProducts()).resolves.toThrow('You must provide an url');
  })
});
