export function css(styles = {}) {
  return Object.keys(styles)
    .map((key) => `${key}: ${styles[key]}`)
    .join(";");
}

export function addDiv(content, styles = "") {
  return `<div style="${styles}">${content}</div>`;
}

// export function addTable(content, styles = "") {
//   return `<table style="${styles}">${content}</table>`;
// }

// export function addRow(content, styles = "") {
//   return `<tr style="${styles}">${content}</tr>`;
// }

// export function addCell(content, styles = "") {
//   return `<td style="${styles}">${content}</td>`;
// }
