<template>
  <q-page class="flex flex-center qpagecontent">
    <div class="box-img">
      <div class="row justify-center">
        <img
      alt="Quasar logo"
      src="../../public/image/logo_tdj_cbb.png"
    >  
      </div>       
    </div>
   
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data(){
    return{
      aux:[
        { num: 1, paragraphtext: 'SISTEMA INTEGRADO DE REGISTRO JUDICIAL ' },
        { num: 2, paragraphtext: 'ESTELIONATO ' },
        { num: 3, paragraphtext: '*309102042000186* ' },
        { num: 4, paragraphtext: 'Nurej: 309102042000186 ' },
        {
          num: 5,
          paragraphtext: 'Fecha de Recepción: Hora de Recepción: Nombre del proceso: '
        },
        { num: 6, paragraphtext: '07/02/2020 ' },
        { num: 7, paragraphtext: 'Web-ld: ' },
        { num: 8, paragraphtext: '123 ' },
        { num: 9, paragraphtext: '20:42 ' },
        { num: 10, paragraphtext: 'FORMULARIO UNICO ' },
      ]
    }
  },
  methods:{
    dissconect(){
      this.$socket.emit('disconnect-from-server');
    },
    checkDate(){
      
    }
  },
  
}
</script>
<style scoped>
.box-img{
  width: 80%;
  height: 100%;
  margin: auto;
}
img{
  width: 60%; 
  height: 70vh;
  margin: auto;
}
</style>
