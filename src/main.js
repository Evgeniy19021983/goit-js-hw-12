import axios from 'axios';
import { fetchImages } from './pixabay-api';
import { renderGallery, clearGallery, toggleLoadMoreBtn, smoothScroll } from './render-functions';
import iziToast from 'izitoast';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
const perPage = 40;
let totalHits = 0;
let isLoading = false;

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();

  query = form.searchQuery.value.trim();

  if (!query) {
    iziToast.error({ title: 'Error', message: 'Please enter a search query.' });
    return;
  }

  page = 1; // Сброс страницы при новом поиске
  clearGallery(gallery);
  toggleLoadMoreBtn(false);
  isLoading = true;

  try {
    const data = await fetchImages(query, page, perPage);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.info({ title: 'No results', message: 'No images found. Please try another query.' });
      toggleLoadMoreBtn(false);
      isLoading = false;
      return;
    }

    renderGallery(gallery, data.hits);
    iziToast.success({ title: 'Success', message: `Hooray! We found ${totalHits} images.` });

    if (perPage * page < totalHits) {
      toggleLoadMoreBtn(true);
    } else {
      toggleLoadMoreBtn(false);
      iziToast.info({ title: 'End', message: "You've reached the end of search results." });
    }
  } catch (error) {
    iziToast.error({ title: 'Error', message: 'Something went wrong. Please try again later.' });
  } finally {
    isLoading = false;
  }
}

async function onLoadMore() {
  if (isLoading) return;

  page += 1;
  isLoading = true;
  toggleLoadMoreBtn(false);

  try {
    const data = await fetchImages(query, page, perPage);

    renderGallery(gallery, data.hits, true);

    if (perPage * page >= totalHits) {
      toggleLoadMoreBtn(false);
      iziToast.info({ title: 'End', message: "You've reached the end of search results." });
    } else {
      toggleLoadMoreBtn(true);
    }

    // Скроллим только после загрузки следующей страницы
    smoothScroll();
  } catch (error) {
    iziToast.error({ title: 'Error', message: 'Something went wrong. Please try again later.' });
  } finally {
    isLoading = false;
  }
}
