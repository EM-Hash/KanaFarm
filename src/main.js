import Vue from 'vue'
import App from "@/App";
import {firestorePlugin} from "vuefire";
import './styles/themes.scss';


// Make vuefire available throughout the project
Vue.use(firestorePlugin);

new Vue({
    render: h => h(App),
}).$mount('#app')
