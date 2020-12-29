const EJS = require("ejs");

class HtmlParser {
  static async Parse(table) {
    return await EJS.renderFile("./template/preset.ejs", {
      header: table.header,
      rows: table.rows,
    });
  }
}

module.exports = HtmlParser;
