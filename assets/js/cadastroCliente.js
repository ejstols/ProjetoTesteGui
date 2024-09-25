alasql('CREATE LOCALSTORAGE DATABASE IF NOT EXISTS agrosqldb')
alasql('ATTACH LOCALSTORAGE DATABASE agrosqldb')
alasql('USE agrosqldb')


function formatarCpf(input){
        let cpf = input.value.replace(/\D/g, '')

        if (cpf.length <= 11) {
            cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
            cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
            cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        }

        input.value = cpf;
}
function formatarTelefone(input){
    let telefone = input.value.replace(/\D/g,'')

    if(telefone.length <= 6){
      telefone = telefone.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    }else if (telefone.length > 2) {
      telefone = telefone.replace(/^(\d{2})(\d{4})(\d+)$/, '($1) $2-$3');
    }else if (telefone.length > 0) {
      telefone = telefone.replace(/^(\d{2})(\d+)$/, '($1) $2');
  }

  input.value = telefone;
}
function formatarCelular(input){
  let celular = input.value.replace(/\D/g,'')

  if(celular.length <= 6){
    celular = celular.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
  }else if (celular.length > 2) {
    celular = celular.replace(/^(\d{2})(\d{4})(\d+)$/, '($1) $2-$3');
  }else if (celular.length > 0) {
    celular = celular.replace(/^(\d{2})(\d+)$/, '($1) $2');
}

input.value = celular;
}
function salvarDados(){

    const form = document.getElementById('cadastroForm');

    if(!form.checkValidity()){
        alert('Existem campos obrigatórios não preenchidos.');
    }else{

    var maiorID = alasql('select IFNULL(max(id),0) as ultimoId from cadastro') // Retorna o maior valor numa coluna chamada ultimoId
    let proximoCodigo = maiorID[0].ultimoId +1;

    // Captura os dados do formulário
    const nome = document.getElementById('nome').value;
    let cpf = document.getElementById('cpf').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const telefone = document.getElementById('telefone').value;
    const celular = document.getElementById('celular').value;

    const cpf2 = Number(cpf.replace(/\D/g,''));
    const telefone2= Number(telefone.replace(/\D/g,''));
    const celular2= Number(celular.replace(/\D/g,''));

    const cpfExiste = alasql('SELECT * FROM cadastro WHERE cpf = ?', [cpf2]);

    if(cpfExiste.length === 0){
        alasql('INSERT INTO cadastro (id,nome,cpf,dataNascimento,telefone,celular) VALUES (?,?,?,?,?,?)',[proximoCodigo,nome,cpf2,dataNascimento,telefone2,celular2]);
        window.location.href="listaCliente.html";
    }else{
        alert('CPF já está cadastrado')
        document.getElementById('cpf').focus();
    }
}
}
class MobileNavbar {
    constructor(mobileMenu, navList, navLinks) {
      this.mobileMenu = document.querySelector(mobileMenu);
      this.navList = document.querySelector(navList);
      this.navLinks = document.querySelectorAll(navLinks);
      this.activeClass = "active";
  
      this.handleClick = this.handleClick.bind(this);
    }
  
    animateLinks() {
      this.navLinks.forEach((link, index) => {
        link.style.animation
          ? (link.style.animation = "")
          : (link.style.animation = `navLinkFade 0.5s ease forwards ${
              index / 7 + 0.3
            }s`);
      });
    }
  
    handleClick() {
      this.navList.classList.toggle(this.activeClass);
      this.mobileMenu.classList.toggle(this.activeClass);
      this.animateLinks();
    }
  
    addClickEvent() {
      this.mobileMenu.addEventListener("click", this.handleClick);
    }
  
    init() {
      if (this.mobileMenu) {
        this.addClickEvent();
      }
      return this;
    }
  }
  
  const mobileNavbar = new MobileNavbar(
    ".mobile-menu",
    ".nav-list",
    ".nav-list li",
  );
  mobileNavbar.init();



