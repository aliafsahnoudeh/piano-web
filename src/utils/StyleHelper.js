export const disableTextSelection = (textObject) => {
  textObject.style("user-select", "none");
  textObject.style("-webkit-touch-callout", "none");
  textObject.style("-webkit-user-select", "none");
  textObject.style("-khtml-user-select", "none");
  textObject.style("-moz-user-select", "none");
  textObject.style("-ms-user-select", "none");
};
