const buttons = document.querySelectorAll('.footer__title_dr');

buttons.forEach((button) => {
  const block = button.closest('.footer__block');
  const list = block.querySelector('.footer__list');
  const openIcon = button.querySelector('.footer__svg-open');
  const closeIcon = button.querySelector('.footer__svg-close');
  const title = document.querySelector('.footer__title_dr');

  button.addEventListener('click', function () {
    const isOpened = list.classList.contains('footer__list-open');

    if (isOpened) {
      title.style.marginBottom = '0';
      list.classList.remove('footer__list-open');
      openIcon.style.display = 'block';
      closeIcon.style.display = 'none';
    } else {
      title.style.marginBottom = '9px';
      list.classList.add('footer__list-open');
      openIcon.style.display = 'none';
      closeIcon.style.display = 'block';
    }
  });
});
