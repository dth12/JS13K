import Piano from '../../utils/sound/piano';
import Sequences from '../../utils/sound/sequences';

export default AFRAME.registerComponent('gameaudio', {
  schema: {
    sequence: {default: 's4'},
    tempo: {default: 30},
    autoplay: {default: false},
    volume: {default: 0.2},
    loop: {default: false}
  },
  init: function(){
    console.log("gameaudio init");

    this.instrument = new Piano(this.system.audioContext);
    this.playedFirstTime = false;
    
    if(this.data.autoplay){
      window.addEventListener('click', ()=> {
        if (!this.playedFirstTime){
          this.playSound();
          this.playedFirstTime = true;
        }
      })
    }
  },
  playSound: function() {
    let sequence = Sequences[this.data.sequence];
    let endTime = this.system.playSequence(sequence, this.data.tempo, this.instrument, this.data.volume)
    
    console.log('playSound sequence');
    console.log(sequence);
    
    if(this.data.loop){
      setTimeout(this.playSound.bind(this),endTime*1000);
    }
  }
});
