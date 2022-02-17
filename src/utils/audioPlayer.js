import * as d3 from "d3";

class audioPlayer {
  constructor(selector) {
    this._selector = selector;
  }

  attachSoundPlayer() {
    d3.select(this._selector)
      .append("audio")
      .attr("id", "audio")
      .append("source")
      .attr("id", "audio-source")
      .attr("src", "");

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
  }

  play(note) {
    import(
      /* webpackChunkName: "audio-assets" */ `../assets/piano-sounds/${note}.mp3`
    ).then((module) => {
      const source = document.getElementById("audio-source");
      const sound = module.default;
      source.src = sound;

      const audio = document.getElementById("audio");
      audio.load();
      audio.play();
    });
  }
}

export default audioPlayer;
