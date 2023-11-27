import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { createPinia } from 'pinia';
import { loadFonts } from './plugins/webfontloader'
import 'bootstrap/dist/css/bootstrap.css';

loadFonts()
const pinia = createPinia();

createApp(App)
  .use(router)
  .use(pinia)
  .use(vuetify)
  .mount('#app')
