alasql('CREATE LOCALSTORAGE DATABASE IF NOT EXISTS agrosqldb')
alasql('ATTACH LOCALSTORAGE DATABASE agrosqldb')
alasql('USE agrosqldb')

alasql('CREATE TABLE IF NOT EXISTS endereco (id INT PRIMARY KEY, cep NUMBER, rua STRING,bairro STRING, cidade STRING, estado STRING, pais STRING, idcli INT)');
alasql('CREATE TABLE IF NOT EXISTS cadastro (id INT PRIMARY KEY, nome STRING, cpf NUMBER, dataNascimento DATE, telefone NUMBER, celular NUMBER)');

const reader = new FileReader();

document.getElementById('fileInput').addEventListener('change' , function(event){
    const file = event.target.files[0]; // Pega o arquivo selecionado
            if (file) {
                reader.onload = function(e) {
                    try {
                        const jsonData = JSON.parse(e.target.result); // Lê e parseia o JSON
                        console.log(jsonData); // Exibe os dados no console
                    } catch (error) {
                        console.error('Erro ao ler o JSON:', error); // Tratamento de erro
                    }
                };
                reader.readAsText(file); // Lê o arquivo como texto
            }
});
function importar(){

    alasql('DELETE FROM cadastro')
    alasql('DELETE FROM endereco')

    var arquivo= JSON.parse(reader.result);

    let cadastro = arquivo.cadastro;
    let enderecos = arquivo.endereco;

    try {
        cadastro.forEach(cliente => {
            alasql('INSERT INTO cadastro (id,nome,cpf,dataNascimento,telefone,celular) VALUES (?,?,?,?,?,?)',[cliente.id,cliente.nome,cliente.cpf,cliente.dataNascimento,cliente.telefone,cliente.celular])
        });
        enderecos.forEach(endereco =>{
            alasql('INSERT INTO endereco (id,cep,rua,bairro,cidade,estado,pais,idcli) VALUES (?,?,?,?,?,?,?,?)',[endereco.id,endereco.cep,endereco.rua,endereco.bairro,endereco.cidade,endereco.estado,endereco.pais,endereco.idcli]);
        });
        alert('Importação concluída.')
    } catch (error) {
        alert('Erro ao importar arquivo.')
    }

}
function voltar(){
    window.location.href="../../index.html"
}
