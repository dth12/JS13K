import Instrument from './instrument';
class Piano extends Instrument {
  constructor(audioContext){
    super(audioContext, 5);
  }
  playNote(noteFreq, noteTime, decTime, volume){
    let [oscillators, gains] = this.createOscillators();
    this.setFrequencies(oscillators, [
      noteFreq,
      noteFreq + (Math.random() * 10) - 5,
      noteFreq + (Math.random() * 15) - 5,
      noteFreq / 2,
      noteFreq / 4
    ]);
    this.setGains(gains, [
      volume * 0.2,
      volume * 0.15,
      volume * 0.12,
      volume * 0.1,
      volume * 0.05
    ]);
    this.start(oscillators, this.context.currentTime + noteTime);
    let atenuation = decTime * 1.0;
    this.setExponentialRampToValueAtTime(gains, this.context.currentTime + noteTime + atenuation)
    let stopDelay = decTime * 1.5;
    this.stop(oscillators, this.context.currentTime + noteTime + stopDelay);
  }
}
export default Piano;
