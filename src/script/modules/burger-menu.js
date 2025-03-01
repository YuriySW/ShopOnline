const menuButton = document.querySelector('.menu-btn');
const burgerMenu = document.querySelector('.burger-menu');
const menuBtnBm = document.querySelector('.menu-btn_bm');

const openMenu = () => {
  menuButton.addEventListener('click', () => {
    burgerMenu.classList.toggle('burger-menu-visibility');
    menuButton.style.display = 'none';
    menuBtnBm.style.display = 'block';
  });
};

const closeMenu = (event) => {
  if (!burgerMenu.contains(event.target) && !menuButton.contains(event.target)) {
    burgerMenu.classList.remove('burger-menu-visibility');
    menuBtnBm.style.display = 'none';
    menuButton.style.display = 'block';
  }
};

document.addEventListener('click', closeMenu);

openMenu();
