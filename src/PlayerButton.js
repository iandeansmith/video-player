
import { Lightning, Utils, Img, VideoPlayer } from "@lightningjs/sdk";

export default class PlayerButton extends Lightning.Component
{
    static _template()
    {
        return {
            BG: {
                color: 0x7FFFFFFF,
                rect: true,
                x: 0,
                y: 0,
                w: w => w,
                h: h => h,
                transitions: {
                    color: { duration: 0.5 },
                }
            },

            Icon: {
                x: 0,
                y: 0,
                w: w => w,
                h: h => h,
            }
        }
    }

    _setup()
    {
        this.tag('Icon').patch({
            texture: Img(this.icon).contain(100, 100),
        })
    }

    _stopAnimation()
    {
        if (this.pressedAnim != null)
            this.pressedAnim.finish();
    }

    _stopTransition()
    {
        this.tag('BG').transition('color').finish();
    }

    _focus()
    {
        this.tag('BG').patch({
            smooth: {
                color: 0x7F0000FF,
            }
        });
    }

    _onfocus()
    {
        this.tag('BG').patch({
            smooth: {
                color: 0x7FFFFFFF,
            }
        });
    }

    _handleEnter()
    {
        //this._stopTransition();
        // add effect when clicked
        this.pressedAnim = this.tag('BG').animation({
            duration: 1,
            repeat: 0,
            stopMethod: 'immediate',
            actions: [
                {
                    p: 'color',
                    v: {
                        0: 0xFF0000FF,
                        1: 0x7F0000FF
                    }
                }
            ]
        });
        this.pressedAnim.start();

        // toggle video playback
        VideoPlayer.playPause();
    }
}