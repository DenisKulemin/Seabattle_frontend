function css(styles = {}) {
  return Object.keys(styles)
    .map((key) => `${key}: ${styles[key]}`)
    .join(";");
}

function addDiv(content, styles = "") {
  return `<div style="${styles}">${content}</div>`;
}

module.exports = {
  css,
  addDiv,
};
