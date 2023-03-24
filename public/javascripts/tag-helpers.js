function css(styles = {}) {
  return Object.keys(styles)
    .map((key) => `${key}: ${styles[key]}`)
    .join(";");
}

function addDiv(content, styles = "") {
  return `<div style="${styles}">${content}</div>`;
}

function addButton(
  content,
  formation,
  name,
  value,
  disabled = "",
  styles = ""
) {
  return `<button type="submit" formaction="${formation}" style="${styles}" name="${name}" value="${value}" ${disabled} form="myForm">${content}</button>`;
}

module.exports = {
  css,
  addDiv,
  addButton,
};
