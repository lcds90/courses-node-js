const PDF = require("html-pdf");

class WriterPdf {
  static WritePdf(filename, html) {
    PDF.create(html, {}).toFile("generate/" + filename, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
}

module.exports = WriterPdf;
