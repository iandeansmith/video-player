
import { Lightning, Router, VideoPlayer } from "@lightningjs/sdk";

import PlayerControls from "./PlayerControls";
import { StageSize } from './const';

import store from './store';

const CONTROLS_WIDTH = 900;

export default class MoviePlayer extends Lightning.Component
{
    static _template()
    {
        return {
            Controls: {
                type: PlayerControls,
                x: (StageSize.width / 2) - (CONTROLS_WIDTH / 2),
                y: StageSize.height - 150,
                w: CONTROLS_WIDTH,
                h: 100
            }
        }
    }

    set params(args)
    {
        this.movieId = args.id;
    }

    _startMovie()
    {
        this.movie = store.getState().movies[this.movieId];
        VideoPlayer.open(this.movie.video);
    }

    _init()
    {
        this.movie = null;
        this.paused = false;
    }

    _getFocused()
    {
        return this.tag('Controls');
    }

    _firstActive()
    {
        VideoPlayer.consumer(this);
    }

    _enable()
    {
        this._startMovie();
    }

    _disable()
    {
        VideoPlayer.clear();
    }

    _handleLeft()
    {
        Router.back();
    }

    $videoPlayerPause()
    {
        this.tag('Controls').setPlaying(false);
    }

    $videoPlayerPlaying()
    {
        this.tag('Controls').setPlaying(true);
    }
}