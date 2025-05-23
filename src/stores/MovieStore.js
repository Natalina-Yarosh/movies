import {defineStore} from "pinia";

export const useMovieStore = defineStore('movieStore',{
    state:()=>({
        movies: [],
        activeTab: 2
    }),
    getters: {
        watchedMovies: (state) => {
            return state.movies.filter((movie) => movie.isWatched)
        },
        totalCount: (state) => {
            return state.movies.length
        }
    },
    actions:{
        setActiveTab(id){
            this.activeTab = id
        },
        toggleWatched(id){
            const movie = this.movies.find((movie) => movie.id === id)
            movie.isWatched = !movie.isWatched
        },
        deleteMovie(id){
            this.movies = this.movies.filter((movie) => movie.id !== id)
        }
    }
})