
import { Lightning, Utils } from '@lightningjs/sdk';
import { Carousel } from '@lightningjs/ui';

import MovieListItem from './MovieListItem';

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
				type: Carousel,
				x: 0,
				y: 0,
				w: 1880,
				h: 190,
				spacing: 20,
				signals: {
					onIndexChanged: '_changedIndex'
				}
			}
		}
	}

	setMovies(movies)
	{
		this.movies = [...movies];

		this.tag('List').add(this.movies.map(m => {
			return {
				type: MovieListItem,
				w: THUMB_WIDTH,
				h: THUMB_HEIGHT,
				color: 0xFFCCCCCC,
				info: m,
			}
		}));
	}

	_changedIndex(data)
	{
		console.log(data.index);
	}

	_focus()
	{
		console.log('Movie list has focus?');
	}

	_getFocused()
	{
		return this.tag('List');
	}

	_captureEnter()
	{
		console.log(`Enter pressed: ${this.tag('List').index}`);
		return true;
	}
}