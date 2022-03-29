
import { Lightning, Utils } from "@lightningjs/sdk";
import axios from "axios";

import MovieList from './MovieList';

export default class MainApp extends Lightning.Component
{
	static getFonts() 
	{
		return [{ family: 'Regular', url: Utils.asset('fonts/Roboto-Regular.ttf') }]
	}
	
	static _template()
	{
		return {
			BG: {
				rect: true,
				x: 0, y: 0, w: 1920, h: 1080,
				color: 0xFFEFEFEF,
			},

			Movies: {
				type: MovieList,
				show: false,
				x: 20, y: 20, w: 1880, h: 190,
				movies: [],
			},
		}
	}

	_getFocused()
	{
		return this.tag('Movies');
	}

	async _init()
	{
		try
		{
			var result = await axios.get(Utils.asset('movies.json'));

			this.tag('Movies').setMovies(result.data.movies);
		}
		catch(err)
		{
			alert(err.message);
		}
	}
}