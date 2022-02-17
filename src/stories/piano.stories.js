import piano from "../charts/piano/index";

export default {
  title: "Example/piano.stories",
  argTypes: {
    selector: { control: "text" },
    configs: { control: "object" },
    data: { control: "object" },
  },
};

const Template = (args) => {
  const container = document.createElement("div");
  container.setAttribute("id", "chart");

  setTimeout(function () {
    piano(args.selector, args.data, args.configs, args.callbacks);
  }, 200);

  return container;
};

export const Piano = Template.bind({});
const width = document.getElementById("root").clientWidth;
Piano.args = {
  selector: "#chart",
  data: {},
  configs: {
    height: 144,
    width: width,
    widthRatio: 0.7,
    heightRatio: 0.8,
    keyCount: 25, // 2 octaves + 1 more C
  },
  callbacks: {},
};
