const pdf = require("html-pdf");
const ejs = require("ejs");

var user = "Leonardo Santos";

// a imagem precisa estar hospedada em algum servidor web para conseguir utilizar
ejs.renderFile("./teste.ejs", { user }, (err, html) => {
  if (err) {
    console.log(err);
  } else {
    pdf.create(html, {}).toFile("./novo.pdf", (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(res);
      }
    });
  }
});
