const itens = document.querySelectorAll('.item');
const lixeiras = document.querySelectorAll('.lixeira');
const resultado = document.getElementById('mensagem');

let pontuacao = 0;

itens.forEach(item => {
  item.addEventListener('dragstart', e => {
    e.dataTransfer.setData('tipo', item.dataset.tipo);
    e.dataTransfer.setData('id', item.textContent);
  });
});

lixeiras.forEach(lixeira => {
  lixeira.addEventListener('dragover', e => {
    e.preventDefault();
    const tipoArrastado = e.dataTransfer.getData('tipo');
    if (tipoArrastado === lixeira.dataset.tipo) {
      lixeira.style.background = '#a5d6a7';
    } else {
      lixeira.style.background = '#ffcdd2';
    }
  });

  lixeira.addEventListener('dragleave', () => {
    lixeira.style.background = '#c8e6c9';
  });

  lixeira.addEventListener('drop', e => {
    e.preventDefault();
    const tipoItem = e.dataTransfer.getData('tipo');
    const nomeItem = e.dataTransfer.getData('id');

    if (tipoItem === lixeira.dataset.tipo) {
      resultado.textContent = "✔️ Acertou! Bom trabalho!";
      resultado.style.color = '#2e7d32';

      const itemElement = [...itens].find(i => i.textContent === nomeItem);
      if (itemElement) {
        itemElement.remove();
      }
    } else {
      resultado.textContent = "❌ Item errado! Tente novamente.";
      resultado.style.color = '#c62828';
    }

    lixeira.style.background = '#c8e6c9';

    
    if (document.querySelectorAll('.item').length === 0) {
      resultado.textContent = "🎉 Parabéns! Você reciclou tudo!";
      resultado.style.color = '#2e7d32';
    }
  });
});
