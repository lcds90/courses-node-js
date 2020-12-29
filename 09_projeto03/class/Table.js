class Table {
    constructor(arr){
        this.header = arr[0];
        arr.shift();
        this.rows = arr;
    }

    // campo virtual, quando declarado get é obrigatorio o retorno de algum valor
    get RowCount(){
        return this.rows.length;
    }

    get ColumnCount(){
        return this.header.length;
    }
}

module.exports = Table;