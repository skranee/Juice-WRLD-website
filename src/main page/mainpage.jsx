import React from 'react';
import jw_left from './jwleft.png'
import jw_right from './jwright.png'
import background_main from './homepagewall.jpg'
import album_1 from './Group 1.png'
import album_2 from './Group 2.png'
import album_3 from './Group 3.png'
import album_4 from './Group 4.png'
import rope from './rope.png'

function MainPage() {
    return (
        <div className="main">
            <div className="rope">
                <img className="img_rope" src={rope} />
            </div>
            <div className="albums">
                <img className="album_2" src={album_2} />
            </div>
            <div className="albums">
                <img className="album_3" src={album_3} />
            </div>
            <div className="albums">
                <img className="album_4" src={album_4} />
            </div>
            <div className="albums">
                <img className="album_1" src={album_1} />
            </div>
            <h1 className="JWwrld">Juice WRLD's  <br/> WRLD</h1>
            <div className="jw_left">
                <img className="img_jw_left" src={jw_left}/>
            </div>
            <div className="jw_right">
                <img className="img_jw_right" src={jw_right} />
            </div>
            <div>
                <img className="background" src={background_main} />
            </div>
        </div>
    );
}

export default MainPage;