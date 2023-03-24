var { css, addDiv, addButton } = require("./../public/javascripts/tag-helpers");

test("Returns empty string for no css dictionary.", () => {
  expect(css()).toBe("");
});

test("Returns string with one param for css dictionary with one value.", () => {
  expect(css({ width: "100%" })).toBe("width: 100%");
});

test("Returns string with many params for css dictionary with many values.", () => {
  expect(css({ width: "100%", hieght: "100%" })).toBe(
    "width: 100%;hieght: 100%"
  );
});

test("Returns empty string, if get wrong data type input.", () => {
  expect(css(1)).toBe("");
});

test("Returns string with tag Div with content and empty styles.", () => {
  expect(addDiv("test content")).toBe(`<div style="">test content</div>`);
});

test("Returns string with tag Div with content and style.", () => {
  expect(addDiv("test content", "width: 100%")).toBe(
    `<div style="width: 100%">test content</div>`
  );
});

test("Returns string with tag Div with undefined content and empty style.", () => {
  expect(addDiv()).toBe(`<div style="">undefined</div>`);
});

test("Returns string with tag Button with all possible default params and undefined the rest of them.", () => {
  expect(addButton()).toBe(
    `<button type="submit" formaction="undefined" style="" name="undefined" value="undefined"  form="myForm">undefined</button>`
  );
});

test("Returns string with tag Button with all possible default params.", () => {
  expect(addButton("test content", "/", "coordinate", "value")).toBe(
    `<button type="submit" formaction="/" style="" name="coordinate" value="value"  form="myForm">test content</button>`
  );
});

test("Returns string with tag Button with desable param and default style param.", () => {
  expect(
    addButton("test content", "/", "coordinate", "value", "disabled")
  ).toBe(
    `<button type="submit" formaction="/" style="" name="coordinate" value="value" disabled form="myForm">test content</button>`
  );
});

test("Returns string with tag Button with all params.", () => {
  expect(
    addButton(
      "test content",
      "/",
      "coordinate",
      "value",
      "disabled",
      "width: 100%"
    )
  ).toBe(
    `<button type="submit" formaction="/" style="width: 100%" name="coordinate" value="value" disabled form="myForm">test content</button>`
  );
});
