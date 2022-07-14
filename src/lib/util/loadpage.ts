import { type Response, fetch } from "undici";
import { type CheerioAPI, load } from "cheerio";

const request = async (url: string): Promise<Response> => {
    const data = await fetch(url);
    return data;
};

const loadPage = async (url: string): Promise<CheerioAPI> => {
    const data = await fetch(url);
    const html = await data.text();
    return load(html);
};

export { request, loadPage };
