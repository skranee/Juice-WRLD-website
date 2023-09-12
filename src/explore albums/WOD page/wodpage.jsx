import React from 'react'
import WODimg from './WOD.png'
import JuiceWOD_down from './juice_5_down.png'
import JuiceWOD_up from './juice_5_up.png'
import TrackList from "../tracklist.js";

const tracks_WOD = [
    {title: "Ain't Livin Right", isPlaying: false,  id: 1},
    {title: "Transformer", isPlaying: false,  id: 2},
    {title: "Red Bentley", isPlaying: false,  id: 3},
    {title: "Different", isPlaying: false,  id: 4},
    {title: "Oxy", isPlaying: false,  id: 5},
    {title: "Jet Lag", isPlaying: false,  id: 6},
    {title: "Astronauts", isPlaying: false,  id: 7},
    {title: "WRLD On Drugs", isPlaying: false,  id: 8},
    {title: "No Issue", isPlaying: false,  id: 9},
    {title: "Make It Back", isPlaying: false,  id: 10},
    {title: "Realer N Realer", isPlaying: false,  id: 11},
    {title: "Fine China", isPlaying: false,  id: 12},
    {title: "Afterlife", isPlaying: false,  id: 13}, //have to fix that ain't no screw juice in FD
    {title: "7 Am Freestyle", isPlaying: false,  id: 14},
    {title: "Hard Work Pays Off", isPlaying: false,  id: 15},
    {title: "Shorty", isPlaying: false,  id: 16}
]

function WODPage () {
    return (
        <div className="background_albums" style={{overflowY: "auto"}}>
            <div className="trackListSpace">
                <TrackList tracks={tracks_WOD} />
            </div>
            <div>
                <img className="albumsMainIMG" src={WODimg} alt="" style={{position: "fixed"}} />
                <p className="albumLabel fdLabel" style={{position: "fixed"}}>Fighting Demons</p>
                <p className="GBGR_lyric" style={{position: "fixed", left: "5.5%"}}>          {/*probably should change the selectors*/}
                    "Came Up On A Couple <br /> Of Million"
                </p>
            </div>
            <div>
                <img className="JuiceDRFL_up" src={JuiceWOD_up} alt="" style={{position: "fixed"}} />
                <img className="JuiceDRFL_down" src={JuiceWOD_down} alt="" style={{position: "fixed"}} />
            </div>
        </div>
    )
}

export default WODPage;