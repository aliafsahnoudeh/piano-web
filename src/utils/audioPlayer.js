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
        this.play(classes[1]);
      },
      true
    );
  }

  play(note) {
    const source = document.getElementById("audio-source");
    import(
      /* webpackChunkName: "audio" */ `../assets/piano-sounds/${note}.mp3`
    ).then((module) => {
      const sound = module.default;
      source.src = sound;

      const audio = document.getElementById("audio");
      audio.load();
      audio.play();
    });
  }
}

export default audioPlayer;
