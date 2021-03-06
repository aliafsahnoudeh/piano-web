// original piano from https://observablehq.com/@sw1227/simple-piano-keyboard

import * as d3 from "d3";
import { getNotByIndex, isMainNote } from "../../utils/noteHelper";
import AudioPlayer from "../../utils/audioPlayer";

class piano {
  constructor(
    selector,
    data,
    { width, widthRatio, height, heightRatio, keyCount },
    callbacks
  ) {
    this._selector = selector;
    this._width = width;
    this._height = height;
    this._widthRatio = widthRatio;
    this._heightRatio = heightRatio;
    this._keyCount = keyCount;
    this._audioPlayer = new AudioPlayer(this._selector);
  }

  draw() {
    this.render();
    this.attachSoundPlayer();
  }

  erase() {
    this._svg.remove();
  }

  whiteCount(keyIndex) {
    return d3
      .range(keyIndex)
      .reduce((acc, val) => (isMainNote(val) ? acc + 1 : acc), 0);
  }

  getKeys() {
    const totalWhiteKeys = this.whiteCount(this._keyCount);

    const whiteWidth = this._width / totalWhiteKeys;
    const blackWidth = whiteWidth * this._widthRatio;

    const keys = d3.range(this._keyCount).map((i) => {
      const offset = isMainNote(i) ? 0 : -blackWidth / 2;
      return {
        index: i,
        type: isMainNote(i) ? "white" : "black",
        note: getNotByIndex(i, 4),
        coord: {
          x: {
            min: whiteWidth * this.whiteCount(i) + offset,
            max:
              whiteWidth * this.whiteCount(i) +
              offset +
              (isMainNote(i) ? whiteWidth : blackWidth),
          },
          y: {
            min: isMainNote(i) ? 0 : (1 - this._heightRatio) * this._height,
            max: this._height,
          },
        },
      };
    });

    // white keys should come before black ones for making z axis in svg way
    return keys.sort((first, second) => {
      if (first.type < second.type) return 1;
      else if (first.type > second.type) return -1;
      return 0;
    });
  }

  render() {
    const piano = this.getKeys();

    this._svg = d3
      .select(this._selector)
      .append("svg")
      .attr("width", this._width)
      .attr("height", this._height);

    this._svg
      .selectAll("rect")
      .data(piano)
      .enter()
      .append("rect")
      .attr("x", (key) => key.coord.x.min)
      .attr("width", (key) => key.coord.x.max - key.coord.x.min)
      .attr("height", (key) => key.coord.y.max - key.coord.y.min)
      .attr(
        "class",
        (key) => `${key.note.note} ${key.note.note + key.note.number}`
      )
      .attr("stroke", "#ccc")
      .attr("stroke-width", 1)
      .call(function (t) {
        t.each(function (d) {
          const self = d3.select(this);
          self.attr("fill", d.type === "white" ? "#fff" : "#444");
          self.attr("y", d.type === "white" ? (key) => key.coord.y.min : 0);
        });
      });
  }

  attachSoundPlayer() {
    this._audioPlayer.attachSoundPlayer();
  }
}

export default piano;
