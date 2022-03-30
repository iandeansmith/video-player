
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    movies: {},
    movieIds: [],
    selectedMovie: null,
};

export const moviesSlice = createSlice({
    name: 'movies',
    initialState,

    reducers: {
        setMovieList: (state, action) => {
            var movies = {}, ids = [];

            ids = action.payload.map(m => {
                var id = m.id;
                movies[id] = { ...m };
                return id;
            });

            state.movies = movies;
            state.movieIds = ids;
        },

        setSelectedMovie: (state, { payload }) => {
            if (payload == null)
                state.selectedMovie = null;
            else 
                state.selectedMovie = { ...payload };
        }
    }
});

export const { setMovieList, setSelectedMovie } = moviesSlice.actions;

export default moviesSlice.reducer;