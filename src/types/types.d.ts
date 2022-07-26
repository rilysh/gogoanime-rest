export interface StreamLinkResult {
    animeStream: string;
    videoCDN: string;
    streamsb: string | undefined;
    xstreamcdn: string | undefined;
    doodstream: string | undefined;
}

export interface SearchAnimeResult {
    id: string | undefined;
    title: string | undefined;
    url: string | undefined;
    image: string | undefined;
    released: string | undefined;
}

export interface FindAnimeListResult {
    id: string | undefined;
    title: string | undefined;
    url: string | undefined;
    image: string | undefined;
    released: string | undefined;
    status: string | undefined;
    summary: string | undefined;
}

export interface FindNewSeasonResult {
    id: string | undefined;
    title: string | undefined;
    url: string | undefined;
    image: string | undefined;
    released: string | undefined;
}

export interface FindRecentReleaseResult {
    id: string | undefined;
    title: string | undefined;
    url: string | undefined;
    image: string | undefined;
    episode: string;
}

export interface FindAnimeMovies {
    id: string | undefined;
    title: string | undefined;
    url: string | undefined;
    image: string | undefined;
    released: string | undefined;
}

export interface FindPopularAnimes {
    id: string | undefined;
    title: string | undefined;
    url: string | undefined;
    image: string | undefined;
    released: string | undefined;
}

export interface FindOngoingSeries {
    id: string | undefined;
    title: string | undefined;
    url: string | undefined;
}

export interface FindGenre {
    id: string | undefined;
    title: string | undefined;
    url: string | undefined;
    image: string | undefined;
    released: string | undefined;
}

export interface FindAnimeDetails {
    id: string | undefined,
    title: string | undefined,
    type: string | undefined,
    plot_summary: string | undefined,
    genre: string | undefined,
    image: string | undefined,
    released: string | undefined,
    status: string | undefined,
    other_names: string | undefined,
    episodes: string | undefined,
}

export interface FindSubcategory {
    id: string | undefined;
    title: string | undefined;
    url: string | undefined;
    image: string | undefined;
    released: string | undefined;
}

export interface FindPopularUpdates {
    id: string | undefined;
    url: string | undefined;
    image: string | undefined;
    genres: string | undefined;
    latest: string | undefined;
}
