class Processor {
  static Process(data) {
    var new_data = data.split("\r\n");
    var rows = [];
    new_data.forEach((row) => {
      var arr = row.split(",");
      rows.push(arr);
    });
    return rows;
  }
}

module.exports = Processor;
