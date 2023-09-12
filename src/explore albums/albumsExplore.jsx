import React from 'react'
import GBGR from './GBGR.png'
import DRFL from './DRFL.png'
import LND from './LND.png'
import WOD from './WOD.png'
import FD from './FD.png'
import {useNavigate} from "react-router-dom";

function AlbumsExplore () {
    const navigate = useNavigate()
    const handleNavigate = (url) => {
        navigate(url)
    }

    return (
        <div className="background_albums">
            <div>
                <img
                    onClick={() => handleNavigate('/albumgbgr')}
                    className="albumCover album_GBGR"
                    src={GBGR}
                    alt=""
                />
                <p onClick={() => handleNavigate('/albumgbgr')} className="albumLabel label_GBGR">
                    Goodbye And Good <br /> Riddance
                </p>
            </div>
            <div>
                <img
                    onClick={() => handleNavigate('/albumdrfl')}
                    className="albumCover album_DRFL"
                    src={DRFL}
                    alt=""
                />
                <p onClick={() => handleNavigate('/albumdrfl')} className="albumLabel label_DRFL">
                    Death Race For <br /> Love
                </p>
            </div>
            <div>
                <img
                    onClick={() => handleNavigate('/albumlnd')}
                    className="albumCover album_LND"
                    src={LND}
                    alt=""
                />
                <p onClick={() => handleNavigate('/albumlnd')} className="albumLabel label_LND">
                    Legends Never Die
                </p>
            </div>
            <div>
                <img
                    onClick={() => handleNavigate('/albumwod')}
                    className="albumCover album_WOD"
                    src={WOD}
                    alt=""
                />
                <p onClick={() => handleNavigate('/albumwod')} className="albumLabel label_WOD">
                    WRLD On Drugs <br /> (ft. Future)
                </p>
            </div>
            <div>
                <img
                    onClick={() => handleNavigate('/albumfd')}
                    className="albumCover album_FD"
                    src={FD}
                    alt=""
                />
                <p onClick={() => handleNavigate('/albumfd')} className="albumLabel label_FD">
                    Fighting Demons
                </p>
            </div>
        </div>
    )
}

export default AlbumsExplore;