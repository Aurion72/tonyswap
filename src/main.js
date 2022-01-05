import { createApp } from 'vue'
import './tailwind.css'
import App from './App.vue'
import { routes } from './routes.js'
import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Web3 from 'web3/dist/web3.min.js'
import store from "./store/store"
import imagesHelper from './helpers/imagesHelper.js'
import numbersHelper from './helpers/numbersHelper.js'
import datesHelper from './helpers/datesHelper.js'

const app = createApp(App)

const router = createRouter({
    history: createWebHistory(),
    routes,
})

const web3 = new Web3("https://mainnet.infura.io/v3/1c0bdcbe877d43ebbc98ad878703841c");

app.use(router)
app.use(VueAxios, axios)
app.use(store)
app.provide('Web3', web3)
app.use(imagesHelper)
app.use(numbersHelper)
app.use(datesHelper)
app.mount('#app')