const notes = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
const key = {
  a: "C4",
  w: "Db4",
  s: "D4",
  e: "Eb4",
  d: "E4",
  f: "F4",
  t: "Gb4",
  g: "G4",
  y: "Ab4",
  h: "A4",
  u: "Bb4",
  j: "B4",
  k: "C5",
  o: "Db5",
  l: "D5",
  p: "Eb5",
  ";": "E5",
  "'": "F5",
  "]": "Gb5",
  "\\": "G5",
  // y: "Ab5",
  // h: "A5",
  // u: "Bb5",
  // j: "B5",
};

export const visibleNotes = [
  "C4",
  "Db4",
  "D4",
  "Eb4",
  "E4",
  "F4",
  "Gb4",
  "G4",
  "Ab4",
  "A4",
  "Bb4",
  "B4",
  "C5",
  "Db5",
  "D5",
  "Eb5",
  "E5",
  "F5",
  "Gb5",
  "G5",
  "Ab5",
  "A5",
  "Bb5",
  "B5",
];

export const getNotByIndex = (index, tolerance) => {
  return {
    note: notes[index % 12],
    number: Math.floor(index / 12) + tolerance,
  };
};

export const isMainNote = (index) =>
  [0, 2, 4, 5, 7, 9, 11].includes(index % 12);

export const mapKeydownToNote = (code) => {
  return key[code];
};
