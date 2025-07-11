const gallery = document.getElementById('gallery');

let masNamesDesktop = [
  'Starry Night',
  'The Storm on the Sea of Galilee',
  'Lady with an Ermine',
  'The Boy in the Red Vest',
  'Girl with a Pearl Earring',
  'The Great Wave off Kanagawa',
  'The Night Café',
  'Arnolfini Portrait',
  'Guernica',
  'Van Gogh Self-portrait',
  'Mona Lisa',
  'Penitent Magdalene',
  'The Sleeping Gypsy',
  'The Basket of Apples',
  'The Swing',
];

const slideshowBtn = document.getElementById('startSlideshow');
const artworkTemplate = document.getElementById('artwork-template');
const footer = document.querySelector('footer');
const heroGallery = document.getElementById('hero-gallery');

let isSlideshowActive = false;

slideshowBtn.addEventListener('click', () => {
  isSlideshowActive = !isSlideshowActive;

  if (isSlideshowActive) {
    // Увімкнено слайдшоу
    artworkTemplate.classList.remove('display-none');
    footer.classList.remove('display-none');
    heroGallery.classList.add('display-none');
    slideshowBtn.textContent = 'STOP SLIDESHOW';

    // Викликати тільки після відображення DOM елементів
    changeSlide();
  } else {
    // Вимкнено слайдшоу
    artworkTemplate.classList.add('display-none');
    footer.classList.add('display-none');
    heroGallery.classList.remove('display-none');
    slideshowBtn.textContent = 'START SLIDESHOW';
  }
});

fetch('./data.json')
  .then((res) => res.json())
  .then((data) => {
    masNamesDesktop.forEach((name) => {
      const item = data.find((art) => art.name === name);
      if (!item) return;

      const card = document.createElement('div');
      card.className = 'artwork-card';

      const img = document.createElement('img');
      img.className = 'artwork-thumb';
      img.src = item.images.thumbnail;
      img.alt = item.name;
      card.appendChild(img);

      const caption = document.createElement('div');
      caption.className = 'artwork-caption';
      caption.innerHTML = `
        <p class="picture-name">${item.name}</p>
        <p class="artist-name">${item.artist.name}</p>
      `;
      card.appendChild(caption);

      gallery.appendChild(card);
    });
  })
  .catch(console.error);

const mq1200 = window.matchMedia('(max-width: 1200px)');
const mq900 = window.matchMedia('(max-width: 900px)');
const mq600 = window.matchMedia('(max-width: 600px)');

function updateMasNames() {
  if (mq600.matches) {
    masNamesDesktop = [
      'Starry Night',
      'Girl with a Pearl Earring',
      'Guernica',
      'Penitent Magdalene',
      'The Storm on the Sea of Galilee',
      'The Great Wave off Kanagawa',
      'Van Gogh Self-portrait',
      'The Sleeping Gypsy',
      'Lady with an Ermine',
      'The Night Café',
      'The Basket of Apples',
      'The Boy in the Red Vest',
      'Arnolfini Portrait',
      'Mona Lisa',
      'The Swing',
    ];
  } else if (mq900.matches) {
    masNamesDesktop = [
      'Starry Night',
      'Guernica',
      'The Storm on the Sea of Galilee',
      'Van Gogh Self-portrait',
      'Lady with an Ermine',
      'The Boy in the Red Vest',
      'Mona Lisa',
      'Girl with a Pearl Earring',
      'Penitent Magdalene',
      'The Great Wave off Kanagawa',
      'The Sleeping Gypsy',
      'The Night Café',
      'The Basket of Apples',
      'Arnolfini Portrait',
      'The Swing',
    ];
  } else {
    masNamesDesktop = [
      'Starry Night',
      'The Storm on the Sea of Galilee',
      'Lady with an Ermine',
      'The Boy in the Red Vest',
      'Girl with a Pearl Earring',
      'The Great Wave off Kanagawa',
      'The Night Café',
      'Arnolfini Portrait',
      'Guernica',
      'Van Gogh Self-portrait',
      'Mona Lisa',
      'Penitent Magdalene',
      'The Sleeping Gypsy',
      'The Basket of Apples',
      'The Swing',
    ];
  }
}

// Запуск при завантаженні
updateMasNames();

// Підписка на зміни
mq1200.addEventListener('change', updateMasNames);
mq900.addEventListener('change', updateMasNames);
mq600.addEventListener('change', updateMasNames);

// -- slider  --------------------------------------------------


let currentIndex = 0;
let slidesData = [];

const btnSlidePrev = document.querySelector('.btn-slide-prev');
const btnSlideNext = document.querySelector('.btn-slide-next');


let listenersAttached = false;

function changeSlide() {
  fetch('./data.json')
    .then((res) => res.json())
    .then((data) => {
      slidesData = data;
      renderSlide(currentIndex);
      updateButtonState();

      if (!listenersAttached) {
        btnSlidePrev.addEventListener('click', handlePrev);
        btnSlideNext.addEventListener('click', handleNext);
        listenersAttached = true;
      }
    });
}

function handlePrev() {
  if (currentIndex > 0) {
    currentIndex--;
    renderSlide(currentIndex);
    updateButtonState();
      console.log(currentIndex);
  }
}
function handleNext() {
  if (currentIndex < slidesData.length - 1) {
    currentIndex++;
    renderSlide(currentIndex);
    updateButtonState();
      console.log(currentIndex);
  }
}

function updateButtonState() {
  btnSlidePrev.classList.toggle('disabled', currentIndex === 0);
  btnSlideNext.classList.toggle(
    'disabled',
    currentIndex === slidesData.length - 1
  );
}

function setupPopoverHandlers() {
  const btnViewImage = document.querySelector('.btn-view-image');
  const btnClose = document.querySelector('.button-view-close');
  const popover = document.getElementById('pop-picture');

  if (!btnViewImage || !btnClose || !popover) return;
}

function renderSlide(index) {
  const slide = slidesData[index];

  // Заголовок
  document
    .querySelectorAll('.item-picture-name')
    .forEach((el) => (el.textContent = slide.name));
  document
    .querySelectorAll('.item-artist-name')
    .forEach((el) => (el.textContent = slide.artist.name));

  // Зображення
  document.querySelector('.item-images-hero img').src = slide.images.hero.large;
  document.querySelector('.item-images-hero img').alt = slide.name;
  document.querySelector('.item-artist-image img').src = slide.artist.image;
  document.querySelector('.item-description-text').textContent =
    slide.description;
  document
    .querySelector('.item-description')
    .setAttribute('data-year', slide.year);

  // Посилання
  const sourceLink = document.querySelector('.item-source');
  sourceLink.href = slide.source;

  // Прогрес-бар
  const progressPercent = ((index + 1) / slidesData.length) * 100;
  document.querySelector(
    '.progress-bar-fill'
  ).style.width = `${progressPercent}%`;

  //  Поповерхове зображення (VIEW IMAGE)
  const popImage = document.querySelector('#pop-picture img');
  if (popImage) {
    popImage.src = slide.images.gallery;
    popImage.alt = slide.name;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  changeSlide(); // завантаження слайдів
  setupPopoverHandlers(); // слухачі поповера
});

