import Vue from 'vue'
import FlipClock from './FlipClock.vue'
import 'babel-polyfill'
new Vue({
  el: '#app',
  render: h => h(FlipClock)
})
