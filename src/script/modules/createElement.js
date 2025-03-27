const productCards = document.querySelector('.product__cards');
const card = document.querySelector('.card');

const BASE_URL = 'https://excited-evanescent-macaroni.glitch.me';
const DEFAULT_IMAGE = `/image/not-img.jpg`;

export const renderProductCard = ({id, image, title, price, discount}) => {
  const validDiscount = Number(discount) || 0;
  const imageUrl = image ? `${BASE_URL}/${image}` : DEFAULT_IMAGE;

  const discountSpan = validDiscount
    ? `<span class="product__discount" aria-live="polite">-${validDiscount}%</span>`
    : '';

  const pricePercent = (price - (price * validDiscount) / 100).toFixed(0);
  const oldPriceSpan = validDiscount ? `<span class="product__old-price">${price}₽</span>` : '';
  const newPrice = validDiscount ? pricePercent : price;

  const productHTML = `
     <li class="product__card" data-id="${id}">
       <a class="product__link" href="#">
         <div class="product__wrap">
           ${discountSpan}
        
             <img
               loading="lazy"
               src="${imageUrl}"
               class="product__img"
               alt="${title}"
               width="420"
               height="295"
             />
         
         </div>
         <div class="product__price-wrap">
           <span class="product__price">${newPrice} ₽</span>
           ${oldPriceSpan}
         </div>
         <span class="product__name">${title}</span>
       </a>
     </li>
   `;

  productCards.insertAdjacentHTML('beforeend', productHTML);

  const lastCard = productCards.lastElementChild;
  const img = lastCard.querySelector('img');

  img.onerror = () => {
    img.src = DEFAULT_IMAGE;
    const picture = img.closest('picture');
    if (picture) {
      picture.querySelectorAll('source').forEach((source) => {
        source.srcset = DEFAULT_IMAGE;
      });
    }
  };
};

export const renderCard = ({id, image, title, price, discount, description, count}) => {
  const validDiscount = Number(discount) || 0;
  const imageUrl = image ? `${BASE_URL}/${image}` : DEFAULT_IMAGE;

  const discountSpan = validDiscount
    ? `<span class="card__discount-cr" aria-live="polite">${validDiscount}%</span>`
    : '';

  const pricePercent = (price - (price * validDiscount) / 100).toFixed(0);
  const oldPriceSpan = validDiscount
    ? `  <span class="card__product-price-sub">${price} ₽</span>`
    : '';
  const newPrice = validDiscount ? pricePercent : price;

  const cardHtml = `
          <h1 class="card__title" data-id="${id}">${title}</h1>
          <div class="card__stripe"></div>
          <div class="card__wrapper">
            <div class="card__img-wrap">
                 ${discountSpan}
              <picture>
             
                <img
                  loading="lazy"
                  class="card__image"
                   src="${imageUrl}"
                  alt="${title}"
                  width="757"
                  height="427"
                />
              </picture>
            </div>
            <div class="card__shadow">
              <div class="card__product-card">
                <div class="card__price-wrap">
                  <span class="card__product-price">${newPrice} ₽</span>
                      ${oldPriceSpan}
                
                </div>
                <a href="" class="card__credit-link">В кредит от 5600 ₽ </a>
                <div class="card__favorite-wrap">
                  <button class="card__add-basket-btn" aria-label="добавить в корзину">
                    Добавить в корзину
                  </button>
                  <svg
                    class="card__favorite-ico"
                    aria-label="добавить в избранное"
                    tabindex="0"
                    width="33"
                    height="33"
                    viewBox="0 0 33 33"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_901_1437)">
                      <path
                        d="M22.6875 4.125C20.295 4.125 17.9987 5.23875 16.5 6.99875C15.0012 5.23875 12.705 4.125 10.3125 4.125C6.0775 4.125 2.75 7.4525 2.75 11.6875C2.75 16.885 7.425 21.12 14.5062 27.555L16.5 29.3563L18.4937 27.5413C25.575 21.12 30.25 16.885 30.25 11.6875C30.25 7.4525 26.9225 4.125 22.6875 4.125ZM16.6375 25.5062L16.5 25.6437L16.3625 25.5062C9.8175 19.58 5.5 15.6613 5.5 11.6875C5.5 8.9375 7.5625 6.875 10.3125 6.875C12.43 6.875 14.4925 8.23625 15.2212 10.12H17.7925C18.5075 8.23625 20.57 6.875 22.6875 6.875C25.4375 6.875 27.5 8.9375 27.5 11.6875C27.5 15.6613 23.1825 19.58 16.6375 25.5062Z"
                        fill="#3670C7"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_901_1437">
                        <rect width="33" height="33" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
 
                <div class="card__delivery-wrap">
                  <div class="card__delivery-wrap-sub">
                    <span class="card__delivery-text">Доставка</span>
                    <span class="card__delivery-text-sub">1-3 января</span>
                  </div>
                  <div class="card__delivery-wrap-sub">
                    <span class="card__delivery-text">Продавец</span>
                    <span class="card__delivery-text-sub">ShopOnline</span>
                  </div>
                </div>
                <div class="card__notice-wrap">
                  <svg
                    class="card__notice-ico"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M19 13.586V10C19 6.783 16.815 4.073 13.855 3.258C13.562 2.52 12.846 2 12 2C11.154 2 10.438 2.52 10.145 3.258C7.185 4.074 5 6.783 5 10V13.586L3.293 15.293C3.19996 15.3857 3.12617 15.4959 3.07589 15.6172C3.0256 15.7386 2.99981 15.8687 3 16V18C3 18.2652 3.10536 18.5196 3.29289 18.7071C3.48043 18.8946 3.73478 19 4 19H20C20.2652 19 20.5196 18.8946 20.7071 18.7071C20.8946 18.5196 21 18.2652 21 18V16C21.0002 15.8687 20.9744 15.7386 20.9241 15.6172C20.8738 15.4959 20.8 15.3857 20.707 15.293L19 13.586ZM19 17H5V16.414L6.707 14.707C6.80004 14.6143 6.87383 14.5041 6.92412 14.3828C6.9744 14.2614 7.00019 14.1313 7 14V10C7 7.243 9.243 5 12 5C14.757 5 17 7.243 17 10V14C17 14.266 17.105 14.52 17.293 14.707L19 16.414V17ZM12 22C12.6193 22.0008 13.2235 21.8086 13.7285 21.4502C14.2335 21.0917 14.6143 20.5849 14.818 20H9.182C9.38566 20.5849 9.76648 21.0917 10.2715 21.4502C10.7765 21.8086 11.3807 22.0008 12 22Z"
                      fill="#3670C7"
                    />
                  </svg>
                  <span class="card__notice-text">Узнать о снижении цены</span>
                </div>
              </div>
            </div>
          </div>
          <div class="card__description">
            <h2 class="card__description-title">Описание:</h2>
            <p class="card__description-text">
           ${description}
            </p>
          </div>
        `;

  card.insertAdjacentHTML('beforeend', cardHtml);

  const img = document.querySelector('.card__image');

  img.onerror = () => {
    img.src = DEFAULT_IMAGE;
    const picture = img.closest('picture');
    if (picture) {
      picture.querySelectorAll('source').forEach((source) => {
        source.srcset = DEFAULT_IMAGE;
      });
    }
  };
};
