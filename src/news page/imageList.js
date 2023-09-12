import React from 'react'

function ImageList ({data}) {
    const newsList = data.map((item, index) => (
        <li className="container_news" key={index}>
            <img className="image_news" src={`data:image/png;base64, ${item.image}`} />
            <p className="text_news">{item.text}</p>
        </li>
    ));

    return (
        <div>
            {newsList}
        </div>
    )
}

export default ImageList;