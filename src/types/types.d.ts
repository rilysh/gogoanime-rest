export interface StreamLinkResult {
    animeStream?: string;
    videoCDN?: string;
    streamsb?: string;
    xstreamcdn?: string;
    doodstream?: string;
}

export interface SearchAnimeResult {
    id?: string;
    title?: string;
    url?: string;
    image?: string;
    released?: string;
}

export interface FindAnimeListResult {
    id?: string;
    title?: string;
    url?: string;
    image?: string;
    released?: string;
    status?: string;
    summary?: string;
}

export interface FindNewSeasonResult {
    id?: string;
    title?: string;
    url?: string;
    image?: string;
    released?: string;
}

export interface FindRecentReleaseResult {
    id?: string;
    title?: string;
    url?: string;
    image?: string;
    episode?: string;
}

export interface FindAnimeMovies {
    id?: string;
    title?: string;
    url?: string;
    image?: string;
    released?: string;
}

export interface FindPopularAnimes {
    id?: string;
    title?: string;
    url?: string;
    image?: string;
    released?: string;
}

export interface FindOngoingSeries {
    id?: string;
    title?: string;
    url?: string;
}

export interface FindGenre {
    id?: string;
    title?: string;
    url?: string;
    image?: string;
    released?: string;
}

export interface FindAnimeDetails {
    id?: string;
    title?: string;
    type?: string;
    plot_summary?: string;
    genre?: string;
    image?: string;
    released?: string;
    status?: string;
    other_names?: string;
    episodes?: string;
}

export interface FindSubcategory {
    id?: string;
    title?: string;
    url?: string;
    image?: string;
    released?: string;
}

export interface FindPopularUpdates {
    id?: string;
    url?: string;
    image?: string;
    genres?: string;
    latest?: string;
}
