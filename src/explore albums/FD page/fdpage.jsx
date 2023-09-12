import React from 'react'
import FDimg from './FD.png'
import JuiceFD_down from './juice_4_down.png'
import JuiceFD_up from './juice_4_up.png'
import TrackList from "../tracklist.js";

const tracks_FD = [
    {title: "Girl of My Dreams", isPlaying: false,  id: 1},
    {title: "Feline", isPlaying: false,  id: 2},
    {title: "Wandered to LA", isPlaying: false,  id: 3},
    {title: "Not Enough", isPlaying: false,  id: 4},
    {title: "Burn", isPlaying: false,  id: 5},
    {title: "From My Window", isPlaying: false,  id: 6},
    {title: "Until the Plug Comes Back Around", isPlaying: false,  id: 7},
    {title: "Go Hard", isPlaying: false,  id: 8},
    {title: "My Life in a Nutshell", isPlaying: false,  id: 9},
    {title: "Rockstar in His Prime", isPlaying: false,  id: 10},
    {title: "Already Dead", isPlaying: false,  id: 11},
    {title: "Doom", isPlaying: false,  id: 12},
    {title: "Screw Juice", isPlaying: false,  id: 13}, //have to fix that ain't no screw juice in FD
    {title: "Feel Alone", isPlaying: false,  id: 14},
    {title: "You Wouldn't Understand", isPlaying: false,  id: 15},
    {title: "Relocate", isPlaying: false,  id: 16}
]

function FDPage () {
    return (
        <div className="background_albums" style={{overflowY: "auto"}}>
            <div className="trackListSpace">
                <TrackList tracks={tracks_FD} />
            </div>
            <div>
                <img className="albumsMainIMG" src={FDimg} alt="" style={{position: "fixed"}} />
                <p className="albumLabel fdLabel" style={{position: "fixed"}}>Fighting Demons</p>
                <p className="GBGR_lyric" style={{position: "fixed", left: "7%"}}>          {/*probably should change the selectors*/}
                    "This Is My Life In A <br /> Nutshell"
                </p>
            </div>
            <div>
                <img className="JuiceDRFL_up" src={JuiceFD_up} alt="" style={{position: "fixed"}} />
                <img className="JuiceDRFL_down" src={JuiceFD_down} alt="" style={{position: "fixed"}} />
            </div>
        </div>
    )
}

export default FDPage;