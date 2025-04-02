import {basketRender, handleImageError} from './createElement.js';
import {
  BASE_URL,
  basketBtn,
  basketTitle,
  basketGoodsCount,
  DEFAULT_IMAGE,
  innerHTML,
} from './identifier.js';

basketBtn.forEach((item) => {
  item.addEventListener('click', () => {
    window.location.href = 'basket.html';
  });
});

export const updateBasketCountSvg = () => {
  const basketData = localStorage.getItem('basket');
  const basket = basketData ? JSON.parse(basketData) : [];
  const basketCountElements = document.querySelectorAll('.basket-count');

  if (!basketCountElements.length) return;

  let totalCount = 0;

  basket.forEach((item) => {
    totalCount += item.countGood;
  });

  basketCountElements.forEach((element) => {
    element.textContent = totalCount;
  });
};

updateBasketCountSvg();

const updateButtonStates = () => {
  const basketCounterMinus = document.querySelectorAll('.basket__counter-minus');
  const basketCounterPlus = document.querySelectorAll('.basket__counter-plus');
  const basketCounterNumbers = document.querySelectorAll('.basket__counter-number');

  const basketData = localStorage.getItem('basket');
  const basket = basketData ? JSON.parse(basketData) : [];

  basketCounterNumbers.forEach((counterNumber, index) => {
    const currentValue = parseInt(counterNumber.textContent, 10) || 0;
    const maxCount = basket[index]?.count || 0;

    if (currentValue <= 1) {
      basketCounterMinus[index].classList.add('disabled-button');
    } else {
      basketCounterMinus[index].classList.remove('disabled-button');
    }

    if (currentValue >= maxCount) {
      basketCounterPlus[index].classList.add('disabled-button');
    } else {
      basketCounterPlus[index].classList.remove('disabled-button');
    }
  });
};

const countGood = () => {
  const basketCounterMinus = document.querySelectorAll('.basket__counter-minus');
  const basketCounterPlus = document.querySelectorAll('.basket__counter-plus');
  const basketCounterNumbers = document.querySelectorAll('.basket__counter-number');

  const basketData = localStorage.getItem('basket');
  const basket = basketData ? JSON.parse(basketData) : [];

  basketCounterPlus.forEach((plusButton, index) => {
    plusButton.addEventListener('click', () => {
      const counterNumber = basketCounterNumbers[index];
      const currentItem = basket[index];

      let currentValue = parseInt(counterNumber.textContent, 10) || 0;
      const maxCount = currentItem.count || 0;

      if (currentValue < maxCount) {
        currentValue += 1;
        counterNumber.textContent = currentValue;

        currentItem.countGood = currentValue;

        localStorage.setItem('basket', JSON.stringify(basket));
        basketTotalSum();
        updateBasketCountSvg();
        updateButtonStates();
      }
    });
  });

  basketCounterMinus.forEach((minusButton, index) => {
    minusButton.addEventListener('click', () => {
      const counterNumber = basketCounterNumbers[index];
      const currentItem = basket[index];

      let currentValue = parseInt(counterNumber.textContent, 10) || 0;

      if (currentValue > 1) {
        currentValue -= 1;
        counterNumber.textContent = currentValue;
        currentItem.countGood = currentValue;

        localStorage.setItem('basket', JSON.stringify(basket));
        basketTotalSum();
        updateBasketCountSvg();
        updateButtonStates();
      }
    });
  });
};

const basketTotalSum = () => {
  const basketSummaryPrice = document.querySelector('.basket__summary-price');
  const basketSummaryValueNotDiscount = document.querySelector(
    '.basket__summary-value-not-discount'
  );
  const basketSummaryDiscount = document.querySelector('.basket__summary-value-all');

  let totalWithDiscount = 0;
  let totalWithoutDiscount = 0;
  let totalDiscount = 0;

  const basketData = localStorage.getItem('basket');
  const basket = basketData ? JSON.parse(basketData) : [];
  const basketCounterNumbers = document.querySelectorAll('.basket__counter-number');

  basket.forEach((item, index) => {
    const countGoodNum = basketCounterNumbers[index];

    if (!countGoodNum) {
      return;
    }

    let countProduct = Number(countGoodNum.textContent || 1);

    let price = item.price * countProduct;

    const validDiscount = Number(item.discount) || 0;
    const priceWithDiscount = price - (price * validDiscount) / 100;
    const priceWithoutDiscount = price;

    totalWithDiscount += priceWithDiscount;
    totalWithoutDiscount += Number(priceWithoutDiscount);
    totalDiscount += price - priceWithDiscount;
  });

  totalWithDiscount = Number(totalWithDiscount.toFixed(2));
  totalWithoutDiscount = Number(totalWithoutDiscount.toFixed(2));
  totalDiscount = Number(totalDiscount.toFixed(2));

  if (basketSummaryPrice) basketSummaryPrice.textContent = `${totalWithDiscount} ₽`;
  if (basketSummaryValueNotDiscount)
    basketSummaryValueNotDiscount.textContent = `${totalWithoutDiscount} ₽`;
  if (basketSummaryDiscount) basketSummaryDiscount.textContent = `${totalDiscount} ₽`;
};

