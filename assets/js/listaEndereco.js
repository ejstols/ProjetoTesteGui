alasql('CREATE LOCALSTORAGE DATABASE IF NOT EXISTS agrosqldb')
alasql('ATTACH LOCALSTORAGE DATABASE agrosqldb')
alasql('USE agrosqldb')
//  alasql('DELETE FROM endereco')
// Criação da tabela no AlaSQL

alasql('CREATE TABLE IF NOT EXISTS endereco (id INT PRIMARY KEY, cep NUMBER, rua STRING,bairro STRING, cidade STRING, estado STRING, pais STRING, idcli INT)');

function cadastroConcluido(){
    const enderecos = alasql('SELECT endereco.*,cadastro.nome FROM endereco LEFT OUTER JOIN cadastro ON cadastro.id = endereco.idcli ORDER BY endereco.id ')

   
    const tabela = document.getElementById('enderecoTable').querySelector('tbody');
    tabela.innerHTML = ''


    enderecos.forEach(endereco => {
        const tr = document.createElement('tr');
        tr.innerHTML=`
        <td>${endereco.id}</td>
        <td>${endereco.cep}</td>
        <td>${endereco.rua}</td>
        <td>${endereco.bairro}</td>
        <td>${endereco.cidade}</td>
        <td>${endereco.estado}</td>
        <td>${endereco.pais}</td>
        <td>${endereco.idcli} - ${endereco.nome}</td>
        `;
        tabela.appendChild(tr)
    });
}
function cadastroEndereco(){
    window.location.href="cadastroEndereco.html"
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