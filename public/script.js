function ImcCalculate(peso, altura) {
    const alturaMetros = altura / 100; 
    return peso / (alturaMetros * alturaMetros);
}

function imcFilter(imc) {
    if (imc < 18.5) {
        return 'Abaixo do peso';
    } else if (imc >= 18.5 && imc < 25) {
        return 'Peso normal';
    } else if (imc >= 25 && imc < 30) {
        return 'Sobrepeso';
    } else {
        return 'Obesidade';
    }
}

function formatarData(data) {
    data = new Date(data);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

function showHistory(param) {
    const div = document.querySelector('.historico');
    div.innerHTML = '';

    param.forEach((teste) => {
        const p = document.createElement('p');
        const dataFormatada = formatarData(teste.data);
        const classificacao = imcFilter(teste.imc);
        p.innerHTML = `Nome: ${teste.nome}<br> Data do teste: ${dataFormatada}<br> Peso: ${teste.peso} kg <br> Altura: ${teste.altura} cm<br> IMC: ${teste.imc.toFixed(2)}<br> Classificação: ${classificacao}<br>`;
        
        const divEachHistory = document.createElement('div');
        divEachHistory.classList.add('eachUser')
        const btnExcluir = document.createElement('button');
        btnExcluir.classList.add('excluir');
        btnExcluir.textContent = 'Excluir';
        btnExcluir.addEventListener('click', () => userDelete(teste.id));
        divEachHistory.appendChild(p)
        p.appendChild(btnExcluir);

        div.appendChild(divEachHistory);
    });
}

function formSend() {
  const inputPeso = parseFloat(document.querySelector('.inputPeso').value);
  const inputAltura = parseFloat(document.querySelector('.inputAltura').value);
  const dataTeste = new Date();
  const inputNome = document.querySelector('.inputName').value;
  if (inputPeso !== typeof Number || inputNome !== typeof string || inputAltura !== typeof Number) {
    alert('Todos os campos devem ser preenchidos corretamente!')
  } else {
    const imc = ImcCalculate(inputPeso, inputAltura);

    createUser(inputNome, inputPeso, inputAltura, imc, dataTeste)
    showHistory();
  }
}

function userDelete(id) {
  fetch(`http://localhost:3322/api/users/${id}`, { method: 'DELETE' })
    .then(() => {
      getAllUsers()
    })
}

function createUser(nome, peso, altura, imc, data) {
    fetch('http://localhost:3322/api/users/', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome, peso, altura, imc, data })
    })
      .then(() => {
        getAllUsers()
      })
}

function updateTask(id, nome, peso, altura, imc, data) {
    fetch('http://localhost:3322/api/users/' + id, {
      method: 'PATCH',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome, peso, altura, imc, data })
    })
      .then(() => {
        getAllUsers()
      })
}

function mountTask() {
    formSend()
}

function getAllUsers() {
    fetch('http://localhost:3322/api/users')
      .then((response) => response.json())
      .then(data => showHistory(data))
}
getAllUsers()