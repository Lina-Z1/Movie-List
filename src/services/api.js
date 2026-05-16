const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

export const GENRE_MAP = {
    comedy: 35,
    horror: 27,
    romance: 10749,
    scifi: 878,
    adventure: 12,
};

export const fetchTopRated = async () => {
    const res = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`);
    const data = await res.json();
    return data.results || [];
};

export const fetchByGenre = async (genre) => {
    const res = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${GENRE_MAP[genre]}`);
    const data = await res.json();
    return data.results || [];
};

export const fetchActors = async () => {
    const res = await fetch(`${BASE_URL}/person/popular?api_key=${API_KEY}`);
    const data = await res.json();
    return data.results || [];
};

export const searchMovies = async (query) => {
    const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await res.json();
    return data.results || [];
};

export const fetchMovieById = async (id) => {
    const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
    return await res.json();
};

export const fetchActorById = async (id) => {
    const res = await fetch(`${BASE_URL}/person/${id}?api_key=${API_KEY}`);
    return await res.json();
};

export const fetchMovieTrailer = async (id) => {
    const res = await fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`);
    const data = await res.json();
    const trailer = data.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube');
    return trailer ? `https://www.youtube.com/embed/${trailer.key}` : null;
};

export const fetchMovieCast = async (id) => {
    const res = await fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`);
    const data = await res.json();
    return data.cast?.slice(0, 10) || []; // top 10 cast members
};

export const fetchRelatedMovies = async (id) => {
    const res = await fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`);
    const data = await res.json();
    return data.results?.slice(0, 10) || [];
};

export const fetchActorMovies = async (id) => {
    const res = await fetch(`${BASE_URL}/person/${id}/movie_credits?api_key=${API_KEY}`);
    const data = await res.json();
    return data.cast?.slice(0, 10) || [];
};

export const TV_GENRE_MAP = {
    comedy: 35,
    drama: 18,
    crime: 80,
    scifi: 10765,
    animation: 16,
};

export const fetchTopRatedShows = async () => {
    const res = await fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}`);
    const data = await res.json();
    return data.results || [];
};

export const fetchShowsByGenre = async (genre) => {
    const res = await fetch(`${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=${TV_GENRE_MAP[genre]}`);
    const data = await res.json();
    return data.results || [];
};

export const fetchShowById = async (id) => {
    const res = await fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}`);
    return await res.json();
};

export const fetchShowTrailer = async (id) => {
    const res = await fetch(`${BASE_URL}/tv/${id}/videos?api_key=${API_KEY}`);
    const data = await res.json();
    const trailer = data.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube');
    return trailer ? `https://www.youtube.com/embed/${trailer.key}` : null;
};

export const fetchShowCast = async (id) => {
    const res = await fetch(`${BASE_URL}/tv/${id}/credits?api_key=${API_KEY}`);
    const data = await res.json();
    return data.cast?.slice(0, 10) || [];
};

export const fetchRelatedShows = async (id) => {
    const res = await fetch(`${BASE_URL}/tv/${id}/similar?api_key=${API_KEY}`);
    const data = await res.json();
    return data.results?.slice(0, 10) || [];
};

export const fetchActorTVShows = async (id) => {
    const res = await fetch(`${BASE_URL}/person/${id}/tv_credits?api_key=${API_KEY}`);
    const data = await res.json();
    return data.cast?.slice(0, 10) || [];
};

export const fetchPopularShows = async () => {
    const res = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}`);
    const data = await res.json();
    return data.results || [];
};

export const fetchAiringTodayShows = async () => {
    const res = await fetch(`${BASE_URL}/tv/airing_today?api_key=${API_KEY}`);
    const data = await res.json();
    return data.results || [];
};

export const fetchOnTVShows = async () => {
    const res = await fetch(`${BASE_URL}/tv/on_the_air?api_key=${API_KEY}`);
    const data = await res.json();
    return data.results || [];
};

export const searchShows = async (query) => {
    const res = await fetch(`${BASE_URL}/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await res.json();
    return data.results || [];
};