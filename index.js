const { parse } = require("qs");

const reservedProperties = Object.freeze([
  "access_token",
  "h",
  "action",
  "url"
]);

const parseFormEncodedPost = b => {
  const body = parse(b);

  const result = {
    type: [],
    properties: {}
  };

  if (body.h) {
    result.type.push("h-" + body.h);
  }

  Object.keys(body).forEach(key => {
    if (!reservedProperties.includes(key)) {
      if (Array.isArray(body[key])) {
        result.properties[key] = body[key];
      }

      if (typeof body[key] === "string") {
        result.properties[key] = [].concat(body[key]);
      }
    }
  });

  return result;
};

module.exports = { parseFormEncodedPost };
