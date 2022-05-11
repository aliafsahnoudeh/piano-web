import * as d3 from "d3";
import { mapKeydownToNote, visibleNotes } from "./noteHelper";

class audioPlayer {
  constructor(selector) {
    this._selector = selector;
    this._sources = {};
    this._audios = {};
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

    document.body.addEventListener(
      "click",
      (event) => {
        event.preventDefault();
        const classes = event.target.className.baseVal.split(" ");
        // TODO prevent playing if it's not a piano key
        this.play(classes[1]);
      },
      true
    );

    document.addEventListener(
      "keydown",
      (event) => {
        this.play(mapKeydownToNote(event.key));
      },
      false
    );
  }

  play(note) {
    if (this._sources[note] && !this._sources[note].src.includes(".mp3")) {
      import(
        /* webpackChunkName: "audio-assets" */ `../assets/piano-sounds/${note}.mp3`
      ).then((module) => {
        const sound = module.default;
        this._sources[note].src = sound;

        const audio = this._audios[note];
        audio.load();
        audio.play();
      });
    } else {
      const audio = this._audios[note];
      audio.load();
      audio.play();
    }
  }
}

export default audioPlayer;
