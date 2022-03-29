
import { Lightning, Utils, Img } from "@lightningjs/sdk";

export default class MovieListItem extends Lightning.Component
{
	static _template()
	{
		return {
			transitions: {
				scale: { duration: 0.5 },
			},

			BG: {
				rect: true,
				x: 0, 
				y: 0,
				w: w => w, 
				h: h => h,
				color: 0xFFCCCCCC,
			},

			Thumbnail: {
				texture: Img(Utils.asset('images/koalabear.jpg')).cover(400, 250),
				x: 0,
				y: 0,
				w: w => w,
				h: h => h, 
			},

			Cover: {
				rect: true,
				x: 0,
				y: 0,
				w: w => w,
				h: h => h, 
				colorTop: 0,
				colorBottom: 0x99000000,
				transitions: {
					colorBottom: { duration: 0.5 },
				}
			},

			Title: {
				x: 10,
				y: h => h - 40,
				text: {
					fontSize: 24,
					text: '<movie name>',
					textColor: 0xFFFFFFFF,
				},
			}
		}
	}

	_setup()
	{
		this.tag('Title').patch({
			text: { text: this.info.title }
		});
	}

	_focus()
	{
		this.patch({ 
			smooth: { scale: 1.05 },
		});
		this.tag('BG').patch({ color: 0xFFFF00FF });
		this.tag('Cover').patch({ smooth: { colorBottom: 0xFF000000 } });
	}

	_unfocus()
	{
		this.patch({ 
			smooth: { scale: 1.0 },
		});
		this.tag('BG').patch({ color: 0xFFCCCCCC });
		this.tag('Cover').patch({ smooth: { colorBottom: 0x99000000 } });
	}
}