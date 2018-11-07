const { parseFormEncodedPost } = require("./index");

// This tests will match only cases described in https://micropub.rocks/server-tests

const t100 = "h=entry&content=Micropub+test+of+creating+a+basic+h-entry";
const r100 = {
  type: ["h-entry"],
  properties: {
    content: ["Micropub test of creating a basic h-entry"]
  }
};

const t101 =
  "h=entry&content=Micropub+test+of+creating+an+h-entry+with+categories.+This+post+should+have+two+categories,+test1+and+test2&category[]=test1&category[]=test2";
const r101 = {
  type: ["h-entry"],
  properties: {
    content: [
      "Micropub test of creating an h-entry with categories. This post should have two categories, test1 and test2"
    ],
    category: ["test1", "test2"]
  }
};

const t104 =
  "h=entry&content=Micropub+test+of+creating+a+photo+referenced+by+URL&photo=https%3A%2F%2Fmicropub.rocks%2Fmedia%2Fsunset.jpg";
const r104 = {
  type: ["h-entry"],
  properties: {
    content: ["Micropub test of creating a photo referenced by URL"],
    photo: ["https://micropub.rocks/media/sunset.jpg"]
  }
};

const t107 =
  "h=entry&content=Micropub+test+of+creating+an+h-entry+with+one+category.+This+post+should+have+one+category,+test1&category=test1";
const r107 = {
  type: ["h-entry"],
  properties: {
    content: [
      "Micropub test of creating an h-entry with one category. This post should have one category, test1"
    ],
    category: ["test1"]
  }
};

describe("Micropub Server Tests", () => {
  describe("Creating Posts (Form-Encoded)", () => {
    test("Create an h-entry post (form-encoded)", () => {
      expect(parseFormEncodedPost(t100)).toEqual(r100);
    });
    test("Create an h-entry post with multiple categories (form-encoded)", () => {
      expect(parseFormEncodedPost(t101)).toEqual(r101);
    });
    test("Create an h-entry with a photo referenced by URL (form-encoded)", () => {
      expect(parseFormEncodedPost(t104)).toEqual(r104);
    });
    test("Create an h-entry post with one category (form-encoded)", () => {
      expect(parseFormEncodedPost(t107)).toEqual(r107);
    });
  });
});
