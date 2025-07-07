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
        <strong>${item.name}</strong><br>
        <em>${item.artist.name}</em>
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
