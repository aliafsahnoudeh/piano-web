const notes = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];

export const getNotByIndex = (index, tolerance) => {
  return {
    note: notes[index % 12],
    number: Math.floor(index / 12) + tolerance,
  };
};

export const isMainNote = (index) =>
  [0, 2, 4, 5, 7, 9, 11].includes(index % 12);
