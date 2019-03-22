(function($) {
    'use strict';
  
    /*
    Vamos estruturar um pequeno app utilizando módulos.
    Nosso APP vai ser um cadastro de carros. Vamos fazê-lo por partes.
    A primeira etapa vai ser o cadastro de veículos, de deverá funcionar da
    seguinte forma:
    - No início do arquivo, deverá ter as informações da sua empresa - nome e
    telefone (já vamos ver como isso vai ser feito)
    - Ao abrir a tela, ainda não teremos carros cadastrados. Então deverá ter
    um formulário para cadastro do carro, com os seguintes campos:
      - Imagem do carro (deverá aceitar uma URL)
      - Marca / Modelo
      - Ano
      - Placa
      - Cor
      - e um botão "Cadastrar"
    Logo abaixo do formulário, deverá ter uma tabela que irá mostrar todos os
    carros cadastrados. Ao clicar no botão de cadastrar, o novo carro deverá
    aparecer no final da tabela.
    Agora você precisa dar um nome para o seu app. Imagine que ele seja uma
    empresa que vende carros. Esse nosso app será só um catálogo, por enquanto.
    Dê um nome para a empresa e um telefone fictício, preechendo essas informações
    no arquivo company.json que já está criado.
    Essas informações devem ser adicionadas no HTML via Ajax.
    Parte técnica:
    Separe o nosso módulo de DOM criado nas últimas aulas em
    um arquivo DOM.js.
    E aqui nesse arquivo, faça a lógica para cadastrar os carros, em um módulo
    que será nomeado de "app".
    */
    let app = (function appController() {
        return {
            init: function init() {
                this.companyInfo();
                this.initEvents();
                this.removeOnTr();
                // this.initEvents2();
            },

            initEvents: function initEvents() {
                $('[data-js="form-register"').on('submit', this.handleSubmit);
            },
            handleSubmit: function handleSubmit(event) {
                // console.log('submit');
                event.preventDefault();
                let $tableCar = $('[data-js="table-car"]').get();
                $tableCar.appendChild(app.createNewCar());
                
            },
            // initEvents2: function initEvents2() {
            //     $('[data-js="btnRemove"').on('click', this.handleSubmit2);
            // },
            // handleSubmit2: function handleSubmit2(event) {
            //     // console.log('submit');
            //     event.preventDefault();
            //     // let $tableCar = $('[data-js="table-car"]').get();
            //     // $tableCar.appendChild(app.createNewCar());
            //     return alert('V.G.A.B.U.N.D.O.!!!!!')
            // },
            qtdTr: function qtdTr(){
                return this.element = document.querySelectorAll('tr').length;
            },

            
            createNewCar: function createNewCar() {
                let $fragment = document.createDocumentFragment();
                let $tr = document.createElement('tr');
                let $id = document.createElement('td');
                let $tdImage = document.createElement('td');
                let $image = document.createElement('img');
                let $tdBrand = document.createElement('td');
                let $tdYear = document.createElement('td');
                let $tdPlate = document.createElement('td');
                let $tdColor = document.createElement('td');
                let $tdBtn = document.createElement('td');
                let $btnDelet = document.createElement('button');
    

                
                $tdBrand.textContent = $('[data-js="brand-model"]').get().value;
                $tdYear.textContent = $('[data-js="year"]').get().value;
                $tdPlate.textContent = $('[data-js="plate"]').get().value;
                $tdColor.textContent = $('[data-js="color"]').get().value;


                $image.setAttribute('src', $('[data-js="image"]').get().value)
                $tdImage.appendChild($image);

                
                $id.innerHTML = this.qtdTr();
               
                // parseInt($idAgora.innerHTML) + idAgora + 1;

                // $btnDelet.setAttribute('data-js', 'submit')
                $tr.setAttribute('data-js', 'trRemove' + this.qtdTr())
                $btnDelet.setAttribute('data-js', 'btnRemove')
                $btnDelet.setAttribute('type', 'submit')
                // $btnDelet.setAttribute('value', 'submit')
                $btnDelet.innerHTML = 'Remover - [x]';      

                
                $tdBtn.appendChild($btnDelet);

                $tr.appendChild($id);
                $tr.appendChild($tdImage);
                $tr.appendChild($tdBrand);
                $tr.appendChild($tdYear);
                $tr.appendChild($tdPlate);
                $tr.appendChild($tdColor);
                $tr.appendChild($tdBtn);

                return $fragment.appendChild($tr);
            },

            
            removeOnTr: function removeOnTr(){
                $('[data-js="table-car"').on('mouseup', this.removeTr);
            },

            removeTr: function removeTr(event){
                event.preventDefault();
                // console.log(event);
                const $valueTr = event.srcElement.parentElement.parentElement.dataset.js;
                let $myTr = $('[data-js="'+$valueTr+'"]').get();
                // let $myTr = $('[data-js="trRemove"]').get();
                $myTr.remove();

                // this.qtdTr()
                
               
                
                // console.log('aqui ' + this.element);

                // return alert('Funcionou!!!!');
                // let $myTr = $('[data-js="trRemove"]').get();
                // let $dtaNow = Date.now();
                //  let teste = ($myTr + $dtaNow)
                //  teste.remove();
            },

            // minhaFuncao: function minhaFuncao(){
            //     return alert('VAGABUNDO!!!!');
            // },
            
            companyInfo: function companyInfo() {
                let ajax = new XMLHttpRequest();
                ajax.open('GET', '/C:/Users/Lucas/Dropbox/course-javascript-ninja/challenges/challenge-29/company.json', true); //O true é para fazer a busca de forma assíncrona.
                ajax.send();
                ajax.addEventListener('readystatechange', this.getCompanyInfo, false);
            },

            getCompanyInfo: function getCompanyInfo() {
                if(!app.isReady.call(this))
                    return;
                let data = JSON.parse(this.responseText);
                let $companyName = $('[data-js="company-name"]').get();
                let $companyPhone = $('[data-js="company-phone"]').get();
                $companyName.textContent = data.name;
                $companyPhone.textContent = data.phone;
            },

            isReady: function isReady() {
                return this.readyState === 4 && this.status === 200;
            }
        };
    })();

    let $formRegister = new DOM('[data-js="form-register"]');
    app.init();

  })(window.DOM);