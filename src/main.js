import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import vuetify from './plugins/vuetify';
import Snackbar from './components/Shared/Snackbar.vue';

Vue.config.productionTip = false;

Vue.component(Snackbar);

new Vue({
  store,
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
