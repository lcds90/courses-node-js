const FS = require("fs");
const UTIL = require("util");

class Writer {
  constructor() {
    this.writer = UTIL.promisify(FS.writeFile);
  }

  async Write(filename, data) {
    try {
      await this.writer("generate/"+filename, data);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

module.exports = Writer;
