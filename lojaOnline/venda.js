
// Criando/abrindo o banco
var db = openDatabase("LojaOnline", "1.0", "base de dados da aplicacao", 200000);


// função callback de erro
db.onError = function (transaction, e) {
    alert("Aconteceu um erro: " + e.message);
    // console.log(e.message);
}

// função de callback de sucesso de insert
db.onSuccess = function (transaction, e) {
    alert("Dados Gravados com Sucesso!");
    location.reload();
    //console.log(e);
}


class Venda {

    constructor(id, nome, email, data, quantidade, valor) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.data = data;
        this.quantidade = quantidade;
        this.valor = valor;

    }
    registraVenda() {

        let useId = this.id;
        let insertNome = this.nome;
        let insertEmail = this.email;
        let insertData = this.data;
        let insertQuantidade = this.quantidade;
        let insertValor = this.valor;

        let insertValortotal = (insertValor * insertQuantidade)

        /*  db.transaction(function (transaction) {
  
              transaction.executeSql("INSERT INTO vendalivro (id, nome, email, data, quantidade, valor, valortotal) VALUES(?, ?, ?, ?, ?, ?, ?)", [useId, insertNome, insertEmail, insertData, insertQuantidade, insertValor, insertValortotal], db.onSuccess, db.onError);
          })
         // console.log('ID:'+useId +'Nome:'+insertNome+'Email:'+insertEmail+'Data:'+insertData+'Quantidade:'+insertQuantidade+'Valor:'+insertValor+'Valor Total:'+insertValortotal);
          //console.log(this);*/

        db.transaction(function (transaction) {

            transaction.executeSql("INSERT INTO vendalivro (id, nome, email, data, quantidade, valor, valortotal) VALUES(?, ?, ?, ?, ?, ?, ?)", [useId, insertNome, insertEmail, insertData, insertQuantidade, insertValor, insertValortotal], db.onSuccess, db.onError);


        })

       alert("Venda Realizada com Sucesso! Obrigado")
       location.reload();



    }


}







function Salvar() {
    var teste = new Livro(document.getElementById('id').value,
        document.getElementById('nome').value,
        document.getElementById('ano').value,
        document.getElementById('autor').value,
        document.getElementById('valor').value,
        document.getElementById('quantidade').value);

    teste.salvar();

}



window.onload = mostrar;
function mostrar() {
    var table = document.getElementById('tbody-registros');

    db.transaction(function (transaction) {
        transaction.executeSql('SELECT * FROM vendalivro', [], function (transaction, resultado) {
            var rows = resultado.rows;
            var tr = '';
            for (var i = 0; i < rows.length; i++) {
                tr += '<tr>';
                tr += '<td onClick="atualizar(' + rows[i].id + ')">' + rows[i].id + '</td>';
                tr += '<td>' + rows[i].nome + '</td>';
                tr += '<td>' + rows[i].ano + '</td>';
                tr += '<td>' + rows[i].autor + '</td>';
                tr += '<td>' + 'R$' + rows[i].valor + '</td>';
                tr += '<td>' + rows[i].quantidade + '</td>';
                tr += '<td onClick="atualizar(' + rows[i].id + ')">' + 'editar' + '</td>';
                tr += '<td onClick="deletar(' + rows[i].id + ')">' + 'excluir' + '</td>';
                tr += '</tr>';
            }
            table.innerHTML = tr;

        }, null);
    });
}

function atualizar(_id) {

    let id = document.getElementById('id');
    let nome = document.getElementById('nome');
    let ano = document.getElementById('ano');
    let autor = document.getElementById('autor');
    let valor = document.getElementById('valor');
    let quantidade = document.getElementById('quantidade');


    id.value = _id;

    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM impresso WHERE id=?', [_id], function (tx, resultado) {
            var rows = resultado.rows[0];
            id.value = rows.id;
            nome.value = rows.nome;
            ano.value = rows.ano;
            autor.value = rows.autor;
            valor.value = rows.valor;
            quantidade.value = rows.quantidade;
        });
    });



}


function deletar(_id) {


    id.value = _id;

    db.transaction(function (transaction) {
        transaction.executeSql('DELETE FROM impresso WHERE id=?', [_id]);
    })

    location.reload();


}




function FinalizarCompra() {
    var vd = new Venda(document.getElementById('id').value,
        document.getElementById('nome').value,
        document.getElementById('email').value,
        str_data,
        document.getElementById('quantidade').value,
        document.getElementById('valor').value);


    vd.registraVenda();

}