import React from 'react'
import LNDimg from './LND.png'
import JuiceLND_down from './juice_3_down.png'
import JuiceLND_up from './juice_3_up.png'
import TrackList from "../tracklist.js";

const tracks_LND = [
    {title: "Conversations", isPlaying: false,  id: 1},
    {title: "Titanic", isPlaying: false,  id: 2},
    {title: "Bad Energy", isPlaying: false,  id: 3},
    {title: "Righteous", isPlaying: false,  id: 4},
    {title: "Blood On My Jeans", isPlaying: false,  id: 5},
    {title: "Tell Me U Luv Me", isPlaying: false,  id: 6},
    {title: "Hate the Other Side", isPlaying: false,  id: 7},
    {title: "Life’s a Mess", isPlaying: false,  id: 8},
    {title: "Come & Go", isPlaying: false,  id: 9},
    {title: "I Want It", isPlaying: false,  id: 10},
    {title: "Fighting Demons", isPlaying: false,  id: 11},
    {title: "Wishing Well", isPlaying: false,  id: 12},
    {title: "Screw Juice", isPlaying: false,  id: 13},
    {title: "Up Up and Away", isPlaying: false,  id: 14},
    {title: "Stay High", isPlaying: false,  id: 15},
    {title: "Can’t Die", isPlaying: false,  id: 16},
    {title: "Man of the Year", isPlaying: false,  id: 17}
]

function LNDPage () {
    return (
        <div className="background_albums" style={{overflowY: "auto"}}>
            <div className="trackListSpace">
                <TrackList tracks={tracks_LND} />
            </div>
            <div>
                <img className="albumsMainIMG" src={LNDimg} alt="" style={{position: "fixed"}} />
                <p className="albumLabel lndLabel" style={{position: "fixed"}}>Legends Never Die</p>
                <p className="GBGR_lyric" style={{position: "fixed"}}>          {/*probably should change the selectors*/}
                    "Sometimes Life's A Mess"
                </p>
            </div>
            <div>
                <img className="JuiceDRFL_up" src={JuiceLND_up} alt="" style={{position: "fixed"}} />
                <img className="JuiceDRFL_down" src={JuiceLND_down} alt="" style={{position: "fixed"}} />
            </div>
        </div>
    )
}

export default LNDPage;