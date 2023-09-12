import React, {useState, useRef, useEffect, useContext} from 'react';
import { CiPlay1, CiPause1 } from 'react-icons/ci/index.esm.js';
import {Context} from "../index.js";
import {observer} from "mobx-react-lite";

function TrackList({ tracks, tracksAmount }) {
    const {indexStore} = useContext(Context)
    const [currentPlayingId, setCurrentPlayingId] = useState(-1);
    const audioRefs = useRef(tracks.map(() => React.createRef()));

    useEffect(() => {
        indexStore.setPlaying(currentPlayingId);
    }, [currentPlayingId])

    useEffect(() => {
        tracks.forEach((track, index) => {
            const audio = audioRefs.current[index].current;
            audio.src = track.song;
            audio.addEventListener('timeupdate', () => handleTimeUpdate(index, audio.currentTime));
        });
    }, [tracks]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === ' ' || event.key === 'Spacebar') {
                event.preventDefault();
                togglePlay(currentPlayingId);
            }
        };
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [/*?*/]);

    const handleTimeUpdate = (index, time) => {
        indexStore.setCurrentTime(time)
        if(indexStore.isPlaying && indexStore.currentTime === indexStore.duration) {
            if(index === tracksAmount - 1) {
                togglePlay(0)
            }
            else {
                togglePlay(index + 1)
            }
        }
    };

    const togglePlay = (index) => {
        indexStore.setSlider(true)
        indexStore.setDuration(audioRefs.current[index].current.duration)
        const audio = audioRefs.current[index].current;
        handleTimeUpdate(index, audio.currentTime)
        indexStore.setAudio(audioRefs.current[index].current)
        localStorage.setItem('currentTitle', tracks[index].title)
        if (currentPlayingId === index) {
            if(indexStore.isPlaying) {
                audio.pause();
                setCurrentPlayingId(-1);
            }
            else {
                audio.play();
                indexStore.setPlaying(1)
            }
        } else {
            if (currentPlayingId !== -1) {
                audioRefs.current[currentPlayingId].current.pause();
                audioRefs.current[currentPlayingId].current.currentTime = 0;
            }
            else if (indexStore.isPlaying) {
                audio.pause();
                indexStore.setPlaying(-1);
                return;
            }
            setCurrentPlayingId(index);
            if(indexStore.audio !== audio) {
                indexStore.setCurrentTime(0);
            }
            audio.play();
        }
    };

    return (
        <div>
            <ul>
                {tracks.map((track, index) => (
                    <li key={track.id} className="trackList">
                        <audio ref={audioRefs.current[index]}></audio>
                        {(indexStore.audio === audioRefs.current[index].current && indexStore.isPlaying) ? (
                            <CiPause1
                                className="pause-icon"
                                onClick={() => togglePlay(index)}
                            />
                        ) : (
                            <CiPlay1
                                className="play-icon"
                                onClick={() => togglePlay(index)}
                            />
                        )}
                        <p onClick={() => togglePlay(index)} className="title">
                            {track.title}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default observer(TrackList);