import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {applyPolyfills, defineCustomElements} from "h8k-components/loader";

applyPolyfills()
    .then(() => {
        defineCustomElements()
    })
    
createApp(App).use(store).use(router).mount('#app')
