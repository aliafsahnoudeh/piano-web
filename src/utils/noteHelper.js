const notes = ["c", "c#", "d", "d#", "e", "f", "f#", "g", "g#", "a", "a#", "b"];

export const getNotByIndex = (index) => {
  return {
    note: notes[index % 12],
    number: Math.floor(index / 12),
  };
};

export const isMainNote = (index) =>
  [0, 2, 4, 5, 7, 9, 11].includes(index % 12);
