let itemSelecionado = null;
const mensagem = document.getElementById('mensagem');

document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.item').forEach(i => i.classList.remove('selected'));
    itemSelecionado = item;
    item.classList.add('selected');
    mensagem.textContent = "Agora toque na lixeira certa";
    mensagem.style.color = "#333";
  });
});

document.querySelectorAll('.lixeira').forEach(lixeira => {
  lixeira.addEventListener('click', () => {
    if (!itemSelecionado) {
      mensagem.textContent = "Primeiro toque em um item!";
      mensagem.style.color = "#d32f2f";
      return;
    }

    const tipoItem = itemSelecionado.dataset.tipo;
    const tipoLixeira = lixeira.dataset.tipo;

    if (tipoItem === tipoLixeira) {
      mensagem.textContent = "✔️ Acertou!";
      mensagem.style.color = "#2e7d32";
      itemSelecionado.remove();
    } else {
      mensagem.textContent = "❌ Lixeira errada!";
      mensagem.style.color = "#c62828";
    }

    itemSelecionado = null;
    document.querySelectorAll('.item').forEach(i => i.classList.remove('selected'));

    if (document.querySelectorAll('.item').length === 0) {
      mensagem.textContent = "🎉 Parabéns! Você reciclou tudo!";
      mensagem.style.color = "#2e7d32";
    }
  });
});
