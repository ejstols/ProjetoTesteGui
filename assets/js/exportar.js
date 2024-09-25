alasql('ATTACH LOCALSTORAGE DATABASE agrosqldb')
alasql('USE agrosqldb')
function exportarBanco(){
var cadastro = alasql("SELECT * FROM cadastro");
var endereco = alasql("SELECT * FROM endereco");

var banco = {
    cadastro: cadastro,
    endereco: endereco
};

    var bancoJSON = [JSON.stringify(banco, null, 2)];

    // Baixar arquivo JSON
    var blob = new Blob(bancoJSON, {type: "application/json"});
    var link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "dados_agrosys.json";
    link.click();
}