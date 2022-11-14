import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const galleryContainer = document.querySelector('.gallery');
const cardsMarkup = createImageCards(galleryItems);

galleryContainer.insertAdjacentHTML('afterbegin', cardsMarkup);

function createImageCards(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
    })
    .join('');
}

galleryContainer.addEventListener('click', handleCardClick);

function handleCardClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  const instance = basicLightbox.create(`
      <img src="${event.target.dataset.source}" width="800" height="600">
  `);
  instance.show();

  galleryContainer.addEventListener('keydown', handleEscPress);
  function handleEscPress(event) {
    // console.log(event.code);
    if (event.code === 'Escape') {
      instance.close();
      galleryContainer.removeEventListener('keydown', handleEscPress);
    }
  }
}
