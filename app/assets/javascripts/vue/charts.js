var app = new Vue({
  el: document.getElementById('app'),
  data: {
    graphic: {
      title: '', subtitle: '', titleScale: '', valueScale: ''
    },
    httpMethods: ['GET', 'POST'],
    typeRunServices: [
      { code: 'in', description: 'EXECUTAR O SERVIÇO EM' },
      { code: 'every', description: 'EXECUTAR O SERVIÇO A CADA' },
      { code: 'at', description: 'EXECUTAR O SERVIÇO NO/ÀS' }
    ],
    service: {
      method: '', url: ''
    },
    queryParams: [],
    schedule: { type: '', date: '' }
  },
  methods: {
    addQueryParams: function (index) {
      this.queryParams.push({ key: '', value: '' });
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
  template: '#every-template-vue'
})

Vue.component('schedule-in', {
  template: '#in-template-vue'
})

Vue.component('schedule-at', {
  template: '#at-template-vue'
})
