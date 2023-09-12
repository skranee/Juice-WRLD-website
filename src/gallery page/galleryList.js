import React from 'react'
import painting from "./painting.png";

function GalleryList ({gallery}) {
    return (
            <ul className="paintingsLine">
                {gallery.map((item, index) => (
                    <li className="paintings" key={index}>
                        <img src={painting} className="frame" alt=''/>
                        <div className="paintingText">
                            {item}
                        </div>
                    </li>
                ))}
            </ul>
    )
}

export default GalleryList;