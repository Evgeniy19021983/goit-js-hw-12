import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';
import iziToast from 'izitoast';

const form = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
const perPage = 15;
let totalHits = 0;

form.addEventListener('submit', async e => {
  e.preventDefault();
  query = form.elements['search-text'].value.trim();
  page = 1;
  totalHits = 0;

  clearGallery();
  hideLoadMoreButton();

  if (!query) {
    iziToast.warning({
      message: 'Введите запрос!',
      position: 'topRight',
    });
    return;
  }

  showLoader();
  try {
    const data = await getImagesByQuery(query, page, perPage);

    if (!data.hits.length) {
      iziToast.error({
        message: 'Ничего не найдено!',
        position: 'topRight',
      });
      return;
    }

    totalHits = data.totalHits;
    createGallery(data.hits);

    if (totalHits > perPage) {
      showLoadMoreButton();
    }

    iziToast.success({
      message: `Найдено ${totalHits} изображений`,
      position: 'topRight',
    });
  } catch (error) {
    iziToast.error({
      message: 'Ошибка загрузки данных',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  showLoader();

  try {
    const data = await getImagesByQuery(query, page, perPage);

    if (!data.hits.length) {
      iziToast.info({
        message: 'Больше изображений нет.',
        position: 'topRight',
      });
      hideLoadMoreButton();
      return;
    }

    createGallery(data.hits);

    const totalPages = Math.ceil(totalHits / perPage);
    if (page >= totalPages) {
      hideLoadMoreButton();
      iziToast.info({
        message: 'Вы достигли конца результатов.',
        position: 'topRight',
      });
    }

    // Плавная прокрутка
    const cardHeight = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    iziToast.error({
      message: 'Ошибка при загрузке дополнительных изображений',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});
