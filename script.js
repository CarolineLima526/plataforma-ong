// Mensagem ao clicar em "Apoiar Projeto"
function apoiarProjeto(nomeProjeto) {
  alert(`Obrigado por demonstrar interesse no projeto "${nomeProjeto}"! 💖`);
}

// Função para atualizar o total arrecadado
function atualizarTotal(doacoes) {
  const total = doacoes.reduce((soma, d) => soma + parseFloat(d.valor), 0);
  document.getElementById('valorTotal').textContent = total.toFixed(2).replace('.', ',');
}

// Função para exibir doações armazenadas
function carregarDoacoes() {
  const doacoes = JSON.parse(localStorage.getItem('doacoes')) || [];
  const lista = document.getElementById('doacoesRegistradas');
  lista.innerHTML = '';

  if (doacoes.length === 0) {
    lista.innerHTML = '<li>Nenhuma doação registrada ainda.</li>';
    document.getElementById('valorTotal').textContent = '0,00';
    return;
  }

  doacoes.forEach((d, i) => {
    const item = document.createElement('li');
    item.textContent = `${i + 1}. ${d.nome} doou R$${parseFloat(d.valor).toFixed(2).replace('.', ',')}`;
    lista.appendChild(item);
  });

  atualizarTotal(doacoes);
}

// Captura de doações
document.getElementById('formDoacao').addEventListener('submit', function(e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const valor = parseFloat(document.getElementById('valor').value);

  if (!nome || isNaN(valor) || valor <= 0) {
    alert('Por favor, insira um nome e um valor válido.');
    return;
  }

  // Recupera doações existentes e adiciona nova
  const doacoes = JSON.parse(localStorage.getItem('doacoes')) || [];
  doacoes.push({ nome, valor });
  localStorage.setItem('doacoes', JSON.stringify(doacoes));

  alert(`Obrigado, ${nome}! Sua doação de R$${valor.toFixed(2).replace('.', ',')} foi registrada com sucesso! 🙏`);
  
  this.reset();
  carregarDoacoes();
});

// Botão para limpar doações
document.getElementById('limparDoacoes').addEventListener('click', () => {
  if (confirm('Tem certeza que deseja apagar todas as doações?')) {
    localStorage.removeItem('doacoes');
    carregarDoacoes();
  }
});

// Mensagem ao clicar em "Quero Ser Voluntário"
function mostrarMensagem() {
  alert('Obrigado por querer fazer parte! Nossa equipe entrará em contato com você em breve. 💪');
}

// Carrega doações e total ao abrir a página
window.addEventListener('load', carregarDoacoes);
