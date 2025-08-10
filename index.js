import{S as p,a as y,i as a}from"./assets/vendor-B3Lscd_h.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const l of t)if(l.type==="childList")for(const n of l.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function e(t){const l={};return t.integrity&&(l.integrity=t.integrity),t.referrerPolicy&&(l.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?l.credentials="include":t.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function s(t){if(t.ep)return;t.ep=!0;const l=e(t);fetch(t.href,l)}})();let d=document.querySelector(".gallery");const g=new p(".gallery a",{captionsData:"alt",captionDelay:250});function h(r){const o=r.map(e=>`<li class="gallery-element">
                    <a href="${e.largeImageURL}">
                        <img src=${e.webformatURL} class="gallery-img" alt=${e.tags}>
                    </a>
                    <ul class="gallery-list">
                        <li class="gallery-list-column">
                            <p class="gallery-list-title">Likes</p>
                            <p class="gallery-list-counter">${e.likes}</p>
                        </li>
                        <li class="gallery-list-column">
                            <p class="gallery-list-title">Views</p>
                            <p class="gallery-list-counter">${e.views}</p>
                        </li>
                        <li class="gallery-list-column">
                            <p class="gallery-list-title">Comments</p>
                            <p class="gallery-list-counter">${e.comments}</p>
                        </li>
                        <li class="gallery-list-column">
                            <p class="gallery-list-title">Downloads</p>
                            <p class="gallery-list-counter">${e.downloads}</p>
                        </li>
                    </ul>
                </li>
        `).join("");d.insertAdjacentHTML("beforeend",o),g.refresh()}function b(){d.innerHTML=""}function L(){document.querySelector(".loader").style.display="block"}function w(){document.querySelector(".loader").style.display="none"}function q(){document.querySelector(".load-button").style.display="block"}function S(){document.querySelector(".load-button").style.display="none"}y.defaults.baseURL="https://pixabay.com/api";async function v(r,o){const e=await y.get("/",{params:{key:"51714412-e915f386459e3059438f942fd",q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:o}}),{hits:s,totalHits:t}=e.data;return{hits:s,totalHits:t}}let f=document.querySelector(".form");f.addEventListener("submit",E);let c="",i=1,u=1,D=document.querySelector(".load-button");async function E(r){r.preventDefault();let e=new FormData(f).get("search-text").trim();if(e==""){a.error({title:"Error",message:"request can`t be empty"});return}c!=e&&(c=e,i=1,u=1,b(),m())}D.addEventListener("click",m);async function m(){S(),L();try{const{hits:r,totalHits:o}=await v(c,i);if(!r.length){a.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"});return}u=Math.ceil(o/15),h(r),i<u?q():a.show({title:"END",message:"We're sorry, but you've reached the end of search results."}),i++;const e=document.querySelector(".gallery li:first-child");e&&window.scrollBy({top:e.getBoundingClientRect().height*2,behavior:"smooth"})}catch(r){a.error({title:"Error",message:`${r.message||r}`})}finally{w()}}
//# sourceMappingURL=index.js.map
