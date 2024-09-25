alasql('CREATE LOCALSTORAGE DATABASE IF NOT EXISTS agrosqldb')
alasql('ATTACH LOCALSTORAGE DATABASE agrosqldb')
alasql('USE agrosqldb')

alasql('CREATE TABLE IF NOT EXISTS cadastro (id INT, nome STRING, cpf NUMBER, dataNascimento DATE, telefone NUMBER, celular NUMBER)');

function cadastrado(){
    const clientes = alasql('SELECT * FROM cadastro ORDER BY id')

    const tabela = document.getElementById('clientesTable').querySelector('tbody');
    tabela.innerHTML = ''


    clientes.forEach(cliente => {
        const tr = document.createElement('tr');
        tr.innerHTML=`
        <td>${cliente.id}</td>
        <td>${cliente.nome}</td>
        <td>${cliente.cpf}</td>
        <td>${cliente.dataNascimento}</td>
        <td>${cliente.telefone}</td>
        <td>${cliente.celular}</td>
        `;
        tabela.appendChild(tr)
    });
}
function cadastroCliente(){
    window.location.href="cadastroCliente.html"
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