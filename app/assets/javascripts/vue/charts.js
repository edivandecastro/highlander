var app = new Vue({
  el: document.getElementById('app'),
  data: {
    graphic: {
      title: '', subtitle: '', titleScale: '', valueScale: ''
    },
    httpMethods: ['SELECIONE O MÉTODO', 'GET', 'POST'],
    typeRunServices: [
      { code: '', description: 'SELECIONE O  SERVIÇO' },
      { code: 'in', description: 'EXECUTAR O SERVIÇO EM' },
      { code: 'every', description: 'EXECUTAR O SERVIÇO A CADA' },
      { code: 'at', description: 'EXECUTAR O SERVIÇO NO/ÀS' }
    ],
    service: {
      method: '', url: ''
    },
    queryParams: [],
    schedule: { type: '', date: '', amount: '', timeUnit: '', time: '' }
  },
  methods: {
    addQueryParams: function (index) {
      this.queryParams.push({ key: '', value: '' });
    },
    saveChart: function () {
      var schedule = {}

      switch (this.schedule.type) {
        case 'in':
          schedule = {
            type_run_service: this.schedule.type,
            date: this.schedule.date
          }
          break;
        case 'every':
          schedule = {
            type_run_service: this.schedule.type,
            amount: this.schedule.amount,
            time_unit: this.schedule.timeUnit
          }
          break;
        case 'at':
          schedule = {
            type_run_service: this.schedule.type,
            date: this.schedule.date,
            time: this.schedule.time
          }
          break;
      }

      var charts = {
        title: this.graphic.title,
        subtitle: this.graphic.subtitle,
        title_scale: this.graphic.titleScale,
        value_scale: this.graphic.valueScale,
        service: {
          http_method: this.service.method,
          url: this.service.url,
          schedule: schedule,
          query_strings: this.queryParams
        }
      }

      axios.post('/charts')
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {
          // always executed
          console.log("aqui");
        });
    }
  }
});

Vue.component('query-params', {
  template: '#fields-params-vue',
  props: ['query', 'index'],
  methods: {
    removeQueryParams: function (index) {
      this.$parent.queryParams.splice(index, 1);
    }
  }
})

Vue.component('schedule-every', {
  template: '#every-template-vue',
  props: ['value'],
  data: function () {
    return {
      timeUnits: [
        { code: '', description: 'SELECIONE A UNIDADE DE TEMPO' },
        { code: 'S', description: 'SEGUNDO(S)' },
        { code: 'M', description: 'MINUTO(S)' },
        { code: 'H', description: 'HORA(S)' }
      ]
    }
  },
  mounted: function () {
    $('.selectpicker').selectpicker({ width: 250 });
  }
})

Vue.component('schedule-in', {
  template: '#in-template-vue',
  props: ['value']
})

Vue.component('schedule-at', {
  template: '#at-template-vue',
  props: ['value']
})

Vue.component('v-select', VueSelect.VueSelect);
