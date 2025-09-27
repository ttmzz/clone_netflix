document.addEventListener('DOMContentLoaded', function() {

  const catalogo = document.querySelector('.catalogo__filmes');
  const btnEsq = document.querySelector('.seta--esquerda');
  const btnDir = document.querySelector('.seta--direita');
  const items = document.querySelectorAll('[data-faq-question]');

  // Definir o tamanho do incremento para rolar (por exemplo, 300px)
  const scrollIncrement = 300;

  // Função para verificar se a tela é menor que 1024px (ajuste conforme necessário)
  const isSmallScreen = () => window.innerWidth <= 1024;

   // 👇 Atualiza a visibilidade dos botões com base na posição atual do scroll
  const updateButtonVisibility = () => {
    const scrollLeft = scrollArea.scrollLeft;
    const maxScrollLeft = scrollArea.scrollWidth - scrollArea.clientWidth;

    // Se está no início, esconde botão da esquerda
    btnEsq.style.display = scrollLeft <= 0 ? 'none' : 'block';

    // Se está no fim, esconde botão da direita
    btnDir.style.display = scrollLeft >= maxScrollLeft - 1 ? 'none' : 'block';
  };

  // Função para rolar suavemente se estiver em tela pequena
  const handleScroll = (direction) => {
    if (isSmallScreen()) {
      // Se estiver em tela pequena, rolar de forma suave
      const scrollAmount = direction === 'left' ? -scrollIncrement : scrollIncrement;
      catalogo.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    } else {
      // Caso contrário, rolar até o início ou fim, como antes
      const scrollToValue = direction === 'left' ? 0 : catalogo.scrollWidth;
      catalogo.scrollTo({ left: scrollToValue, behavior: 'smooth' });
    }
  };

  // Ações para os botões de navegação
  btnEsq.addEventListener('click', () => handleScroll('left'));
  btnDir.addEventListener('click', () => handleScroll('right'));

  // Seção FAQ, accordion
  items.forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('is-open');
    });
  });

});
