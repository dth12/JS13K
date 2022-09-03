const SEQUENCES = ['vertigo', 'silence', 'proof'];

export default AFRAME.registerSystem('game-manager', {
  init: function() {
    window.onload = function() {
      this.level = 0;
    }.bind(this);
  },
  onGoalReached: function() {
    this.level++;
    this.blinkAndLoadLevel();
    let newSeq = SEQUENCES[Math.floor(Math.random()*3)];
    document.querySelector('#bg-music').setAttribute('gameaudio', `sequence: ${newSeq}; volume: 0.1; autoplay: true; tempo: 40; loop: true;`);
  },
  /* Give the playter a second to process why he got caught.
  Then restart the level  */
  onPlayerSpotted: function(){
    this.blinkAndLoadLevel()
  },

  blinkAndLoadLevel: function() {
    let player = document.getElementById('player'); 
    document.getElementById('camera-blink').components['camera-blink'].animate(500);
    //TODO Stop player
    setTimeout(()=>{
      this.el.systems['level-generator'].clearCurrentLevel();
      this.el.systems['level-generator'].generate(this.level);
    },300)
  }
});
