const MIN_NOTE = 99;
const MAX_NOTE = 122;

// getRandomScale() => MIN_NOTE <= x < MAX_NOTE
const getRandomScale = () => {
  return Math.floor(Math.random() * (MAX_NOTE - MIN_NOTE)) + MIN_NOTE; 
}

// getRandomMelody(noteCount, noteLength) => songData.c.n
const getRandomMelody = (noteCount, noteLength) => {
  const randomMelody = [];

  for (let i = 0; i < noteCount; ++i) {
    const randomNote = Array(noteLength);
    randomNote[0] = getRandomScale();
    randomMelody.push(...randomNote);
  }

  return randomMelody;
}

export const sequences = {
  // Song data
  soundBox: {
    songData: [
      { // Instrument 0
        i: [
        2, // OSC1_WAVEFORM
        100, // OSC1_VOL
        128, // OSC1_SEMI
        0, // OSC1_XENV
        3, // OSC2_WAVEFORM
        201, // OSC2_VOL
        128, // OSC2_SEMI
        0, // OSC2_DETUNE
        0, // OSC2_XENV
        0, // NOISE_VOL
        5, // ENV_ATTACK
        6, // ENV_SUSTAIN
        58, // ENV_RELEASE
        0, // ENV_EXP_DECAY
        0, // ARP_CHORD
        0, // ARP_SPEED
        0, // LFO_WAVEFORM
        195, // LFO_AMT
        6, // LFO_FREQ
        1, // LFO_FX_FREQ
        2, // FX_FILTER
        135, // FX_FREQ
        0, // FX_RESONANCE
        0, // FX_DIST
        32, // FX_DRIVE
        147, // FX_PAN_AMT
        6, // FX_PAN_FREQ
        121, // FX_DELAY_AMT
        6 // FX_DELAY_TIME
        ],
        // Patterns
        p: [1],
        // Columns
        c: [{
          n: getRandomMelody(8, 4),
          f: [],
        }],
      },
    ],
    rowLen: 5513,   // In sample lengths
    patternLen: 32,  // Rows per pattern
    endPattern: 0,  // End pattern
    numChannels: 1  // Number of channels
  },
  baseString: {
    songData: [
      { // Instrument 0
        i: [
        2, // OSC1_WAVEFORM
        192, // OSC1_VOL
        128, // OSC1_SEMI
        0, // OSC1_XENV
        2, // OSC2_WAVEFORM
        192, // OSC2_VOL
        140, // OSC2_SEMI
        18, // OSC2_DETUNE
        0, // OSC2_XENV
        0, // NOISE_VOL
        158, // ENV_ATTACK
        119, // ENV_SUSTAIN
        158, // ENV_RELEASE
        0, // ENV_EXP_DECAY
        0, // ARP_CHORD
        0, // ARP_SPEED
        0, // LFO_WAVEFORM
        0, // LFO_AMT
        0, // LFO_FREQ
        0, // LFO_FX_FREQ
        2, // FX_FILTER
        5, // FX_FREQ
        0, // FX_RESONANCE
        0, // FX_DIST
        32, // FX_DRIVE
        0, // FX_PAN_AMT
        0, // FX_PAN_FREQ
        24, // FX_DELAY_AMT
        8 // FX_DELAY_TIME
        ],
        // Patterns
        p: [1],
        // Columns
        c: [
          {n: getRandomMelody(8, 4),
           f: []}
        ]
      },
    ],
    rowLen: 55125,   // In sample lengths
    patternLen: 32,  // Rows per pattern
    endPattern: 0,  // End pattern
    numChannels: 1  // Number of channels
  },
};
