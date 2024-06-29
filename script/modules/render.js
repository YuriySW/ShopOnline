const items = document.querySelectorAll('.blogs__item');
const titles = document.querySelectorAll('.blogs__title');
const texts = document.querySelectorAll('.blogs__text');
const backBtn = document.querySelector('.back-btn');
const imgs = document.querySelectorAll('.blogs__img');
imgs.forEach((img, index) => {
  img.src = `https://loremflickr.com/400/400?${index + 1}`;
});

const loadBlogs = async () => {
  const result = await fetch('https://gorest.co.in/public-api/posts');
  const data = await result.json();

  console.log(data);

  data.data.forEach((post, index) => {
    if (titles[index]) {
      titles[index].textContent = post.title;
    }
    if (texts[index]) {
      texts[index].textContent = post.body;
    }
  });

  items.forEach((item, index) => {
    item.addEventListener('click', (e) => {
      if (index < data.data.length) {
        const selectedTitle = data.data[index].title;
        const selectedText = data.data[index].body;
        localStorage.setItem('selectedTitle', selectedTitle);
        localStorage.setItem('selectedText', selectedText);
      } else {
        localStorage.removeItem('selectedTitle');
        localStorage.removeItem('selectedText');
      }
      window.location.href = 'articlePage.html';
    });
  });
};

loadBlogs();

document.addEventListener('DOMContentLoaded', () => {
  const titlePage = document.querySelector('.title-page');
  const textPage = document.querySelector('.text-page');
  const selectedTitle = localStorage.getItem('selectedTitle');
  const selectedText = localStorage.getItem('selectedText');

  if (titlePage && selectedTitle) {
    titlePage.textContent = selectedTitle;
  }

  if (textPage && selectedText) {
    textPage.textContent = selectedText;
  }
});

if (backBtn) {
  backBtn.addEventListener('click', () => {
    window.location.href = 'blog.html';
  });
}
