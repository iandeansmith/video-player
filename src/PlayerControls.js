
import { Lightning, Utils } from "@lightningjs/sdk";

import PlayerButton from "./PlayerButton";

export default class PlayerControls extends Lightning.Component
{
    static _template()
    {
        return {
            Layout: {
                x: 0,
                y: 0,
                w: w => w,
                h: h => h,

                flex: {
                    padding: 20,
                    justifyContent: 'center'
                },

                children: [
                    {
                        ref: 'PlaybackButton',
                        type: PlayerButton,
                        icon: Utils.asset('images/play-solid.png'),
                        visible: true,
                        h: 100,
                        w: 100,
                        flexItem: {
                            marginRight: 20,
                        }
                    },

                    {
                        color: 0xFFFF00FF,
                        rect: true,
                        h: 100,
                        flexItem: {
                            grow: 1,
                        }
                    },
                ]
            }
        }
    }

    setPlaying(flag)
    {
        var button = this.tag('Layout').childList.getByRef('PlaybackButton');

        console.log(button);

        if (flag)
        {
            console.log('PLAYING');
            button.patch({ 
                icon: Utils.asset('images/pause-solid.png')
            });
        }
        else
        {
            button.patch({ 
                icon: Utils.asset('images/play-solid.png')
            });

        }
    }

    _init()
    {
        this.focusedChild = 0;
    }

    _getFocused()
    {
        return this.tag('Layout').children[this.focusedChild];
    }
}