import { type Response, fetch } from "undici";
import { CheerioAPI, load } from "cheerio";

const request = async (url: string): Promise<Response> => {
    const data = await fetch(url);
    return data;
};

// I don't think we need to use cookies, but if anything goes wrong answe would be yes.
const loadPage = async (url: string): Promise<CheerioAPI> => {
    const data = await fetch(url, {
        headers: {
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:99.0) Gecko/20100101 Firefox/99.0",
        },
    });
    const html = await data.text();
    return load(html);
};

export { request, loadPage };
