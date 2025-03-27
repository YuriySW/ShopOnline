import {getGoodById} from './api.js';
import {renderCard} from './createElement.js';

if (window.location.pathname.includes('card.html')) {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');

  if (productId) {
    const loadCardGood = async (productId) => {
      try {
        const good = await getGoodById(productId);

        if (!good) {
          console.error('Товар не найден');
          return;
        }

        let pageLinkCategory = document.querySelector('.page-link-category');
        let pageLinkTitle = document.querySelector('.page-link-title');

        pageLinkCategory.addEventListener('click', () => {
          window.location.href = `category.html?category=${encodeURIComponent(good.category)}`;
        });

        pageLinkCategory.style.cursor = 'pointer';

        pageLinkCategory.textContent = good.category;
        pageLinkTitle.textContent = good.title;

        const card = document.querySelector('.card');
        if (!card) {
          console.error('Контейнер карточки не найден');
          return;
        }
        card.innerHTML = '';

        renderCard(good);

        const addToBasketBtn = document.querySelector('.card__add-basket-btn');
        if (addToBasketBtn) {
          checkBasketStatus(good.id, addToBasketBtn);
          addToBasketBtn.addEventListener('click', () => addToBasket(good, addToBasketBtn));
        } else {
        }
      } catch (error) {
        console.error('Ошибка при загрузке товара:', error);
      }
    };

    loadCardGood(productId);
  }
}

const checkBasketStatus = (productId, button) => {
  let basket = JSON.parse(localStorage.getItem('basket')) || [];
  const isInBasket = basket.some((item) => item.id === productId);

  if (isInBasket) {
    button.textContent = 'Товар в корзине';
    button.disabled = true;
  }
};

const addToBasket = (good, button) => {
  let basket = JSON.parse(localStorage.getItem('basket')) || [];

  const isInBasket = basket.some((item) => item.id === good.id);
  if (isInBasket) return;

  const product = {
    id: good.id,
    image: good.image,
    title: good.title,
    price: good.price,
    discount: good.discount || 0,
    description: good.description,
    count: good.count,
    category: good.category,
  };

  basket.push(product);
  localStorage.setItem('basket', JSON.stringify(basket));

  button.textContent = 'Товар в корзине';
  button.disabled = true;
};
