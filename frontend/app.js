function carregarProdutos() {
  const status = document.getElementById('filtro-status').value;
  const tipo = document.getElementById('filtro-tipo').value;
  const busca = document.getElementById('filtro-busca').value;

  const params = new URLSearchParams();

  if (status) params.append('status', status);
  if (tipo) params.append('tipo', tipo);
  if (busca) params.append('busca', busca);

  const url = `/produtos?${params.toString()}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      document.getElementById('total-resultados').textContent = data.total;

      const tbody = document.querySelector('#tabela-produtos tbody');
      tbody.innerHTML = '';

      data.produtos.forEach(produto => {
        const tr = document.createElement('tr');
        
        const tdId = document.createElement('td');
        tdId.textContent = produto.id;
        tr.appendChild(tdId);

        const tdNome = document.createElement('td');
        tdNome.textContent = produto.nome;
        tr.appendChild(tdNome);

        const tdTipo = document.createElement('td');
        tdTipo.textContent = produto.tipo;
        tr.appendChild(tdTipo);

        const tdStatus = document.createElement('td');
        tdStatus.textContent = produto.status;
        tr.appendChild(tdStatus);

        const tdDescricao = document.createElement('td');
        tdDescricao.textContent = produto.descricao;
        tr.appendChild(tdDescricao);

        const tdAcoes = document.createElement('td');
        
        const btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.onclick = () => {
          document.getElementById('prod-id').value = produto.id;
          document.getElementById('prod-nome').value = produto.nome;
          document.getElementById('prod-tipo').value = produto.tipo;
          document.getElementById('prod-status').value = produto.status;
          document.getElementById('prod-descricao').value = produto.descricao;
        };
        tdAcoes.appendChild(btnEditar);

        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'Excluir';
        btnExcluir.style.marginLeft = '5px';
        btnExcluir.onclick = () => {
          if (confirm('Tem certeza que deseja excluir este produto?')) {
            fetch(`/produtos/${produto.id}`, { method: 'DELETE' })
              .then(res => {
                if (res.status === 200 || res.status === 204) {
                  alert('Produto excluído com sucesso!');
                  carregarProdutos();
                } else {
                  alert('Erro ao excluir o produto.');
                }
              });
          }
        };
        tdAcoes.appendChild(btnExcluir);

        tr.appendChild(tdAcoes);

        tbody.appendChild(tr);
      });
    })
    .catch(error => console.error(error));
}

document.getElementById('btn-buscar').addEventListener('click', carregarProdutos);

document.getElementById('form-produto').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const id = document.getElementById('prod-id').value;
  const nome = document.getElementById('prod-nome').value;
  const tipo = document.getElementById('prod-tipo').value;
  const status = document.getElementById('prod-status').value;
  const descricao = document.getElementById('prod-descricao').value;

  const produto = { nome, tipo, status, descricao };

  if (!id) {
    fetch('/produtos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(produto)
    })
    .then(res => {
      if (res.status === 201) {
        alert('Produto cadastrado com sucesso!');
        document.getElementById('form-produto').reset();
        carregarProdutos();
      } else {
        res.json().then(data => alert(data.erro || 'Erro ao cadastrar'));
      }
    });
  } else {
    fetch(`/produtos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(produto)
    })
    .then(res => {
      if (res.status === 200) {
        alert('Produto atualizado com sucesso!');
        document.getElementById('form-produto').reset();
        document.getElementById('prod-id').value = '';
        carregarProdutos();
      } else {
        res.json().then(data => alert(data.erro || 'Erro ao atualizar'));
      }
    });
  }
});

carregarProdutos();
