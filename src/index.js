import FlipClock from './FlipClock'

const install = function(Vue) {
  Vue.component('FlipClock', FlipClock);
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export { FlipClock }

export default {
  version: '0.1.7',
  install,
  FlipClock,
  vueFlipClock: FlipClock
}
