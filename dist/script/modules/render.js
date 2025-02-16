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

const renderArticlePage = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const titlePage = document.querySelector('.title-page');
    const selectedTitle = sessionStorage.getItem('selectedTitle');
    const selectedText = sessionStorage.getItem('selectedText');
    const pageLinkTitle = document.querySelector('.page-link-title');
    const textPageWrap = document.querySelector('.text-page-wrap');

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
  });

  if (backBtn) {
    backBtn.addEventListener('click', () => {
      window.location.href = 'blog.html';
    });
  }
};

loadBlogs();
renderArticlePage();

// const loadBlogs = async () => {
//   const result = await fetch('https://gorest.co.in/public-api/posts');
//   const response = await result.json();
//   const blogsData = response.data;
//   const blogsList = document.querySelector('.blogs__list');

//   if (blogsList) {
//     blogsData.forEach((post, index) => {
//       const li = document.createElement('li');
//       li.className = 'blogs__item';
//       li.innerHTML = `
//         <img class="blogs__img" src="https://loremflickr.com/400/400?${index + 1}" alt="" />
//         <h2 class="blogs__title">${post.title}</h2>
//       `;
//       blogsList.appendChild(li);
//     });

//     const items = document.querySelectorAll('.blogs__item');

//     items.forEach((item, index) => {
//       item.addEventListener('click', (e) => {
//         e.preventDefault();

//         const selectedTitle = blogsData[index].title;
//         const selectedText = blogsData[index].body;
//         sessionStorage.setItem('selectedTitle', selectedTitle);
//         sessionStorage.setItem('selectedText', selectedText);

//         window.location.href = 'articlePage.html';
//       });
//     });
//   }
// };
