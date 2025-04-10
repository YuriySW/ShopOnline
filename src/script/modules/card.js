import {getGoodById} from './api.js';
import {renderCard} from './createElement.js';
import {updateBasketCountSvg} from './basket.js';

if (window.location.pathname.includes('card.html')) {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');

  if (productId) {
    const loadCardGood = async (productId) => {
      try {
        const card = document.querySelector('.card');
        const pageLinkCategory = document.querySelector('.page-link-category');
        const pageLinkTitle = document.querySelector('.page-link-title');

        if (!card) {
          console.error('Контейнер карточки не найден');
          return;
        }

        card.style.opacity = '0';

        if (pageLinkCategory) pageLinkCategory.textContent = '';
        if (pageLinkTitle) pageLinkTitle.textContent = '';

        const good = await getGoodById(productId);

        if (!good) {
          console.error('Товар не найден');
          return;
        }

        if (pageLinkCategory) {
          pageLinkCategory.textContent = good.category;
          pageLinkCategory.style.cursor = 'pointer';
          pageLinkCategory.addEventListener('click', () => {
            window.location.href = `category.html?category=${encodeURIComponent(good.category)}`;
          });
        }

        if (pageLinkTitle) {
          pageLinkTitle.textContent = good.title;
        }

        card.innerHTML = '';
        renderCard(good);

        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transition = 'opacity 0.3s ease-in-out';
        }, 50);

        const addToBasketBtn = document.querySelector('.card__add-basket-btn');
        if (addToBasketBtn) {
          checkBasketStatus(good.id, addToBasketBtn);
          addToBasketBtn.addEventListener('click', () => addToBasket(good, addToBasketBtn));
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
    button.style.backgroundColor = '#5D92E0';
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
    countGood: 1,
  };

  basket.push(product);
  localStorage.setItem('basket', JSON.stringify(basket));
  button.textContent = 'Товар в корзине';
  updateBasketCountSvg();
  button.disabled = true;
};
