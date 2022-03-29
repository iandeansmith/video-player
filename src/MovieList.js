
import { Lightning, Utils } from '@lightningjs/sdk';
import { List } from '@lightningjs/ui';

import store from './store';
import MovieListItem from './MovieListItem';
import { StageSize } from './const';

// size of entry thumbnails
const THUMB_WIDTH = 400;
const THUMB_HEIGHT = 250;

// space between thumbnails
const THUMB_GAP = 20;

export default class MovieList extends Lightning.Component
{
	// render movie list container that will be scrolled
	static _template()
	{
		return {
			List: {
				type: List,
				x: 0,
				y: 0,
				w: StageSize.width - 40,
				h: 190,
				spacing: 20,
			}
		}
	}

	setMovies(movies)
	{
		var list = this.tag('List');

		list.clear();
		list.add(movies.map(m => {
			return {
				type: MovieListItem,
				w: THUMB_WIDTH,
				h: THUMB_HEIGHT,
				color: 0xFFCCCCCC,
				info: m,
			}
		}));
	}

	_getFocused()
	{
		return this.tag('List');
	}

	_init()
	{
		this.lastMovies = null;
	}

	_enable()
	{
		this.unsubFromStore = store.subscribe(() => {
			let state = store.getState();

			// kinda kludgy way to see if we need to refresh the movie list
			if (this.lastMovies != state.movies)
			{
				let movies = state.movieIds.map(id => state.movies[id]);

				this.lastMovies = state.movies;
				this.setMovies(movies);
			}
		});
	}

	_disable()
	{
		if (this.unsubFromStore)
			this.unsubFromStore();
	}
}