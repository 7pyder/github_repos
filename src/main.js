import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import Store from './store'

Vue.use(Vuex)
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()

const store = new Vuex.Store(Store)

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]
Vue.filter('date', (value) => {
  const up_date = new Date(value)
  const today = new Date()
  const day = 24 * 3600 * 1000
  const diff = parseInt((today.getTime() - up_date.getTime()) / day, 10)
  if (diff <= 30) {
    return `Updated ${diff} days ago`
  }

  const date = up_date.getDate()
  const month = months[up_date.getMonth()]
  const year = up_date.getFullYear()

  if (year === today.getFullYear()) {
    return `Updated on ${date} ${month}`
  }
  return `Updated on ${date} ${month} ${year}`
})

new Vue({
  store,
  render: (h) => h(App)
}).$mount('#app')
