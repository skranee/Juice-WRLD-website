import React, { useContext, useState } from 'react';
import ImageList from './imageList';
import { Context } from '../index.js';

function NewsPage({ newsData }) {
    const { store } = useContext(Context);
    const [image, setImage] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [newsText, setNewsText] = useState('');
    const [result, setResult] = useState('');
    const [openResult, setOpenResult] = useState(false);

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleMake = () => {
        if (newsText !== '' && newsText.trim() !== '' && image !== null) {
            const formData = new FormData();
            formData.append('text', newsText);
            formData.append('image', image);

            console.log(formData.get('image').type);
            if (!formData.has('text') || !formData.has('image')) {
                console.log('Missing!');
                setResult('FormData empty!');
            } else {
                store.makeNews(formData);
                setResult('News created!')
            }
        } else {
            if (newsText === '' || newsText.trim() === '') {
                setResult('The text must not be empty!');
            } else if (image === null) {
                setResult('Choose image!');
            } else {
                setResult('Error!');
            }
        }
        setModalOpen(false);
        setOpenResult(true);
    };

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleChange = (text) => {
        setNewsText(text);
    };

    const handleOk = () => {
        window.location.replace('http://localhost:5001/news');
    };

    const handleBlur = () => {
        setModalOpen(false)
    }

    return (
        <div className="main_news">
            {store.user.role === 'admin' && (
                <>
                    <button className="btnMakeNews" onClick={() => handleOpenModal()}>
                        +
                    </button>
                        {modalOpen && (
                            <div className="background_confirmation" onClick={() => handleBlur()}>
                                <div className="modalMakeNews" onClick={(e) => e.stopPropagation()}>
                                    <textarea
                                        className="newsText"
                                        onChange={(event) => handleChange(event.target.value)}
                                        placeholder="Write the text for the news here..."
                                        value={newsText}
                                    />
                                    <input
                                        className="chooseFile"
                                        type="file"
                                        accept=".jpg, .jpeg, .png, .gif"
                                        name="image"
                                        style={{display: "none"}}
                                        onChange={(e) => handleFileChange(e)}
                                    />
                                    <button
                                        className="chooseFile"
                                        onClick={() => document.querySelector('.chooseFile').click()}
                                    >
                                        Upload Image
                                    </button>
                                    {image && <p className="chosenFile">{image.name}</p>}
                                    <button className="btnSendNews" onClick={() => handleMake()}>
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
                </>
            )}
            {store.user.role ? (
                <ImageList data={newsData} />
            ) : (
                <a className="authAlert">Authorize to see the news</a>
            )}
        </div>
    );
}

export default NewsPage;
