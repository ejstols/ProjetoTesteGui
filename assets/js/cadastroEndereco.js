alasql('CREATE LOCALSTORAGE DATABASE IF NOT EXISTS agrosqldb')
alasql('ATTACH LOCALSTORAGE DATABASE agrosqldb')
alasql('USE agrosqldb')
//  alasql('DELETE FROM endereco')
// Criação da tabela no AlaSQL

function formatarCep(input){
    let cep = input.value.replace(/\D/g,'');

    if (cep.length > 5) {
        cep = cep.replace(/(\d{5})(\d)/, '$1-$2');
    }

    input.value = cep.substring(0, 10);
}
function clienteId(input){
    let idcliente = Number(input.value)

    if(idcliente === 0){
        document.getElementById('nomeCliente').value = " ";
    } else{

    let clienteid = alasql('SELECT nome FROM cadastro WHERE id = ?',[idcliente]);

    if(clienteid.length > 0){
       document.getElementById('nomeCliente').value = `${clienteid[0].nome}`
    }
}
}
function guardarDados(){

    const enderecoForm = document.getElementById('enderecoForm');

    if(!enderecoForm.checkValidity()){
        alert('Existem campos obrigatórios que precisam ser preenchidos');
    }else{

      var maiorID = alasql('select IFNULL(max(id),0) as ultimoId from endereco') // Retorna o maior valor numa coluna chamada ultimoId
      let proximoCodigo = maiorID[0].ultimoId +1;

    const cep = document.getElementById('cep').value;
    const rua = document.getElementById('rua').value;
    const bairro = document.getElementById('bairro').value;
    const cidade = document.getElementById('cidade').value;
    const estado = document.getElementById('estado').value;
    const pais = document.getElementById('pais').value;
    const idcli = document.getElementById('idcli').value;
    
    const cep2 = Number(cep.replace(/\D/g,''));

    const idClienteExiste = alasql('SELECT id FROM cadastro WHERE id = ?',Number([idcli]));


    
    if(idClienteExiste.length === 0){
      alert('Código do cliente inválido');
    }else{
    alasql('INSERT INTO endereco (id,cep,rua,bairro,cidade,estado,pais,idcli) VALUES (?,?,?,?,?,?,?,?)',[proximoCodigo,cep2,rua,bairro,cidade,estado,pais,idcli]);
    window.location.href='listaEndereco.html';
    alert('Cadastrado com sucesso')
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