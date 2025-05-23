import { defineStore } from 'pinia';
import { useMovieStore } from './MovieStore';

import { ref } from 'vue';

const url =
  'https:api.themoviedb.org/3/search/movie?api_key=2141f929b90eb10932de11d84fb21138&query=';

export const useSearchStore = defineStore('searchStore', () => {
  const loader = ref(false);
  const movies = ref([]);

  const getMovies = async (search) => {
    loader.value = true;
    try {
      const res = await fetch(`${url}${search}`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      movies.value = data.results;
    } catch (error) {
      console.error('Fetch error:', error);
      movies.value = [];
    } finally {
      loader.value = false;
    }
  };

  const addMovie = (movie) => {
    const movieStore = useMovieStore();
    movieStore.movies.push({ ...movie, isWatched: false });
    movieStore.activeTab = 1;
  };

  return {
    loader,
    movies,
    getMovies,
    addMovie,
  };
});
