const buttons = document.querySelectorAll('.footer__title_dr');

function handleToggle(event) {
  buttons.forEach((button) => {
    const block = button.closest('.footer__block');
    const list = block.querySelector('.footer__list');
    const openIcon = button.querySelector('.footer__svg-open');
    const closeIcon = button.querySelector('.footer__svg-close');

    if (button.contains(event.target)) {
      const isOpened = list.classList.contains('footer__list-open');
      document.querySelectorAll('.footer__list-open').forEach((openList) => {
        openList.classList.remove('footer__list-open');
      });

      if (!isOpened) {
        button.classList.add('active');
        list.classList.add('footer__list-open');
        openIcon.style.display = 'none';
        closeIcon.style.display = 'block';
      }
    } else if (!list.contains(event.target)) {
      list.classList.remove('footer__list-open');
      button.classList.remove('active');
      openIcon.style.display = 'block';
      closeIcon.style.display = 'none';
    }
  });
}

function handleResize() {
  if (window.innerWidth >= 632) {
    document.removeEventListener('click', handleToggle);
    buttons.forEach((button) => {
      const block = button.closest('.footer__block');
      const list = block.querySelector('.footer__list');
      const openIcon = button.querySelector('.footer__svg-open');
      const closeIcon = button.querySelector('.footer__svg-close');

      list.classList.remove('footer__list-open');
      button.classList.remove('active');
      openIcon.style.display = 'block';
      closeIcon.style.display = 'none';
    });
  } else {
    document.addEventListener('click', handleToggle);
  }
}

handleResize();

window.addEventListener('resize', handleResize);
