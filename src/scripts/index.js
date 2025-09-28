document.addEventListener('DOMContentLoaded', function () {
  const catalogo = document.querySelector('.catalogo__filmes');
  const btnEsq = document.querySelector('.seta--esquerda');
  const btnDir = document.querySelector('.seta--direita');
  const items = document.querySelectorAll('[data-faq-question]');

  // Definir o tamanho do incremento para rolar (por exemplo, 300px)
  const scrollIncrement = 300;

  // Função para verificar se a tela é menor que 1024px
  const isSmallScreen = () => window.innerWidth <= 1024;

  // Atualiza a visibilidade dos botões com base na posição atual do scroll
  const updateButtonVisibility = () => {
    const scrollLeft = catalogo.scrollLeft;
    const maxScrollLeft = catalogo.scrollWidth - catalogo.clientWidth;

    btnEsq.style.display = scrollLeft <= 0 ? 'none' : 'block';
    btnDir.style.display = scrollLeft >= maxScrollLeft - 1 ? 'none' : 'block';
  };

  // Função para rolar suavemente, só de 1 em 1 incremento, sem rolar direto até o fim
  const handleScroll = (direction) => {
    const scrollAmount = direction === 'left' ? -scrollIncrement : scrollIncrement;
    catalogo.scrollBy({ left: scrollAmount, behavior: 'smooth' });

    setTimeout(updateButtonVisibility, 400);
  };

  // Ações para os botões de navegação
  btnEsq.addEventListener('click', () => handleScroll('left'));
  btnDir.addEventListener('click', () => handleScroll('right'));

  // Inicializa a visibilidade correta dos botões
  updateButtonVisibility();

  // FAQ - abre uma pergunta por vez e rola suavemente até ela
  items.forEach((item) => {
    item.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // Fecha todas as perguntas antes de abrir a nova
      items.forEach((el) => el.classList.remove('is-open'));

      if (!isOpen) {
        item.classList.add('is-open');
        item.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest'
        });
      }
    });
  });
});

