import React, {useContext, useEffect, useState} from 'react'
import {Context} from "../index.js";
import { CiPlay1, CiPause1 } from 'react-icons/ci/index.esm.js';
import {observer} from "mobx-react-lite";
import { IoVolumeHighOutline } from "react-icons/io5";
import { IoVolumeMuteOutline } from "react-icons/io5";

function Slider () {
    const [currentValue, setCurrentValue] = useState(0)
    const {indexStore} = useContext(Context)

    useEffect(() => {
        setCurrentValue((indexStore.currentTime / indexStore.duration) * 100)
    }, [indexStore.currentTime])

    const handleSlide = (e) => {
        console.log(indexStore.isPlaying)
        indexStore.setCurrentTime((e.target.value * indexStore.duration) / 100);
        indexStore.audio.currentTime = (e.target.value * indexStore.duration) / 100;
    }

    const handleMouseDown = () => {
        if(indexStore.isPlaying){
            indexStore.audio.pause();
            indexStore.setPaused(true);
        }
    }

    const handleMouseUp = () => {
        if(indexStore.isPlaying){
            indexStore.audio.play();
            indexStore.setPaused(false);
        }
    }

    const handleVolume = () => {
        if(indexStore.volume === 0){
            indexStore.setVolume(indexStore.previousVolume);
            indexStore.setPreviousVolume(0);
            indexStore.setVolume(indexStore.volume);
        }
        else {
            indexStore.setPreviousVolume(indexStore.volume);
            indexStore.setVolume(0);
            indexStore.setVolume(0)
        }
    }

    const handleVolumeChange = (e) => {
        indexStore.setVolume(e.target.value / 100);
    }

    const togglePlay = () => {
        if(indexStore.isPlaying) {
            indexStore.setPlaying(-1);
            indexStore.audio.pause();
        }
        else {
            indexStore.setPlaying(1);
            indexStore.audio.currentTime -= 0.000001;
            indexStore.audio.currentTime += 0.000001;
            indexStore.audio.play();
        }
    };

    return (
        <div className="sliderContainer">
            <p className="titleSlider">{localStorage.getItem('currentTitle')}</p>
            {indexStore.volume > 0 ?
                <IoVolumeHighOutline className="volume" onClick={() => handleVolume()} />
                :
                <IoVolumeMuteOutline className="volume" onClick={() => handleVolume()} />
            }
            {indexStore.isPlaying ? (
                <CiPause1
                    className="playSlider"
                    onClick={() => togglePlay()}
                />
            ) : (
                <CiPlay1
                    className="playSlider"
                    onClick={() => togglePlay()}
                />
            )}
            <input
                className="volumeSlider"
                type="range"
                min='0'
                max='100'
                value={indexStore.volume * 100}
                onChange={(e) => handleVolumeChange(e)}
            />
            <input
                className="inputSlider"
                type='range'
                min='0'
                max='100'
                value={currentValue}
                onMouseDown={() => handleMouseDown()}
                onMouseUp={() => handleMouseUp()}
                onChange={(e) => handleSlide(e)}
            />
        </div>
    )
}

export default observer(Slider);
