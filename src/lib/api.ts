import type {
    FindAnimeDetails,
    FindAnimeListResult,
    FindAnimeMovies,
    FindGenre,
    FindNewSeasonResult,
    FindOngoingSeries,
    FindPopularAnimes,
    FindPopularUpdates,
    FindRecentReleaseResult,
    FindSubcategory,
    SearchAnimeResult,
    StreamLinkResult,
} from "../types/types";
import { loadPage } from "./util/loadpage";

const GOGO_URL = "https://gogoanime.gg";
const AJAX_URL = "https://ajax.gogo-load.com";
const AJAX_RECENT_ONGOING = "ajax/page-recent-release-ongoing.html";

/**
 * Get all stream links of an episode
 * @param url - Direct URl of an episode
 * @returns Stream links of animestream, videocdn, streamsb, xstreamcdn and doodstream
 */
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

/**
 * Get the download link of an episode
 * @param url - Direct URL of an episode
 * @returns Download link of an episode
 */
const getDownloadLink = async (url: string): Promise<string | undefined> => {
    const $ = await loadPage(url);
    const $$ = $("div.download-anime > div > ul > li.dowloads > a").attr("href");
    return $$;
};

/**
 * Search anime by keywords and select specific page
 * @param keyword - Name of the anime or related keyword
 * @param page - Number of the page you want
 * @returns Search results of an anime
 */
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

/**
 * Find the list of anime from different word kind
 * @param word - Like keyword, name of the anime or related names
 * @param page - Number of the page you want
 * @returns A list of anime
 */
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

/**
 * Find newest season on gogoanime
 * @param page - Number of the page you want
 * @returns A list of newest season anime
 */
const findNewSeason = async (page = 1): Promise<FindNewSeasonResult[]> => {
    const $ = await loadPage(`${GOGO_URL}/new-season.html?page=${page}`);
    const results = [] as FindNewSeasonResult[];
    $("div.last_episodes > ul > li").each((_, e) => {
        results.push({
            id: $(e).find("a").attr("href")?.split("/")[2],
            title: $(e).find("a").attr("title")?.trim(),
            url: GOGO_URL + $(e).find("a").attr("href"),
            image: $(e).find("a > img").attr("src"),
            released: $(e).find("p.released").text()?.split(":")[1].trim(),
        });
    });
    return results;
};

/**
 * Find the recently released animes on AIR (mostly active in Japan)
 * @returns A list of recently released animes
 */
