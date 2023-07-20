import { createApp } from 'vue'
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.js"
import App from './App.vue'
import router from './router.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import store from './store';


const app = createApp(App)
app.use(store)

app.use(router);

app.mount('#app')

