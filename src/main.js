import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton } from "./js/render-functions";
import { getImagesByQuery } from "./js/pixabay-api";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


let form = document.querySelector(".form");
form.addEventListener("submit", submitForm);
let line = "";
let page = 1;
let totalPage = 1

let button = document.querySelector(".load-button");

async function submitForm(event) {
    event.preventDefault();
    let formData = new FormData(form);
    let value = formData.get('search-text').trim();

    if (value == "") {
        iziToast.error({
            title: 'Error',
            message: 'request can`t be empty'
        });
        return;
    }
    if (line == value) {
        return;
    }
    line = value;
    page = 1;
    totalPage = 1;

    clearGallery();

    addElements();
}

button.addEventListener("click", addElements);

async function addElements() {
    hideLoadMoreButton();
    showLoader();

    try {
        const { hits, totalHits } = await getImagesByQuery(line, page);

        if (!hits.length) {
            iziToast.error({
                title: 'Error',
                message: 'Sorry, there are no images matching your search query. Please try again!',
            });
            return;
        }

        totalPage = Math.ceil(totalHits / 15);
        createGallery(hits);

        if (page < totalPage) {
            showLoadMoreButton();
        } else {
            iziToast.show({
                title: 'END',
                message: "We're sorry, but you've reached the end of search results.",
            });
        }
        page++;

        const firstItem = document.querySelector(".gallery li:first-child");
        if (firstItem) {
            window.scrollBy({
                top: firstItem.getBoundingClientRect().height * 2,
                behavior: "smooth",
            });
        }

    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: `${error.message || error}`,
        });
    } finally {
        hideLoader();
    }
}