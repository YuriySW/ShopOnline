import {renderProductCard} from './createElement.js';
import {productCards, BASE_URL} from './identifier.js';

export const loadGoods = async () => {
  try {
    if (productCards) productCards.innerHTML = '';

    const url = `${BASE_URL}/api/goods`;
    const result = await fetch(url);
    const response = await result.json();

    if (!response.goods || !Array.isArray(response.goods)) {
      console.error('Некорректный формат данных:', response);
      return;
    }

    if (productCards) productCards.innerHTML = '';

    response.goods.forEach(renderProductCard);
  } catch (error) {
    console.error('Ошибка при загрузке товаров:', error);
  }
};

export const getGoodById = async (id) => {
  try {
    const url = `https://excited-evanescent-macaroni.glitch.me/api/goods/${id}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const good = await response.json();

    return good;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const category = async () => {
  try {
    const url = `https://excited-evanescent-macaroni.glitch.me/api/categories`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
