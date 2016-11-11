import Vue from 'vue'
import {Time} from './time'
import _ from 'lodash'

require('style!css!bootstrap/dist/css/bootstrap.min.css')
require('bootstrap')

let myVue = new Vue({
    el: '#app',
    data: {
        order: {
            keys: ['pontos', 'gols marcados', 'gols sofridos'],
            sort: ['desc', 'desc', 'asc']
        },
        filter: '',
        colunas: ['nome', 'pontos', 'gols marcados', 'gols sofridos', 'saldo'],
        times: [
          new Time('America MG', require('./assets/americamg-60x60.png')),
          new Time('Atlético PR', require('./assets/atleticopr-60x60.png')),
          new Time('Atlético MG', require('./assets/atleticomg-60x60.png')),
          new Time('Botafogo', require('./assets/botafogo-60x60.png')),
          new Time('Chapecoense', require('./assets/chapecoense-60x60.png')),
          new Time('Corinthians', require('./assets/corinthians-60x60.png')),
          new Time('Coritiba', require('./assets/coritiba-60x60.png')),
          new Time('Cruzeiro', require('./assets/cruzeiro-60x60.png')),
          new Time('Figueirense', require('./assets/figueirense-60x60.png')),
          new Time('Flamengo', require('./assets/flamengo-60x60.png')),
          new Time('Fluminense', require('./assets/fluminense-60x60.png')),
          new Time('Grêmio', require('./assets/gremio-60x60.png')),
          new Time('Internacional', require('./assets/internacional-60x60.png')),
          new Time('Palmeiras', require('./assets/palmeiras-60x60.png')),
          new Time('Ponte Preta', require('./assets/pontepreta-60x60.png')),
          new Time('Santa Cruz', require('./assets/santacruz-60x60.png')),
          new Time('Santos', require('./assets/santos-60x60.png')),
          new Time('São Paulo', require('./assets/saopaulo-60x60.png')),
          new Time('Sport', require('./assets/sport-60x60.png')),
          new Time('Vitória', require('./assets/vitoria-60x60.png'))
      ],
      novoJogo: {
          casa: {
              time: null,
              gols: 0
          },
          fora: {
              time: null,
              gols: 0
          }
      },
      view: 'tabela'
    //   alfabeto: {
    //       a: 'A',
    //       b: 'B',
    //       c: 'C',
    //       d: 'D',
    //       e: 'E',
    //       f: 'F',
    //   }
    },
    // created(){
    //     let indexCasa = Math.floor(Math.random() * 20),
    //         indexFora = Math.floor(Math.random() * 20);
    //
    //     this.novoJogo.casa.time = this.times[indexCasa];
    //     this.novoJogo.casa.gols = 0;
    //     this.novoJogo.fora.time = this.times[indexFora];
    //     this.novoJogo.fora.gols = 0;
    // },
    methods: {
        fimJogo(){
            let timeAdversario = this.novoJogo.fora.time,
                gols = +this.novoJogo.casa.gols,
                golsAdversario = +this.novoJogo.fora.gols;

            this.novoJogo.casa.time.fimJogo(timeAdversario, gols, golsAdversario);

            this.showView('tabela');
        },
        createNovoJogo(){
            let indexCasa = Math.floor(Math.random() * 20),
                indexFora = Math.floor(Math.random() * 20);

            this.novoJogo.casa.time = this.times[indexCasa];
            this.novoJogo.casa.gols = 0;
            this.novoJogo.fora.time = this.times[indexFora];
            this.novoJogo.fora.gols = 0;

            this.showView('novoJogo');
        },
        showView(view){
            this.view = view;
        },
        sortBy(coluna){
            this.order.keys = coluna;
            this.order.sort = this.order.sort == 'desc' ? 'asc' : 'desc';
        }
    },
    computed: {
        timesFiltered(){
            let colecao = _.orderBy(this.times, this.order.keys, this.order.sort);

            return _.filter(colecao, item => {
                return item.nome.indexOf(this.filter) >= 0;
            });
        }
    },
    filters: {
        saldo(time){
            return time.gm - time.gs;
        },
        upWords(value){
            return value.charAt(0).toUpperCase() + value.slice(1);
        }
    }
})

// console.log(myVue);
