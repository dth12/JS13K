import { getRandomMelody } from "../util";

const MIN_SCALE = 99;
const MAX_SCALE = 122;
const MIN_PATTERN_LEN = 4;
const MAX_PATTERN_LEN = 256;
const NOTE_LEN = 4;

export const footstep = {
  songData: [
    { // Instrument 0
      i: [
      0, // OSC1_WAVEFORM
      255, // OSC1_VOL
      116, // OSC1_SEMI
      79, // OSC1_XENV
      0, // OSC2_WAVEFORM
      255, // OSC2_VOL
      116, // OSC2_SEMI
      0, // OSC2_DETUNE
      83, // OSC2_XENV
      0, // NOISE_VOL
      4, // ENV_ATTACK
      6, // ENV_SUSTAIN
      69, // ENV_RELEASE
      52, // ENV_EXP_DECAY
      0, // ARP_CHORD
      0, // ARP_SPEED
      0, // LFO_WAVEFORM
      0, // LFO_AMT
      0, // LFO_FREQ
      0, // LFO_FX_FREQ
      2, // FX_FILTER
      14, // FX_FREQ
      0, // FX_RESONANCE
      0, // FX_DIST
      32, // FX_DRIVE
      0, // FX_PAN_AMT
      0, // FX_PAN_FREQ
      0, // FX_DELAY_AMT
      0 // FX_DELAY_TIME
      ],
      // Patterns
      p: [1],
      // Columns
      c: [
        {n: [MIN_SCALE],
         f: []}
      ]
    },
  ],
  rowLen: 7350,   // In sample lengths
  patternLen: MIN_PATTERN_LEN,  // Rows per pattern
  endPattern: 0,  // End pattern
  numChannels: 1  // Number of channels
};

export const music = {
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
        {n: getRandomMelody(MIN_SCALE, MAX_SCALE, MAX_PATTERN_LEN, NOTE_LEN),
         f: []},
      ]
    },
  ],
  rowLen: 55125,   // In sample lengths
  patternLen: MAX_PATTERN_LEN,  // Rows per pattern
  endPattern: 0,  // End pattern
  numChannels: 1  // Number of channels
};

export const toggle = {
  songData: [
    { // Instrument 0
      i: [
      3, // OSC1_WAVEFORM
      255, // OSC1_VOL
      128, // OSC1_SEMI
      0, // OSC1_XENV
      0, // OSC2_WAVEFORM
      255, // OSC2_VOL
      140, // OSC2_SEMI
      0, // OSC2_DETUNE
      0, // OSC2_XENV
      127, // NOISE_VOL
      2, // ENV_ATTACK
      2, // ENV_SUSTAIN
      47, // ENV_RELEASE
      61, // ENV_EXP_DECAY
      0, // ARP_CHORD
      0, // ARP_SPEED
      0, // LFO_WAVEFORM
      96, // LFO_AMT
      3, // LFO_FREQ
      1, // LFO_FX_FREQ
      3, // FX_FILTER
      94, // FX_FREQ
      79, // FX_RESONANCE
      0, // FX_DIST
      32, // FX_DRIVE
      84, // FX_PAN_AMT
      2, // FX_PAN_FREQ
      12, // FX_DELAY_AMT
      4 // FX_DELAY_TIME
      ],
      // Patterns
      p: [1],
      // Columns
      c: [
        {n: [MIN_SCALE],
         f: []}
      ]
    },
  ],
  rowLen: 5513,   // In sample lengths
  patternLen: 1,  // Rows per pattern
  endPattern: 0,  // End pattern
  numChannels: 1  // Number of channels
};
