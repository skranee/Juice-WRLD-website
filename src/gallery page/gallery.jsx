import React, {useContext, useEffect, useState} from 'react'
import light from './light.png'
import {Context} from "../index.js";
import GalleryList from "./galleryList.js";

function Gallery () {
    const {store} = useContext(Context)
    const [gallery, setGallery] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [openResult, setOpenResult] = useState(false)
    const [achievement, setAchievement] = useState('')
    const [result, setResult] = useState('')

    useEffect(() => {
        async function fetch () {
            const fetchedGallery = await store.getGallery();
            setGallery(fetchedGallery)
        }

        fetch()
    }, []);

    const handleChange = (text) => {
        setAchievement(text);
    }

    const handleAdd = () => {
        if (achievement !== '' && achievement.trim() !== '') {
            store.makeAchievement(achievement)
            setResult('Achievement added!')
        } else {
            if (achievement === '' || achievement.trim() === '') {
                setResult('The text must not be empty!');
            } else {
                setResult('Error!');
            }
        }
        setModalOpen(false);
        setOpenResult(true);
    }

    const handleOk = () => {
        setOpenResult(false);
        window.location.replace('http://localhost:5001/gallery');
    }

    const handleBlur = () => {
        setModalOpen(false);
    }

    return(
        <div className="background_gallery">
            {localStorage.getItem('role') === 'admin' &&
                <button className="btnAdd" onClick={() => setModalOpen(true)}>
                    +
                </button>
            }
            <img src={light} className="light no-select" alt="" draggable="false"/>
            <GalleryList gallery={gallery} />
            {modalOpen && (
                <div className="background_confirmation" onClick={() => handleBlur()}>
                    <div className="modalMakeNews" onClick={(e) => e.stopPropagation()}>
                        <textarea
                            className="newsText"
                            onChange={(event) => handleChange(event.target.value)}
                            placeholder="Write new achievement here..."
                            value={achievement}
                        />
                        <button className="btnSendNews" onClick={() => handleAdd()}>
                            Confirm
                        </button>
                    </div>
                </div>
            )}
            {openResult && (
                <div className="background_confirmation">
                    <div className="successWindow">
                        <a className="textSent">{result}</a>
                        <button className="okBtn" onClick={() => handleOk()}>
                            Continue
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Gallery;