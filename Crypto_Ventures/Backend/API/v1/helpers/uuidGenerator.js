const { randomUUID } = require("node:crypto");

/**
 * Generates a unique uuid
 * @returns uid
 */
const generate = () => {
  let random_uid = randomUUID();
  let d = new Date(Date.now());
  const uid = random_uid.concat(
    "-",
    d.getMinutes().toString(),
    d.getSeconds().toString(),
    d.getMilliseconds().toString()
  );
  return uid;
};

module.exports = {
  generate,
};
