const items = document.querySelectorAll('.blogs__item');
const backBtn = document.querySelector('.back-btn');

const clearItem = () => {
  items.forEach((item) => {
    item.remove();
  });
};

clearItem();

const loadBlogs = async () => {
  const result = await fetch('https://gorest.co.in/public-api/posts');
  const response = await result.json();
  const blogsData = response.data;

  blogsData.forEach((post, index) => {
    const li = document.createElement('li');
    li.className = 'blogs__item';
    li.innerHTML = `
      <img class="blogs__img" src="https://loremflickr.com/400/400?${index + 1}" alt="" />
      <h2 class="blogs__title">${post.title}</h2>
     
    `;
    document.querySelector('.blogs__list').appendChild(li);
  });

  const items = document.querySelectorAll('.blogs__item');

  items.forEach((item, index) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      if (index < blogsData.length) {
        const selectedTitle = blogsData[index].title;
        const selectedText = blogsData[index].body;
        sessionStorage.setItem('selectedTitle', selectedTitle);
        sessionStorage.setItem('selectedText', selectedText);
      }
      window.location.href = 'articlePage.html';
    });
  });
};

const renderArticlePage = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const titlePage = document.querySelector('.title-page');
    const textPage = document.querySelector('.text-page');
    const selectedTitle = sessionStorage.getItem('selectedTitle');
    const selectedText = sessionStorage.getItem('selectedText');

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
};

loadBlogs();
renderArticlePage();
