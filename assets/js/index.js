alasql('CREATE LOCALSTORAGE DATABASE IF NOT EXISTS agrosqldb')
alasql('ATTACH LOCALSTORAGE DATABASE agrosqldb')
alasql('USE agrosqldb')
alasql('CREATE TABLE IF NOT EXISTS usuario (id INT AUTO_INCREMENT PRIMARY KEY, usuario STRING, senha STRING)');
//alasql('DELETE FROM usuario')

let labelUsuarioCadastro = document.querySelector('#labelUsuarioCadastro')
let usuarioCadastro = document.querySelector('#usuarioCadastro')
let labelSenhaCadastro = document.querySelector('#labelSenhaCadastro')
let senhaCadastro = document.querySelector('#senhaCadastro')
let labelSenhaConfirmar = document.querySelector('#labelSenhaConfirmar')
let senhaConfirmar = document.querySelector('#senhaConfirmar')

document.getElementById('loginForm').onsubmit = function(event){
    event.preventDefault();

    const loginUsuario= document.getElementById('loginUsuario').value;
    const loginSenha = document.getElementById('loginSenha').value;
    const mensagem= document.getElementById('mensagem');

    const loginExiste = alasql('SELECT * FROM usuario WHERE usuario = ? AND senha = ?',[loginUsuario,loginSenha])

    if(loginExiste.length > 0){
        window.location.href="assets/html/listaCliente.html";
    }else{
        mensagem.innerText = "Usuário/senha inválida"
        mensagem.setAttribute('style','color:red')
        this.reset()
    }
}
//Mostrar e ocultar a senha
function mostrarSenha(){
    const loginSenha = document.getElementById('loginSenha')

    const tipo = loginSenha.type === 'password' ? 'text' : 'password';
    loginSenha.type = tipo;
    
}
function contaCriar(){
    window.location.href="assets/html/criarConta.html";
}
function importar(){
    window.location.href="assets/html/importar.html";
}