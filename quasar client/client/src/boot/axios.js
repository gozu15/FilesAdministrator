import Vue from 'vue'
import axios from 'axios'

const urlProd = 'http://localhost:3000/api/'
 const AxiosOptions = axios.create({
    baseURL: urlProd,
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': ''
    },
    credentials: true
})

Vue.prototype.$axios =AxiosOptions
