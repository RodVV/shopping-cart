require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('Teste a função fecthItem', () => {
  it('se fetchItem e uma funcao', () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('Execute a função fetchItem com o argumento do item "MLB1615760527"', async() => {
    const url = await fetchItem('MLB1615760527');
    expect(fetch).toBeCalledWith(expect.anything());
    expect(fetch).toBeCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
    expect(url).toMatchObject(item); 
  })
  it('Teste se, ao chamar a função fetchItem sem argumento, retorna um erro', async () => {
    await expect(fetchItem()).rejects.toThrowError('You must provide an url');
  })
});
