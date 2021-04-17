import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

let data = {
  currentID: 2,
  tickets: [],
  getTickets() {
    return this.tickets;
  },
  addTicket(name, problem) {
    this.tickets.push({
      id: this.currentID,
      name: name,
      problem: problem
    });
    this.currentID += 1;
  }
}

new Vue({
  router,
  data: data,
  render: h => h(App)
}).$mount('#app')
