import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';

export const useMovieStore = defineStore('movieStore', () => {
    const movies = ref([]);
    const activeTab = ref(2);

    const moviesOnLocalStorage = localStorage.getItem('movies');
    if (moviesOnLocalStorage) {
        movies.value = JSON.parse(moviesOnLocalStorage);
    }
    const watchedMovies = computed(() => movies.value.filter((movie) => movie.isWatched));
    const totalCount = computed(() =>  movies.value.length);

    const setActiveTab = (id) =>{
        activeTab.value = id;
    }
    const toggleWatched = (id) => {
        const movie = movies.value.find((movie) => movie.id === id);
        movie.isWatched = !movie.isWatched;
    }
    const deleteMovie = (id) => {
        movies.value = movies.value.filter((movie) => movie.id !== id);
    }

    watch(movies, (state) => {
        localStorage.setItem('movies', JSON.stringify(state));
    }, { deep: true });
    return {
        movies,
        activeTab,
        watchedMovies,
        totalCount,
        setActiveTab,
        toggleWatched,
        deleteMovie
    }
})