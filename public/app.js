document.getElementById('btn-buscar').addEventListener('click', () => {
  const status = document.getElementById('filtro-status').value;
  const tipo = document.getElementById('filtro-tipo').value;
  const busca = document.getElementById('filtro-busca').value;

  const params = new URLSearchParams();

  if (status) {
    params.append('status', status);
  }
  if (tipo) {
    params.append('tipo', tipo);
  }
  if (busca) {
    params.append('busca', busca);
  }

  const url = `/equipamentos?${params.toString()}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      document.getElementById('total-resultados').textContent = data.total;

      const tbody = document.querySelector('#tabela-equipamentos tbody');
      tbody.innerHTML = '';

      data.equipamentos.forEach(equipamento => {
        const tr = document.createElement('tr');
        
        const tdId = document.createElement('td');
        tdId.textContent = equipamento.id;
        tr.appendChild(tdId);

        const tdNome = document.createElement('td');
        tdNome.textContent = equipamento.nome;
        tr.appendChild(tdNome);

        const tdTipo = document.createElement('td');
        tdTipo.textContent = equipamento.tipo;
        tr.appendChild(tdTipo);

        const tdStatus = document.createElement('td');
        tdStatus.textContent = equipamento.status;
        tr.appendChild(tdStatus);

        const tdDescricao = document.createElement('td');
        tdDescricao.textContent = equipamento.descricao;
        tr.appendChild(tdDescricao);

        tbody.appendChild(tr);
      });
    })
    .catch(error => {
      console.error(error);
    });
});
