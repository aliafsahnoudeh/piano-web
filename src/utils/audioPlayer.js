import * as d3 from "d3";
import { mapKeydownToNote, visibleNotes } from "./noteHelper";

class audioPlayer {
  constructor(selector) {
    this._selector = selector;
    this._sources = {};
    this._audios = {};
    this._fired = {};
  }

  attachSoundPlayer() {
    visibleNotes.forEach((note) => {
      d3.select(this._selector)
        .append("audio")
        .attr("id", `audio-${note}`)
        .append("source")
        .attr("id", `audio-source-${note}`)
        .attr("src", "");

      this._sources[note] = document.getElementById(`audio-source-${note}`);
      this._audios[note] = document.getElementById(`audio-${note}`);
    });

    const chartElement = document.getElementById("chart");

    chartElement.addEventListener(
      "click",
      (event) => {
        event.stopPropagation();
        if (event.target.className.baseVal) {
          const classes = event.target.className.baseVal.split(" ");
          if (this._sources[classes[1]]) this.play(classes[1]);
          setTimeout(() => {
            this._fired[classes[1]] = false;
          }, 200);
        }
      },
      true
    );

    document.addEventListener(
      "keydown",
      (event) => {
        // TODO debounce keydown
        event.stopPropagation();
        this.play(mapKeydownToNote(event.key));
      },
      false
    );

    document.addEventListener(
      "keyup",
      (event) => {
        const note = mapKeydownToNote(event.key);
        if (this._sources[note]) this._fired[note] = false;
      },
      false
    );
  }

  play(note) {
    if (this._sources[note] && !this._fired[note]) {
      this._fired[note] = true;
      if (!this._sources[note].src.includes(".mp3")) {
        import(
          /* webpackChunkName: "audio-assets" */ `../assets/piano-sounds/${note}.mp3`
        ).then((module) => {
          const sound = module.default;
          this._sources[note].src = sound;

          const audio = this._audios[note];
          audio?.load();
          audio?.play();
        });
      } else {
        const audio = this._audios[note];
        audio?.load();
        audio?.play();
      }
    }
  }
}

export default audioPlayer;
