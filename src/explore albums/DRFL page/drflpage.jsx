import React from 'react'
import DRFLimg from './DRFL.png'
import JuiceDRFL_down from './juice_2_down.png'
import JuiceDRFL_up from './juice_2_up.png'
import TrackList from "../tracklist.js";

const tracks_DRFL = [
    {title: "ON GOD", isPlaying: false,  id: 1},
    {title: "Ring Ring", isPlaying: false,  id: 2},
    {title: "Empty", isPlaying: false,  id: 3},
    {title: "Desire", isPlaying: false,  id: 4},
    {title: "HeMotions", isPlaying: false,  id: 5},
    {title: "Out My Way", isPlaying: false,  id: 6},
    {title: "Maze", isPlaying: false,  id: 7},
    {title: "Feeling", isPlaying: false,  id: 8},
    {title: "Robbery", isPlaying: false,  id: 9},
    {title: "10 Feet", isPlaying: false,  id: 10},
    {title: "Syphilis", isPlaying: false,  id: 11},
    {title: "Rider", isPlaying: false,  id: 12},
    {title: "Who Shot Cupid?", isPlaying: false,  id: 13},
    {title: "Make Believe", isPlaying: false,  id: 14},
    {title: "The Bees Knees", isPlaying: false,  id: 15},
    {title: "She’s the One", isPlaying: false,  id: 16},
    {title: "Hear Me Calling", isPlaying: false,  id: 17},
    {title: "Fast", isPlaying: false,  id: 18},
    {title: "Won’t Let Go", isPlaying: false,  id: 19},
    {title: "Big", isPlaying: false,  id: 20},
    {title: "Flaws and Sins", isPlaying: false,  id: 21}
]

function DRFLPage () {
    return (
        <div className="background_albums" style={{overflowY: "auto"}}>
            <div className="trackListSpace">
                <TrackList tracks={tracks_DRFL} />
            </div>
            <div>
                <img className="albumsMainIMG" src={DRFLimg} alt="" style={{position: "fixed"}} />
                <p className="albumLabel drflLabel" style={{position: "fixed"}}>Death Race <br /> For Love</p>
                <p className="GBGR_lyric" style={{position: "fixed"}}>          {/*probably should change the selectors*/}
                    "And Nobody Gets Hurt"
                </p>
            </div>
            <div>
                <img className="JuiceDRFL_up" src={JuiceDRFL_up} alt="" style={{position: "fixed"}} />
                <img className="JuiceDRFL_down" src={JuiceDRFL_down} alt="" style={{position: "fixed"}} />
            </div>
        </div>
    )
}

export default DRFLPage;