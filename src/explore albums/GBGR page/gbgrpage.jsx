import React, {useContext} from 'react'
import GBGRimg from './GBGRimg.png'
import JuiceGBGR_up from './juice_1_up.png'
import JuiceGBGR_down from './juice_1_down.png'
import TrackList from "../tracklist.js";
import LucidDreams from './Juice WRLD - Lucid Dreams.mp3'
import LeanWitMe from './Juice WRLD - Lean Wit Me.mp3'
import BlackAndWhite from './Juice WRLD - Black  и  White Prod B.mp3'
import EndOfTheRoad from './Juice WRLD - End Of The Road Prod B.mp3'
import LongGone from './Juice WRLD - Long Gone Prod By Cardo.mp3'
import HurtMe from './Juice WRLD - hurt Me Prod By Nick M.mp3'
import AGATS from './Juice WRLD - All Girls Are The Same.mp3'
import ImStill from './Juice WRLD - Im Still Prod By Nick.mp3'
import ScaredOfLove from './Juice WRLD - Scared Of Love Prod By.mp3'
import IllBeFine from './Juice WRLD - Ill Be Fine Prod By Ni.mp3'
import ArmedAndDangerous from './Juice WRLD - Armed And Dangerous.mp3'
import Wasted from './Juice WRLD - Wasted (Feat Lil Uzi V.mp3'
import UsedTo from './Juice WRLD - Used To Prod By Nick Mira.mp3'
import Slider from "../slider.jsx";
import {Context} from "../../index.js";

const tracks_GBGR = [{title: "Lucid Dreams", song: LucidDreams, id: 1},
    {title: "Lean Wit Me", song: LeanWitMe, isPlaying: false, id: 2},
    {title: "Black & White", song: BlackAndWhite, isPlaying: false, id: 3},
    {title: "End of the Road", song: EndOfTheRoad, isPlaying: false, id: 4},
    {title: "Long Gone", song: LongGone, isPlaying: false, id: 5},
    {title: "Hurt Me", song: HurtMe, isPlaying: false, id: 6},
    {title: "All Girls Are The Same", song: AGATS, isPlaying: false, id: 7},
    {title: "I’m Still", song: ImStill, isPlaying: false, id: 8},
    {title: "Scared of Love", song: ScaredOfLove, isPlaying: false, id: 9},
    {title: "I'll Be Fine", song: IllBeFine, isPlaying: false, id: 10},
    {title: "Armed And Dangerous", song: ArmedAndDangerous, isPlaying: false, id: 11},
    {title: "Wasted", song: Wasted, isPlaying: false, id: 12},
    {title: "Used To", song: UsedTo, isPlaying: false, id: 13},
]
function GBGRPage() {
    const {indexStore} = useContext(Context)

    return (
        <div className="background_albums">
            {indexStore.showSlider && <Slider />}
            <div className="trackListSpace">
                <TrackList tracks={tracks_GBGR} tracksAmount={13} />
            </div>
            <div>
                <img className="albumsMainIMG" src={GBGRimg} alt="" />
                <p className="albumLabel gbgrLabel">Goodbye And Good <br /> Riddance</p>
                <p className="GBGR_lyric">
                    "I Still See Your Shadows <br /> In My Room"
                </p>
            </div>
            <div>
                <img className="JuiceGBGR_up" src={JuiceGBGR_up} alt="" />
                <img className="JuiceGBGR_down" src={JuiceGBGR_down} alt="" />
            </div>
        </div>
    );
}

export default GBGRPage;