const checkBoxChange = () => {
  const selectAllCheckbox = document.querySelector('.basket__checkbox--all');
  const itemCheckboxes = document.querySelectorAll('.basket__checkbox-choose');

  selectAllCheckbox.addEventListener('change', function () {
    itemCheckboxes.forEach((checkbox) => {
      checkbox.checked = selectAllCheckbox.checked;
    });
  });

  const deleteBtn = document.querySelectorAll('.basket__delete-btn');

  deleteBtn.forEach((item) => {
    item.addEventListener('click', function () {
      const checkedItems = document.querySelectorAll('.basket__checkbox-choose:checked');
      let basket = JSON.parse(localStorage.getItem('basket')) || [];

      checkedItems.forEach((checkbox) => {
        const itemElement = checkbox.closest('.basket__item');
        const itemId = itemElement.dataset.id;

        const stripe = itemElement.nextElementSibling;

        basket = basket.filter((item) => item.id !== itemId);

        if (stripe && stripe.classList.contains('basket__stripe--sub')) {
          stripe.remove();
        }

        itemElement.remove();

        const imageItem = document.querySelector(`.basket__delivery-image[data-id="${itemId}"]`);
        if (imageItem) {
          imageItem.closest('.basket__delivery-image-item').remove();
        }
      });

      localStorage.setItem('basket', JSON.stringify(basket));
      basketTotalSum();
      updateBasketCount();
      updateBasketCountSvg();
      selectAllCheckbox.checked = false;
    });
  });
};

const imageSub = () => {
  const basketDeliveryImages = document.querySelector('.basket__delivery-images');

  const loadDeliveryImages = () => {
    const basketData = localStorage.getItem('basket');
    const basket = basketData ? JSON.parse(basketData) : [];

    basketDeliveryImages.innerHTML = '';

    basket.forEach((item) => {
      const imageUrl = item.image ? `${BASE_URL}/${item.image}` : DEFAULT_IMAGE;

      const listItem = document.createElement('li');
      listItem.classList.add('basket__delivery-image-item');

      listItem.innerHTML = `
      <picture>
  
        <img
        data-id="${item.id}"
          loading="lazy"
          class="basket__delivery-image"
          src="${imageUrl}"
          alt="${item.title}"
          width="420"
          height="295"

        />
      </picture>
    `;

      basketDeliveryImages.appendChild(listItem);

      const img = listItem.querySelector('.basket__delivery-image');
      img.onerror = () => handleImageError(img);
    });
  };

  const marginBasketItem = () => {
    document.addEventListener('DOMContentLoaded', () => {
      const items = document.querySelectorAll('.basket__list .basket__item');

      function setMargin() {
        const screenWidth = window.innerWidth;
        const itemCount = items.length;

        items.forEach((item, index) => {
          if (itemCount === 1) {
            item.style.marginBottom = '0px';
          } else {
            if (screenWidth < 860) {
              item.style.marginBottom = index === items.length - 1 ? '0px' : '20px';
            } else {
              item.style.marginBottom = index === items.length - 1 ? '0px' : '30px';
            }
          }
        });
      }

      setMargin();

      window.addEventListener('resize', setMargin);
    });
  };

  const deleteLastStripe = () => {
    document.addEventListener('DOMContentLoaded', () => {
      const stripes = document.querySelectorAll('.basket__list .basket__stripe--sub');

      if (stripes.length > 0) {
        stripes[stripes.length - 1].style.display = 'none';
      }
    });
  };

  if (window.location.pathname.includes('basket.html')) {
    deleteLastStripe();
    marginBasketItem();
    basketTotalSum();
    loadDeliveryImages();
    updateButtonStates();
  }
};
const updateBasketCount = () => {
  const basket = JSON.parse(localStorage.getItem('basket')) || [];
  const itemCount = basket.length;
  basketTitle.setAttribute('data-number', itemCount);
  basketGoodsCount.textContent = itemCount;
};

const clearBasketIfEmpty = () => {
  const basket = JSON.parse(localStorage.getItem('basket')) || [];

  if (basket.length === 0) {
    const basketList = document.querySelector('.basket__list');
    const basketDeliveryImages = document.querySelector('.basket__delivery-images');
    const basketSummaryPrice = document.querySelector('.basket__summary-price');
    const basketSummaryValueNotDiscount = document.querySelector(
      '.basket__summary-value-not-discount'
    );
    const basketSummaryDiscount = document.querySelector('.basket__summary-value-all');

    if (basketList) basketList.innerHTML = '';
    if (basketDeliveryImages) basketDeliveryImages.innerHTML = '';

    if (basketSummaryPrice) basketSummaryPrice.textContent = '0 ₽';
    if (basketSummaryValueNotDiscount) basketSummaryValueNotDiscount.textContent = '0 ₽';
    if (basketSummaryDiscount) basketSummaryDiscount.textContent = '0 ₽';

    updateBasketCount();
  }
};

if (window.location.pathname.includes('basket.html')) {
  document.addEventListener('DOMContentLoaded', () => {
    clearBasketIfEmpty();
  });
  const data = localStorage.getItem('basket');
  const basket = data ? JSON.parse(data) : [];

  if (basket.length > 0) {
    const basketList = document.querySelector('.basket__list');
    basketList.innerHTML = '';

    basket.forEach((item) => {
      // const itemGood = item.countGood ? item.countGood : 1;
      const itemGood = item.countGood;
      const imageUrl = item.image ? `${BASE_URL}/${item.image}` : DEFAULT_IMAGE;
      const validDiscount = Number(item.discount) || 0;

      const pricePercent = (item.price - (item.price * validDiscount) / 100).toFixed(0);
      const oldPriceSpan = validDiscount
        ? ` <span class="basket__price-old">${item.price} ₽</span>`
        : '';
      const newPrice = validDiscount ? pricePercent : item.price;

      basketRender(
        item.id,
        imageUrl,
        DEFAULT_IMAGE,
        item.title,
        itemGood,
        newPrice,
        oldPriceSpan,
        basketList
      );

      imageSub();
      document.addEventListener('DOMContentLoaded', countGood);
      checkBoxChange();

      updateBasketCount();
    });
  }
}
