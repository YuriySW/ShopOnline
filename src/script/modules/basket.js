const basketBtn = document.querySelectorAll('.basket-btn');
const basketTitle = document.querySelector('.basket__title');
const basketGoodsCount = document.querySelector('.basket__goods-count');
const BASE_URL = 'https://excited-evanescent-macaroni.glitch.me';
const DEFAULT_IMAGE = `image/not-img.jpg`;

basketBtn.forEach((item) => {
  item.addEventListener('click', () => {
    window.location.href = 'basket.html';
  });
});

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
        basketTotalSum();

        if (!currentItem.countGood) {
          currentItem.countGood = 2;
        } else {
          currentItem.countGood += 1;
        }

        localStorage.setItem('basket', JSON.stringify(basket));
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
        basketTotalSum();

        if (currentItem.countGood && currentItem.countGood > 1) {
          currentItem.countGood -= 1;
        } else {
          currentItem.countGood = 1;
        }

        localStorage.setItem('basket', JSON.stringify(basket));
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

      img.onerror = () => {
        img.src = DEFAULT_IMAGE;
        const picture = img.closest('picture');
        if (picture) {
          picture.querySelectorAll('source').forEach((source) => {
            source.srcset = DEFAULT_IMAGE;
          });
        }
      };
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
      const itemGood = item.countGood ? item.countGood : 1;
      const imageUrl = item.image ? `${BASE_URL}/${item.image}` : DEFAULT_IMAGE;
      const validDiscount = Number(item.discount) || 0;

      const pricePercent = (item.price - (item.price * validDiscount) / 100).toFixed(0);
      const oldPriceSpan = validDiscount
        ? ` <span class="basket__price-old">${item.price} ₽</span>`
        : '';
      const newPrice = validDiscount ? pricePercent : item.price;

      const itemHtml = `
     
               <li class="basket__item" data-id="${item.id}">

                  <input
                    class="basket__checkbox basket__checkbox-choose"
                    type="checkbox"
                    name="all"
                    id="choose-product"
                  />
                  <div class="basket__item-content">
                    <div class="basket__product-info">
                      <picture class="basket__picture">
                   
                        <img
                          loading="lazy"
                          class="basket__image"
                              src="${imageUrl}"
                          alt="ноутбук"
                          width="420"
                          height="295"
                              onerror="this.src='${DEFAULT_IMAGE}'"
                        />
                      </picture>
                      <div class="basket__text">
                        <h2 class="basket__product-title">
                          ${item.title}
                        </h2>
                  
                      </div>
                      <div class="basket__counter">
                        <svg
                          class="basket__counter-minus"
                          aria-label="добавить колличество покупки"
                          tabindex="0"
                          width="36"
                          height="36"
                          viewBox="0 0 36 36"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="18" cy="18" r="17.5" fill="white" stroke="#E8E8E8" />
                          <path d="M14.2 18.088H21.08V19.168H14.2V18.088Z" fill="#8F8F8F" />
                        </svg>
                        <span class="basket__counter-number">${itemGood}</span>
                        <svg
                          class="basket__counter-plus"
                          aria-label="уменьшить колличество покупки"
                          tabindex="0"
                          width="36"
                          height="36"
                          viewBox="0 0 36 36"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="18" cy="18" r="17.5" fill="white" stroke="#E8E8E8" />
                          <path
                            d="M21.48 19.168H18.216V22.608H17.056V19.168H13.808V18.088H17.056V14.672H18.216V18.088H21.48V19.168Z"
                            fill="#2D2D2D"
                          />
                        </svg>
                      </div>
                      <div class="basket__price">
                        <span class="basket__price-current">${newPrice} ₽</span>
                     ${oldPriceSpan}
                        <span class="basket__price-credit">В кредит от 5600 ₽ </span>
                      </div>
                      <button class="basket__delete-btn basket__delete-btn--sub">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          viewBox="0 0 30 30"
                          fill="none"
                        >
                          <g clip-path="url(#clip0_217_1895)">
                            <path
                              d="M19.0214 5.35355L19.1679 5.5H19.375H23.25V7H6.75V5.5H10.625H10.8321L10.9786 5.35355L12.0821 4.25H17.9179L19.0214 5.35355ZM10 25.75C8.90114 25.75 8 24.8489 8 23.75V9.25H22V23.75C22 24.8489 21.0989 25.75 20 25.75H10Z"
                              fill="#C9C9C9"
                              stroke="#C9C9C9"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_217_1895">
                              <rect width="30" height="30" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </button>
                    </div>
                  </div>
                  </li>
                  <div class="basket__stripe basket__stripe--sub"></div>
             
      `;

      basketList.insertAdjacentHTML('beforeend', itemHtml);
      imageSub();
      document.addEventListener('DOMContentLoaded', countGood);
      checkBoxChange();

      updateBasketCount();
    });
  }
}
