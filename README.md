# Consulta API da ViaCEP

Teste aqui: https://joaoroccella.github.io/consulta-api-viacep/

## Explicação do código

Apenas 5 inputs são necessários para realizar a consulta e receber as informações do CEP:

```html
<div>
    <label>CEP:</label>
    <input type="text" id="cep" onblur="pesquisaCEP(this.value);">

    <label>Logradouro:</label>
    <input type="text" id="rua">

    <label>Bairro:</label>
    <input type="text" id="bairro">

    <label>Cidade:</label>
    <input type="text" id="cidade">

    <label>UF:</label>
    <input type="text" id="uf">

</div>
```

O trigger da pesquisa do CEP está no input do CEP:

```js
onblur="pesquisaCEP(this.value)"
```

O evento `onblur` é disparado quando o `input` perde o foco, seja clicando fora dele ou usando a tecla TAB. A função `pesquisaCEP()` é chamada, passando como parâmetro `this.value`, ou seja, o valor do próprio `input`.

Vamos dar uma olhada na função `pesquisaCEP()`:

```js
function pesquisaCEP(valor) {

    const cep = valor.replace(/\D/g, '');

    if (cep != "") {

        const validacep = /^[0-9]{8}$/;

        if (validacep.test(cep)) {

            document.querySelector('#rua').setAttribute('disabled', '');
            document.querySelector('#bairro').setAttribute('disabled', '');
            document.querySelector('#cidade').setAttribute('disabled', '');
            document.querySelector('#uf').setAttribute('disabled', '');

            const requisicao = new Request(`https://viacep.com.br/ws/${cep}/json/`, 
            {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                },
            })

            fetch(requisicao)
                .then(resposta => resposta.json())
                .then(resposta => carregaCEP(resposta));

        } else {

            limpaFormularioCEP();
            alert('Formato de CEP inválido.');
        }

    } else {

        limpaFormularioCEP();
    }
}
```


```js
const cep = valor.replace(/\D/g, '');
```

A função `limpa_formulario_cep()` limpa o formulário e torna os inputs editáveis novamente:

```js
function limpaFormularioCEP() {

    document.getElementById('rua').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('uf').value = '';

    document.querySelector('#rua').removeAttribute('disabled');
    document.querySelector('#bairro').removeAttribute('disabled');
    document.querySelector('#cidade').removeAttribute('disabled');
    document.querySelector('#uf').removeAttribute('disabled');

}

```

A função `carregaCEP()` recebe os valores da consulta à API e os carrega nos respectivos inputs:

```js
function carregaCEP(conteudo) {

    if (!("erro" in conteudo)) {

        document.getElementById('rua').value = conteudo.logradouro;
        document.getElementById('bairro').value = conteudo.bairro;
        document.getElementById('cidade').value = conteudo.localidade;
        document.getElementById('uf').value = conteudo.uf;

        document.querySelector('#rua').removeAttribute('disabled');
        document.querySelector('#rua').focus();

    } else {

        limpaFormularioCEP();
        alert('CEP não encontrado.');
    }
}
```