const findRecentRelease = async (): Promise<FindRecentReleaseResult[]> => {
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

/**
 * Find all anime movies on gogoanime
 * @param word Like keyword, write the name of that anime or related names
 * @returns A list of anime movies
 */
const findAnimeMovies = async (word: string): Promise<FindAnimeMovies[]> => {
    const $ = await loadPage(`${GOGO_URL}/anime-movies.html?aph=${!word ? "0" : word}`);
    const results = [] as FindAnimeMovies[];
    $("div.last_episodes > ul > li").each((_, e) => {
        results.push({
            id: $(e).find("a").attr("href")?.split("/")[2],
            title: $(e).find("a").attr("title")?.trim(),
            url: `${GOGO_URL}/category${$(e).find("a").attr("href")}`,
            image: $(e).find("a > img").attr("src"),
            released: $(e).find("p.released").text()?.split(":")[1].trim(),
        });
    });
    return results;
};

/**
 * Get all popular animes around on gogoanime
 * @param page - Number of the page you want
 * @returns A lis of popular animes on gogoanime
 */
const findPopularAnimes = async (page = 1): Promise<FindPopularAnimes[]> => {
    const $ = await loadPage(`${GOGO_URL}/popular.html?page=${page}`);
    const results = [] as FindPopularAnimes[];
    $("div.last_episodes > ul > li").each((_, e) => {
        results.push({
            id: $(e).find("a").attr("href")?.split("/")[2],
            title: $(e).find("a").attr("title")?.trim(),
            url: `${GOGO_URL}/category${$(e).find("a").attr("href")}`,
            image: $(e).find("a > img").attr("src"),
            released: $(e).find("p.released").text()?.split(":")[1].trim(),
        });
    });
    return results;
};

/**
 * Get all ongoing series, literally ongoing on Japan AIR
 * @returns A list of ongoing animes
 */
const findOngoingSeries = async (): Promise<FindOngoingSeries[]> => {
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

/**
 * Get all animes related to a specific genre
 * @param genre - Genre derives from gogoanime, see genres section on gogoanime homepage
 * @param page - Number of the page you want
 * @returns Releated all animes to a specific genre
 */
const findGenre = async (genre: string, page = 1): Promise<FindGenre[]> => {
    genre = genre.trim().replace(/ /g, "-").toLowerCase();
    const $ = await loadPage(`${GOGO_URL}/genre/${genre}?page=${page}`);
    const results = [] as FindGenre[];
    $("div.last_episodes > ul > li").each((_, e) => {
        results.push({
            id: $(e).find("a").attr("href")?.split("/")[2],
            title: $(e).find("a").attr("title")?.trim(),
            url: `${GOGO_URL}/category${$(e).find("a").attr("href")}`,
            image: $(e).find("a > img").attr("src"),
            released: $(e).find("p.released").text()?.split(":")[1].trim(),
        });
    });
    return results;
};

/**
 * Get all details about an anime
 * @param id - ID of an anime
 * @returns Details about an anime
 */
const findAnimeDetails = async (id: string): Promise<FindAnimeDetails> => {
    const $ = await loadPage(`${GOGO_URL}/category/${id}`);
    const genre: string[] = [];
    $("div.anime_info_body_bg > p:nth-child(6) > a").each((_, e) => {
        genre.push($(e).find("a").text());
    });
    return {
        id,
        title: $("div.anime_info_body_bg > h1").text(),
        type: $("div.anime_info_body_bg > p.type > a").attr("title"),
        plot_summary: $("div.anime_info_body_bg > p:nth-child(5)").text()?.replace("Plot Summary:", "").trim(),
        genre: $("div.anime_info_body_bg > p:nth-child(6) > a").text(),
        image: $("div.anime_info_body_bg").find("img").attr("src"),
        released: $("div.anime_info_body_bg > p:nth-child(7)").text()?.split(":")[1].trim(),
        status: $("div.anime_info_body_bg > p:nth-child(8)").text()?.replace("Status:", "").trim(),
        other_names: $("div.anime_info_body_bg > p:nth-child(9)").text()?.trim(),
        episodes: $("div.anime_video_body > ul > li > a").attr("ep_end"),
    };
};

/**
 * Get all info about a sub category on gogoanime
 * @param season - Name of the season
 * @returns A list of subcaegory results
 */
const findSubcategory = async (season: string): Promise<FindSubcategory[]> => {
    const $ = await loadPage(`${GOGO_URL}/sub-category/${season}`);
    const results = [] as FindSubcategory[];
    $("div.last_episodes > ul.items > li").each((_, e) => {
        results.push({
            id: $(e).find("p.name > a").attr("href")?.split("/")[2],
            title: $(e).find("p.name > a").attr("title"),
            url: GOGO_URL + $(e).find("p.name > a").attr("href"),
            image: $(e).find("div.img > a > img").attr("src"),
            released: $(e).find("p.released").text()?.split(":")[1].trim(),
        });
    });
    return results;
};

/**
 * Get popular anime updates from gogoanimes' ajax page
 * @param page - Number of the page you want
 * @returns Popular anime updates
 */
const findPopularUpdates = async (page = 1): Promise<FindPopularUpdates[]> => {
    const $ = await loadPage(`${AJAX_URL}/${AJAX_RECENT_ONGOING}?page=${page}`);
    const results = [] as FindPopularUpdates[];
    $("div.added_series_body.popular > ul > li").each((_, e) => {
        results.push({
            id: $(e).find("a").attr("href")?.split("/")[2],
            url: GOGO_URL + $(e).find("a").attr("href"),
            image: $(e).find("a > div").attr("style")?.split("('")[1].split("');")[0],
            genres: $(e).find("p.genres > a").text(),
            latest: $(e).find("p:nth-child(4) > a").text(),
        });
    });
    return results;
};

/**
 * Export all functions
 */
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
    findGenre,
    findAnimeDetails,
    findSubcategory,
    findPopularUpdates,
};
