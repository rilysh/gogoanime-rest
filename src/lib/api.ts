import type {
    FindAnimeListResult,
    FindAnimeMovies,
    FindNewSeasonResult,
    FindOngoingSeries,
    FindPopularAnimes,
    FindRecentReleaseResult,
    SearchAnimeResult,
    StreamLinkResult,
} from "./types/types";
import { loadPage } from "./util/loadpage";

const GOGO_URL = "https://gogoanime.gg";
const GENRES = [
    "action",
    "adventure",
    "anthropomorphic",
    "avant-garde",
    "cars",
    "childcare",
    "comedy",
    "crime",
    "delinquents",
    "dementia",
    "demons",
    "detective",
    "drama",
    "dub",
    "ecchi",
    "family",
    "fantasy",
    "game",
    "gender-bender",
    "gourmet",
    "harem",
    "hentai",
    "historical",
    "horror",
    "isekai",
    "josei",
    "kids",
    "magic",
    "mahou-shoujo",
    "martial-arts",
    "mecha",
    "military",
    "music",
    "mystery",
];

const getStreamLinks = async (url: string): Promise<StreamLinkResult[]> => {
    const $ = await loadPage(url);
    const results = [] as StreamLinkResult[];
     $("div.anime_muti_link > ul").each((_, e) => {
         results.push({
             animeStream: `https:${$(e).find(".anime > a").attr("data-video")}`,
             videoCDN: `https:${$(e).find(".vidcdn > a").attr("data-video")}`,
             streamsb: $(e).find(".streamsb > a").attr("data-video"),
             xstreamcdn: $(e).find(".xstreamcdn > a").attr("data-video"),
             doodstream: $(e).find(".doodstream > a").attr("data-video"),
         });
     });
     return results;
};

const getDownloadLink = async (url: string): Promise<string | undefined> => {
    const $ = await loadPage(url);
    const $$ = $("div.download-anime > div > ul > li.dowloads > a").attr("href");
    return $$;
};

const searchAnime = async (keyword: string, page = 1): Promise<SearchAnimeResult[]> => {
    const $ = await loadPage(`${GOGO_URL}/search.html?keyword=${keyword}&page=${page}`);
    const results = [] as SearchAnimeResult[];
    $("div.last_episodes > ul > li").each((i, e) => {
        results.push({
            id: $(e).find("p.name > a").attr("href")?.split("/")[2],
            title: $(e).find("p.name > a").attr("title"),
            url: GOGO_URL + $(e).find("p.name > a").attr("href"),
            image: $(e).find("div > a > img").attr("src"),
            released: $(e).find("p.released").text().replace("Released:", "")
            .trim(),
        });
    });
    return results;
};

const findAnimeList = async (word: string, page = 1): Promise<FindAnimeListResult[]> => {
    const $ = await loadPage(`${GOGO_URL}/${!word ? "anime-list.html" : `anime-list-${word}`}?page=${page}`);
    const results = [] as FindAnimeListResult[];
    $("div.anime_list_body > ul > li").each((i, e) => {
        results.push({
            id: $(e).find("a").attr("href")?.split("/")[2],
            title: $(e).find("a").text()?.trim(),
            url: GOGO_URL + $(e).find("a").attr("href"),
            image: $(e).attr("title")?.split("<div class=\"thumnail_tool\"><img src=\"")[1].split("\"")[0],
            released: $(e).attr("title")?.split("</p><p class=\"type\"><span>")[1].split("</p>")[0].replace("Released:", "").replace("</span>", "").trim(),
            status: $(e).attr("title")?.split("Status: </span>")[1].split("</p>")[0],
            summary: $(e).attr("title")?.split("<span>Plot Summary: </span>")[1].split("</p></div>")[0].trim().split("\n").join(" ").split("\t")
            .join(" "),
        });
    });
    return results;
};

const findNewSeason = async (page = 1): Promise<FindNewSeasonResult[]> => {
    const $ = await loadPage(`${GOGO_URL}/new-season.html?page=${page}`);
    const results = [] as FindNewSeasonResult[];
    $("div.last_episodes > ul > li").each((_, e) => {
        results.push({
            id: $(e).find("a").attr("href")?.split("/")[2],
            title: $(e).find("a").attr("title")?.trim(),
            url: GOGO_URL + $(e).find("a").attr("href"),
            image: $(e).find("a > img").attr("src"),
            released: $(e).find("p.released").text()?.split("Released:")[1].trim(),
        });
    });
    return results;
};

const findRecentRelease = async () => {
    const $ = await loadPage(`${GOGO_URL}/new-season.html`);
    const results = [] as FindRecentReleaseResult[];
    $("nav.menu_recent > ul > li").each((_, e) => {
        results.push({
            id: $(e).find("a").attr("href")?.split("/")[1],
            title: $(e).find("a").attr("title")?.trim(),
            url: `${GOGO_URL}/category${$(e).find("a").attr("href")}`,
            image: $(e).find("a > div").attr("style")?.split("background: url('")[1].split("');")[0],
            episode: $(e).find("a > p").text(),
        });
    });
    return results;
};

const findAnimeMovies = async (word: string) => {
    const $ = await loadPage(`${GOGO_URL}/anime-movies.html?aph=${!word ? "0" : word}`);
    const results = [] as FindAnimeMovies[];
    $("div.last_episodes > ul > li").each((_, e) => {
        results.push({
            id: $(e).find("a").attr("href")?.split("/")[2],
            title: $(e).find("a").attr("title")?.trim(),
            url: `${GOGO_URL}/category${$(e).find("a").attr("href")}`,
            image: $(e).find("a > img").attr("src"),
            released: $(e).find("p.released").text()?.split("Released:")[1].trim(),
        });
    });
    return results;
};

const findPopularAnimes = async (page = 1) => {
    const $ = await loadPage(`${GOGO_URL}/popular.html?page=${page}`);
    const results = [] as FindPopularAnimes[];
    $("div.last_episodes > ul > li").each((_, e) => {
        results.push({
            id: $(e).find("a").attr("href")?.split("/")[2],
            title: $(e).find("a").attr("title")?.trim(),
            url: `${GOGO_URL}/category${$(e).find("a").attr("href")}`,
            image: $(e).find("a > img").attr("src"),
            released: $(e).find("p.released").text()?.split("Released:")[1].trim(),
        });
    });
    return results;
};

const findOngoingSeries = async () => {
    const $ = await loadPage(`${GOGO_URL}`);
    const results = [] as FindOngoingSeries[];
    $("div.viewport > div > nav > ul > li").each((_, e) => {
        results.push({
            id: $(e).find("a").attr("href")?.split("/")[2],
            title: $(e).find("a").attr("title"),
            url: GOGO_URL + $(e).find("a").attr("href"),
        });
    });
    return results;
};

export {
    getStreamLinks,
    getDownloadLink,
    searchAnime,
    findAnimeList,
    findNewSeason,
    findRecentRelease,
    findAnimeMovies,
    findPopularAnimes,
    findOngoingSeries,
};
