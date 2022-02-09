function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

// 1. adicione listagem de produtos
async function forEachItems() {
  const waitProducts = await fetchProducts();
  const queryItem = document.querySelector('.items');
  const forEachProduct = waitProducts.results.forEach((result) => {
    queryItem.appendChild(createProductItemElement(result));
  });
  const productObj = forEachProduct;
  return productObj;
}
forEachItems();

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
}

// 2. adicione o produto ao carrinho e compras

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const addItemButt = document.querySelector('.item_add');
const cartItemsOl = document.querySelector('.cart_items');
addItemButt.addEventListener('click', async function (event) {
  const itemSku = document.querySelector('.item_sku').innerHTML;
  const fetchSku = await fetchItem(itemSku);
  cartItemsOl.appendChild(createCartItemElement(fetchSku));
});

window.onload = () => {
  fetchProducts();
  fetchItem();
};
