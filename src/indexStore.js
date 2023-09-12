import { makeAutoObservable } from 'mobx';

export default class IndexStore {
    index = null;
    showSlider = false;
    currentTime = 0;
    duration = 0;
    audio = null;
    paused = false;
    volume = 0.5;
    previousVolume = 0.5;
    isPlaying = false;

    constructor() {
        makeAutoObservable(this);
    }

    setIndex(newIndex) {
        this.index = newIndex;
    }

    setSlider(bool){
        this.showSlider = bool;
    }

    setCurrentTime(time) {
        this.currentTime = time;
    }

    setDuration(duration) {
        this.duration = duration;
    }

    setAudio(audio) {
        this.audio = audio;
        this.audio.volume = this.volume;
    }

    setPaused(bool) {
        this.paused = bool;
    }

    setVolume(vol) {
        this.volume = vol;
        this.audio.volume = this.volume;
    }

    setPreviousVolume(prevVol) {
        this.previousVolume = prevVol;
    }

    setPlaying(index) {
        if(index + 1) {
            this.isPlaying = true;
        }
        else {
            this.isPlaying = false;
        }
    }
}