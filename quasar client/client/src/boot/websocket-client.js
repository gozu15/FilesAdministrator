// import axios from 'axios'
// export default async ({ Vue }) => {
//   Vue.prototype.$axios = axios
// }
import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'
//const URL_SERVER ='http://localhost:3000/'// 
const URL_SERVER ='https://quasar-socket-server.herokuapp.com'
Vue.use(new VueSocketIO({
  debug: true,  
  connection: SocketIO(URL_SERVER), //"https://quasar-socket-server.herokuapp.com",  
  extraHeaders: {
    'Access-Control-Allow-Credentials':true
    },
  allowEIO3:true
}))
