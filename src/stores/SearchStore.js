import { defineStore } from 'pinia';
import {useMovieStore} from './MovieStore'
const url =
  'https:api.themoviedb.org/3/search/movie?api_key=2141f929b90eb10932de11d84fb21138&query=';

export const useSearchStore = defineStore('searchStore', {
  state: () => ({
    loader: false,
    movies: [],
  }),
  actions: {
    async getMovies(search) {
        this.loader = true;
        try {
          const res = await fetch(`${url}${search}`);
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          const data = await res.json();
          this.movies = data.results;
        } catch (error) {
          console.error('Fetch error:', error);
          this.movies = [];
        } finally {
          this.loader = false;
        }
    },
    addMovie(movie){
        const movieStore = useMovieStore();
        movieStore.movies.push({...movie, isWatched: false})
        movieStore.activeTab = 1
    }
  },
});
