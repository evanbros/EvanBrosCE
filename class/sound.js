class Sound {
  playSound(sound) {
    sound.play();
  }
  stopSound(sound) {
    sound.pause();
    sound.currentTime = 0;
  }
  pauseSound(sound) {
    sound.pause();
  }
  setVolume(sound, volume) {
    sound.volume = volume;
  }
}