const FS = require("fs");
const UTIL = require("util");
class Reader {
  constructor() {
    // lib para converter função de callback em promise
    this.reader = UTIL.promisify(FS.readFile);
  }

  async Read(filepath) {
    try {
      return await this.reader(filepath, "utf8");
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }
}

module.exports = Reader;
