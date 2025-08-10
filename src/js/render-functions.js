import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let gallery = document.querySelector(".gallery");

const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
});

export function createGallery(images) {
    const markup = images.map((image) => {
        return `<li class="gallery-element">
                    <a href="${image.largeImageURL}">
                        <img src=${image.webformatURL} class="gallery-img" alt=${image.tags}>
                    </a>
                    <ul class="gallery-list">
                        <li class="gallery-list-column">
                            <p class="gallery-list-title">Likes</p>
                            <p class="gallery-list-counter">${image.likes}</p>
                        </li>
                        <li class="gallery-list-column">
                            <p class="gallery-list-title">Views</p>
                            <p class="gallery-list-counter">${image.views}</p>
                        </li>
                        <li class="gallery-list-column">
                            <p class="gallery-list-title">Comments</p>
                            <p class="gallery-list-counter">${image.comments}</p>
                        </li>
                        <li class="gallery-list-column">
                            <p class="gallery-list-title">Downloads</p>
                            <p class="gallery-list-counter">${image.downloads}</p>
                        </li>
                    </ul>
                </li>
        `;
    }).join("");
    gallery.insertAdjacentHTML("beforeend", markup);
    lightbox.refresh();
}

export function clearGallery() {
    gallery.innerHTML = "";
}

export function showLoader() {
    document.querySelector(".loader").style.display = "block";
}

export function hideLoader() {
    document.querySelector(".loader").style.display = "none";
}

export function showLoadMoreButton() {
    document.querySelector(".load-button").style.display = "block";
}

export function hideLoadMoreButton() {
    document.querySelector(".load-button").style.display = "none";
}