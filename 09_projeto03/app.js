const READER = require("./class/Reader");
const WRITER = require("./class/Writer");
const WRITER_PDF = require("./class/WriterPdf")
const PROCESSOR = require("./class/Processor");
const TABLE = require("./class/Table");
const HTML = require("./class/HtmlParser");

const LEITOR = new READER();
const ESCRITOR = new WRITER();

async function main() {
  var dados = await LEITOR.Read("./template/exemplo.csv");
  var dados_processados = await PROCESSOR.Process(dados);
  var tabela = new TABLE(dados_processados);
  var date = new Date();
  var seconds = date.getSeconds();
  var minutes = date.getMinutes();
  var hour = date.getHours();
  var time = `${hour}${minutes}${seconds}`;

  /*
  console.log(tabela.RowCount)
  console.log(tabela.ColumnCount)
  console.log(html);
  */

  var html = await HTML.Parse(tabela);
  ESCRITOR.Write(time + ".html", html);
  WRITER_PDF.WritePdf(time + ".pdf", html)
  console.log("O arquivo: " + time + " foi gerado como PDF e HTML com sucesso!");
}

main();
