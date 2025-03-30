import {category, loadGoods} from './api.js';
import {renderProductCard} from './createElement.js';
import {productCards, BASE_URL} from './identifier.js';

const items = document.querySelectorAll('.blogs__item');
const productTitle = document.querySelector('.product__title');
const logo = document.querySelector('.logo');

logo.addEventListener('click', () => {
  window.location.href = 'index.html';
});

export const clearItem = () => {
  items.forEach((item) => {
    item.remove();
  });
};

clearItem();

export const loadBlogs = async () => {
  const result = await fetch('https://gorest.co.in/public-api/posts');
  const response = await result.json();
  const blogsData = response.data;
  const blogsList = document.querySelector('.blogs__list');

  if (blogsList) {
    blogsData.forEach((post, index) => {
      const li = document.createElement('li');
      li.className = 'blogs__item';

      const link = document.createElement('a');
      link.href = '#';
      link.className = 'blogs__link';
      link.setAttribute('aria-label', `Читать статью: ${post.title}`);

      link.innerHTML = `
        <img class="blogs__img" src="https://loremflickr.com/400/400?${index + 1}" alt="${
        post.title
      }" />
        <h2 class="blogs__title">${post.title}</h2>
      `;

      link.addEventListener('click', (e) => {
        e.preventDefault();

        sessionStorage.setItem('selectedTitle', post.title);

        sessionStorage.setItem('selectedText', post.body);

        window.location.href = 'articlePage.html';
      });

      li.appendChild(link);
      blogsList.appendChild(li);
    });
  }
};

export const renderArticlePage = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const titlePage = document.querySelector('.title-page');
    const selectedTitle = sessionStorage.getItem('selectedTitle');
    const selectedText = sessionStorage.getItem('selectedText');
    const pageLinkTitle = document.querySelector('.page-link-title');
    const textPageWrap = document.querySelector('.text-page-wrap');
    const backBtn = document.querySelector('.back-btn');

    document.querySelectorAll('.text-page').forEach((item) => item.remove());

    if (titlePage && selectedTitle) {
      titlePage.textContent = selectedTitle;
      pageLinkTitle.textContent = selectedTitle;
    }

    if (textPageWrap && selectedText) {
      const p = document.createElement('p');
      p.className = 'text-page';
      p.textContent = selectedText;
      textPageWrap.appendChild(p);
    }

    if (backBtn) {
      backBtn.addEventListener('click', () => {
        window.location.href = 'blog.html';
      });
    }
  });
};

loadBlogs();
renderArticlePage();

const getCategories = async () => {
  const categories = await category();
  const footerListCatalogs = document.querySelectorAll('.footer__list_catalog');

  footerListCatalogs.forEach((list) => {
    list.innerHTML = '';

    categories.forEach((categoryName) => {
      const li = document.createElement('li');
      li.classList.add('footer__item');

      const link = document.createElement('a');
      link.classList.add('footer__link');
      link.href = `category.html?category=${encodeURIComponent(categoryName)}`;
      link.textContent = categoryName;

      if (list.previousElementSibling?.classList.contains('footer__title_bm')) {
        link.classList.add('footer__link_bm');
      }

      li.appendChild(link);
      list.appendChild(li);
    });
  });
};

getCategories();

const getQueryParam = (param) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
};

const loadCategoryGoods = async () => {
  const category = getQueryParam('category');
  if (!category) {
    console.error('Категория не найдена в URL');
    return;
  }
  if (productTitle) productTitle.textContent = '';
  if (productCards) productCards.innerHTML = '';

  try {
    const url = `${BASE_URL}/api/goods`;
    const result = await fetch(url);
    const response = await result.json();

    if (productTitle) productTitle.textContent = category;

    if (productCards) productCards.innerHTML = '';

    const filteredGoods = response.goods.filter((item) => item.category === category);

    if (filteredGoods.length === 0) {
      console.error('Товары этой категории не найдены');
      return;
    }

    filteredGoods.forEach(renderProductCard);
  } catch (error) {
    console.error('Ошибка при загрузке товаров:', error);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const categoryParam = getQueryParam('category');

  if (categoryParam) {
    loadCategoryGoods();
  } else {
    loadGoods();
  }
});

document.addEventListener('click', (event) => {
  const link = event.target.closest('.product__link');
  if (!link) return;

  const productCard = link.closest('.product__card');
  if (!productCard) return;

  const productId = productCard.dataset.id;
  if (!productId) return;

  event.preventDefault();
  window.location.href = `card.html?id=${productId}`;
});
