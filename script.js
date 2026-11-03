

'use strict';


const reduzMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;


const botaoMenu = document.querySelector('.menu-botao');
const menuLista = document.querySelector('.menu-lista');
const linksMenu = document.querySelectorAll('.menu-link');

function alternarMenu(abrir) {
  menuLista.classList.toggle('aberto', abrir);
  botaoMenu.classList.toggle('aberto', abrir);
  botaoMenu.setAttribute('aria-expanded', String(abrir));
  botaoMenu.setAttribute('aria-label', abrir ? 'Fechar menu' : 'Abrir menu');
  document.body.classList.toggle('trava-rolagem', abrir);
}

botaoMenu.addEventListener('click', () => {
  alternarMenu(!menuLista.classList.contains('aberto'));
});


linksMenu.forEach((link) => link.addEventListener('click', () => alternarMenu(false)));
document.addEventListener('keydown', (evento) => {
  if (evento.key === 'Escape') alternarMenu(false);
});


const cabecalho = document.getElementById('cabecalho');
const hero = document.querySelector('.hero');
const heroConteudo = document.querySelector('.hero-conteudo');
let atualizacaoPendente = false;

window.addEventListener('scroll', () => {
  if (!atualizacaoPendente) {
    atualizacaoPendente = true;
    window.requestAnimationFrame(aoRolar);
  }
}, { passive: true });

function aoRolar() {
  atualizacaoPendente = false;
  const y = window.scrollY;

  
  cabecalho.classList.toggle('rolado', y > 24);

  
  if (!reduzMovimento && hero) {
    const alturaHero = hero.offsetHeight;
    if (y <= alturaHero) {
      heroConteudo.style.transform = 'translateY(' + y * 0.16 + 'px)';
      heroConteudo.style.opacity = String(Math.max(1 - (y / alturaHero) * 0.9, 0));
    }
  }
}


const secoes = document.querySelectorAll('main section[id]');

const observadorSecoes = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      linksMenu.forEach((link) => {
        link.classList.toggle('ativo', link.getAttribute('href') === '#' + entrada.target.id);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

secoes.forEach((secao) => observadorSecoes.observe(secao));


const elementosAnimados = document.querySelectorAll('[data-animar]');

if (reduzMovimento) {

  elementosAnimados.forEach((el) => el.classList.add('visivel'));
} else {
  const observadorReveal = new IntersectionObserver((entradas, observador) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visivel');
        observador.unobserve(entrada.target); 
      }
    });
  }, { threshold: 0.15 });

  elementosAnimados.forEach((el) => observadorReveal.observe(el));
}


const elementoAno = document.getElementById('ano');
if (elementoAno) {
  elementoAno.textContent = new Date().getFullYear();
}