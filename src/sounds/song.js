//최댓값은 제외, 최솟값은 포함
const getRandomNote = () => {
  const MIN_NOTE = 99;
  const MAX_NOTE = 110;
  return Math.floor(Math.random() * (MAX_NOTE - MIN_NOTE)) + MIN_NOTE; 
}

const getRandomMelody = () => {
  const MAX_MELODY_LENGTH = 8;
  const randomMelody = [];

  for (let i = 0; i < MAX_MELODY_LENGTH; ++i) {
    randomMelody.push(...[getRandomNote(),,,,,,,,]);
  }

  return randomMelody;
}

// Song data
export const song = {
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
        {
          n: getRandomMelody(),
          f: []
        }
      ]
    },
  ],
  rowLen: 11025,   // In sample lengths
  patternLen: 64,  // Rows per pattern
  endPattern: 0,  // End pattern
  numChannels: 1  // Number of channels
};
