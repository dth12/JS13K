export function startDemo() {
    //----------------------------------------------------------------------------
    // Music data section
    //----------------------------------------------------------------------------
  
    // Song data
    var song = {
    songData: [
        { // Instrument 0
        i: [
        3, // OSC1_WAVEFORM
        146, // OSC1_VOL
        140, // OSC1_SEMI
        0, // OSC1_XENV
        1, // OSC2_WAVEFORM
        224, // OSC2_VOL
        128, // OSC2_SEMI
        3, // OSC2_DETUNE
        0, // OSC2_XENV
        0, // NOISE_VOL
        92, // ENV_ATTACK
        0, // ENV_SUSTAIN
        95, // ENV_RELEASE
        0, // ENV_EXP_DECAY
        0, // ARP_CHORD
        0, // ARP_SPEED
        3, // LFO_WAVEFORM
        179, // LFO_AMT
        5, // LFO_FREQ
        1, // LFO_FX_FREQ
        2, // FX_FILTER
        124, // FX_FREQ
        135, // FX_RESONANCE
        11, // FX_DIST
        32, // FX_DRIVE
        150, // FX_PAN_AMT
        3, // FX_PAN_FREQ
        157, // FX_DELAY_AMT
        6 // FX_DELAY_TIME
        ],
        // Patterns
        p: [1],
        // Columns
        c: [
            {n: [106,,,,,,,,104,,,,,,,,99,,,,,,,,110,,,,,,,,103,,,,,,,,108,,,,,,,,101,,,,,,,,104],
            f: []}
        ]
        },
    ],
    rowLen: 11025,   // In sample lengths
    patternLen: 64,  // Rows per pattern
    endPattern: 0,  // End pattern
    numChannels: 1  // Number of channels
    };
    
    //----------------------------------------------------------------------------
    // Demo program section
    //----------------------------------------------------------------------------
  
    // Initialize music generation (player).
    var player = new CPlayer();
    player.init(song);
  
    // Generate music...
    var done = false;
    setInterval(function () {
      if (done) {
        return;
      }
  
      done = player.generate() >= 1;
  
      if (done) {
  
        // Put the generated song in an Audio element.
        var wave = player.createWave();
        var audio = document.createElement("audio");
        audio.src = URL.createObjectURL(new Blob([wave], {type: "audio/wav"}));
        audio.play();
      }
    }, 0);
  }
