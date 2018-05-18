/*********** Scripts Pessoa***************/

// Criando/abrindo o banco
var db = openDatabase("LojaOnline", "1.0", "base de dados da aplicacao", 200000);

// criando a tabela caso ela não exista
db.transaction(function (transaction) {
    //transaction.executeSql('CREATE TABLE IF NOT EXISTS pessoa ("id" INTEGER PRIMARY KEY , "nome" INTEGER, "telefone" INTEGER, "email" TEXT, "senha" TEXT)', [], null, db.onError);
    transaction.executeSql('CREATE TABLE IF NOT EXISTS cliente ("id" INTEGER PRIMARY KEY , "nome" TEXT, "telefone" INTEGER, "cpf" NUMBER, "email" TEXT, "senha" TEXT)', [], null, db.onError);
    transaction.executeSql('CREATE TABLE IF NOT EXISTS vendedor ("id" INTEGER PRIMARY KEY , "nome" TEXT, "telefone" INTEGER, "cnpj" NUMBER, "email" TEXT, "senha" TEXT)', [], null, db.onError);
})

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


class Pessoa {
    constructor(id, nome, telefone, email, senha, site) {
        this.id = id;
        this.nome = nome;
        this.telefone = telefone;
        this.email = email;
        this.senha = senha;
        this.site = site
    }

}

class Cliente extends Pessoa {
    constructor(id, nome, telefone, cpf, email, senha) {
        super();
        this.id = id;
        this.nome = nome;
        this.telefone = telefone;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;


    }
    salvar() {
        let useId = this.id;
        let insertNome = this.nome;
        let insertTelefone = this.telefone;
        let insertCpf = this.cpf;
        let insertEmail = this.email;
        let insertSenha = this.senha


        db.transaction(function (transaction) {
            if (useId) {
                 transaction.executeSql('UPDATE cliente' + ' SET nome = ?, telefone=? , cpf=?, email=?, senha = ?' + ' WHERE id = ?', [insertNome, insertTelefone, insertCpf, insertEmail, insertSenha, useId], db.onSuccess, db.onError);
               
            } else {
                transaction.executeSql("INSERT INTO cliente(nome, telefone, cpf, email, senha) VALUES(?, ?, ?, ?, ?)", [insertNome, insertTelefone, insertCpf, insertEmail, insertSenha], db.onSuccess, db.onError);

            }
        })
    }
}


class Vendendor extends Pessoa {
    constructor(id, nome, telefone, cnpj, email, senha) {
        super();
        this.id = id;
        this.nome = nome;
        this.telefone = telefone;
        this.cnpj = cnpj;
        this.email = email;
        this.senha = senha;


    }
    salvar() {
        let useId = this.id;
        let insertNome = this.nome;
        let insertTelefone = this.telefone;
        let insertCnpj = this.cnpj;
        let insertEmail = this.email;
        let insertSenha = this.senha


        db.transaction(function (transaction) {
            if (useId) {
                transaction.executeSql('UPDATE vendedor' + ' SET nome = ?, telefone=? , cnpj=?, email=?, senha = ?' + ' WHERE id = ?', [insertNome, insertTelefone, insertCnpj, insertEmail, insertSenha, useId], db.onSuccess, db.onError);

            } else {
                transaction.executeSql("INSERT INTO vendedor (nome, telefone, cnpj, email, senha) VALUES(?, ?, ?, ?, ?)", [insertNome, insertTelefone, insertCnpj, insertEmail, insertSenha], db.onSuccess, db.onError);

            }
        })
    }
    /* mostrar(){
         var table = document.getElementById('tbody-registros-vendedor');
 
         db.transaction(function (transaction) {
             transaction.executeSql('SELECT * FROM vendedor', [], function (transaction, resultado) {
                 var rows = resultado.rows;
                 var tr = '';
                 for (var i = 0; i < rows.length; i++) {
                     tr += '<tr>';
                     tr += '<td onClick="atualizar(' + rows[i].id + ')">' + rows[i].id + '</td>';
                     tr += '<td>' + rows[i].nome + '</td>';
                     tr += '<td>' + rows[i].telefone + '</td>';
                     tr += '<td>' + rows[i].cnpj + '</td>';
                     tr += '<td>' + 'R$' + rows[i].email + '</td>';
                     tr += '<td>' + rows[i].senha + '</td>';
                     tr += '<td onClick="atualizar(' + rows[i].id + ')">' + 'editar' + '</td>';
                     tr += '<td onClick="deletar(' + rows[i].id + ')">' + 'excluir' + '</td>';
                     tr += '</tr>';
                 }
                 table.innerHTML = tr;
 
             }, null);
         });
        
     }*/

}




function SalvarCliente() {
    var CC = new Cliente(document.getElementById('id').value,
        document.getElementById('nome').value,
        document.getElementById('telefone').value,
        document.getElementById('cpf').value,
        document.getElementById('email').value,
        document.getElementById('senha').value);

    CC.salvar();

}

function SalvarVendedor() {
    var CV = new Vendendor(document.getElementById('id').value,
        document.getElementById('nome').value,
        document.getElementById('telefone').value,
        document.getElementById('cnpj').value,
        document.getElementById('email').value,
        document.getElementById('senha').value);

    CV.salvar();

}










