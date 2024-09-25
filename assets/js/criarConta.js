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

//Cadastro e validação da existencia de outro usuário
document.getElementById('cadastroForm').onsubmit = function(event){     
    event.preventDefault();

    const usuarioCadastro = document.getElementById('usuarioCadastro').value;
    const senhaCadastro = document.getElementById('senhaCadastro').value;
    const mensagemCadastro = document.getElementById('mensagemCadastro');

    const loginExiste = alasql('SELECT * FROM usuario WHERE usuario = ?',[usuarioCadastro]);

    if(loginExiste.length> 0){
            mensagemCadastro.innerText="Esse usuário/senha já existe."
            mensagemCadastro.setAttribute('style','color:red') 
            this.reset();
            return;
        } else{
            alasql('INSERT INTO usuario (usuario,senha) VALUES (?,?)',[usuarioCadastro,senhaCadastro]);
            window.location.href="../../index.html"
            this.reset();
        }
};
//Verificar quantidade de caracteres no usuário
usuarioCadastro.addEventListener('keyup', () => {
    if(usuarioCadastro.value.length <= 3 ){
        labelUsuarioCadastro.setAttribute('style','color:red')
        labelUsuarioCadastro.innerHTML = 'Usuário: Insira no minímo de 3 Caracteres'
    } else{
        labelUsuarioCadastro.setAttribute('style','color:green')
        labelUsuarioCadastro.innerHTML = 'Usuário:'
    }
});
//Verificar se a senha e o confirmar senha estão iguais
senhaConfirmar.addEventListener('keyup', () =>{
    if(senhaConfirmar.value == senhaCadastro.value){
        labelSenhaConfirmar.setAttribute('style','color:green')
        labelSenhaCadastro.setAttribute('style','color:green')
        labelSenhaConfirmar.innerHTML = 'Confirmar senha:'
    } else{
        labelSenhaConfirmar.setAttribute('style','color:red')
        labelSenhaCadastro.setAttribute('style','color:red')
        labelSenhaConfirmar.innerHTML = 'Confirmar senha: As senhas não se conferem'
    }
});
//Mostrar e ocultar a senha
function mostrarSenha2(){
    const senhaCadastro = document.getElementById('senhaCadastro')

    const tipo = senhaCadastro.type === 'password' ? 'text' : 'password';
    senhaCadastro.type = tipo;
    
}
//Mostrar e ocultar a senha
function mostrarSenha3(){
    const senhaConfirmar = document.getElementById('senhaConfirmar')

    const tipo = senhaConfirmar.type === 'password' ? 'text' : 'password';
    senhaConfirmar.type = tipo;
    
}
function loginConta(){
    window.location.href="../../index.html";
}