import axios from "axios";

axios.defaults.baseURL = "https://pixabay.com/api";

export async function getImagesByQuery(query, page) {
    const response = await axios.get("/", {
        params: {
            key: "51714412-e915f386459e3059438f942fd",
            q: query,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true,
            per_page: 15,
            page: page
        }
    });
    const { hits, totalHits } = response.data;
    return { hits, totalHits };
}
