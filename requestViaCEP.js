function limpaFormularioCEP() {

  document.querySelectorAll('input.info').forEach(input => {
    input.value = '';
    input.removeAttribute('disabled');
  });

}

function carregaCEP(dados) {

  if (!("erro" in dados)) {

    for (dado in dados) {
      document.querySelector(`#${dado}`).value = dados[dado];
    }

    document.querySelectorAll('input.info.alteravel').forEach(input => {
      input.removeAttribute('disabled');
    });

  } else {

    limpaFormularioCEP();
    alert('CEP não encontrado.');
  }

  document.querySelector('#logradouro').focus();
}

function pesquisaCEP(valor) {

  const cep = valor.replace(/\D/g, '');

  if (cep != "") {

    const validacep = /^[0-9]{8}$/;

    if (validacep.test(cep)) {

      document.querySelectorAll('input.info').forEach(input => {
        input.setAttribute('disabled', '');
      });

      const requisicao = new Request(`https://viacep.com.br/ws/${cep}/json/`, {
        "method": "GET",
        "headers": {
          "Content-type": "application/json"
        }
      })

      fetch(requisicao)
        .then(resposta => {
          if (resposta.status === 200) {
            return resposta.json();
          } else {
            throw new Error("Algo deu errado na consulta à API.");
          }
        })
        .then(dados => carregaCEP(dados));

    } else {

      limpaFormularioCEP();
      alert('Formato de CEP inválido.');
    }

  } else {

    limpaFormularioCEP();
  }
}