// scanner.js

const items = document.querySelectorAll('.item');
const bins = document.querySelectorAll('.lixeira');
const resultado = document.querySelector('.resultado');

let acertos = 0;
let totalItens = items.length;

items.forEach(item => {
  item.addEventListener('dragstart', dragStart);
});

bins.forEach(bin => {
  bin.addEventListener('dragover', dragOver);
  bin.addEventListener('drop', drop);
});

function dragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.dataset.tipo);
  e.dataTransfer.setData('text/id', e.target.textContent);
  e.dataTransfer.setDragImage(e.target, 50, 20);
}

function dragOver(e) {
  e.preventDefault();
  e.currentTarget.style.backgroundColor = '#81c784';
}

function drop(e) {
  e.preventDefault();
  e.currentTarget.style.backgroundColor = '#a5d6a7';

  const tipoLixeira = e.currentTarget.dataset.tipo;
  const tipoItem = e.dataTransfer.getData('text/plain');
  const nomeItem = e.dataTransfer.getData('text/id');

  if (tipoItem === tipoLixeira) {
    acertos++;
    resultado.textContent = `Você acertou ${acertos} de ${totalItens} itens!`;
    // Remover o item da lista após acertar
    const itemParaRemover = [...items].find(i => i.textContent === nomeItem && !i.classList.contains('removido'));
    if (itemParaRemover) {
      itemParaRemover.classList.add('removido');
      itemParaRemover.style.opacity = '0.3';
      itemParaRemover.style.pointerEvents = 'none';
    }
  } else {
    resultado.textContent = `Ops! ${nomeItem} não vai nessa lixeira. Tente novamente.`;
  }

  if (acertos === totalItens) {
    resultado.textContent = 'Parabéns! Você classificou todos os resíduos corretamente! 🎉';
  }
}
