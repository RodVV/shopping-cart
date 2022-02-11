let arrayCartItems = [];
const cartItems = document.querySelector('.cart__items');

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

// 7. Adicione um texto de "carregando" durante uma requisição à API
const loading = document.createElement('span');
loading.className = 'loading';
loading.innerText = 'loading';
const containerTitle = document.querySelector('.container-title');
containerTitle.appendChild(loading);

function loaded() {
  loading.remove();
}

// 1. adicione listagem de produtos
async function forEachItems() {
  const waitProducts = await fetchProducts();
  const queryItem = document.querySelector('.items');
  waitProducts.results.forEach((result) => {
    queryItem.appendChild(createProductItemElement(result));
  });
  return loaded();
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

// 3. remova o item do carrinho de compras

function cartItemClickListener(event) {
  // coloque seu código aqui
  event.target.remove();
}

// 2. adicione o produto ao carrinho e compras

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function createElementsCart(event) {
  const itemSku = getSkuFromProductItem(event.target.parentNode);
  const fetchSku = await fetchItem(itemSku);
  const { id, title, price } = fetchSku;
    arrayCartItems.push({ id, title, price });
    cartItems.appendChild(createCartItemElement(fetchSku));
    saveCartItems(JSON.stringify(arrayCartItems));
}

async function prepararItemsCart() {
  const items = document.querySelectorAll('.item');
  items.forEach((item) => { 
  const buttAdd = item.querySelector('button.item__add');
  buttAdd.addEventListener('click', createElementsCart);
});
  // const cartItems = document.querySelector('.cart__items');
  // if (evento.target.classList.contains('item__add')) {
  //   const itemSku = getSkuFromProductItem(evento.target.parentNode); 
  //   const fetchSku = await fetchItem(itemSku);
  //   const { id, title, price } = fetchSku;
  //   arrayCartItems.push({ id, title, price });
  //   saveCartItems(JSON.stringify(arrayCartItems));
  //   cartItems.appendChild(createCartItemElement(fetchSku));
  //   }
}

// items.addEventListener('click', () {
//   prepararItemsCart();
//   }
// );

// 5. Some o valor total dos itens do carrinho de compras
// const totalDiv = document.querySelector('.total-price');
// const valorTotal = () => {
//   const valor = 0;
// };

// 6. Implemente a lógica no botão Esvaziar carrinho para limpar o carrinho de compras
const emptyButt = document.querySelector('.empty-cart');
emptyButt.addEventListener('click', () => {
  cartItems.innerHTML = '';
});

// localStorage.removeItem('cartItems');
function recarregaCart() {
  arrayCartItems = JSON.parse(localStorage.getItem('cartItems'));
  arrayCartItems.forEach((item) => cartItems.appendChild(createCartItemElement(item)));

  // console.log(arrayCartItems);
}

window.onload = () => {
  forEachItems().then(prepararItemsCart);
  if (localStorage.getItem('cartItems') === null) {
    localStorage.setItem('cartItems', JSON.stringify([]));
  }
  recarregaCart();
};
