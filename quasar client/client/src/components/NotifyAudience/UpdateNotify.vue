<template>
    <div class="q-pa-md">
         <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="getNameNoti"
        label="Ingrese nombre *"
        hint="Ingrese un nombre respectivo"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
       <q-input
        filled
        v-model="getDescriptionNoti"
        label="Ingrese una descripcion"
        hint="descripcion para la notificacion"       
      />
      <div class="q-gutter-md row items-start">
      <q-date v-model="model" mask="YYYY-MM-DD HH:mm" color="blue" />
      <q-time v-model="model" mask="YYYY-MM-DD HH:mm" color="blue" />
    </div>

      
      <div>
        <q-btn label="Guardar" type="submit" color="primary"/>
        <q-btn label="Cancelar" type="reset" color="red" flat class="q-ml-sm" />
      </div>
    </q-form>
    </div>
</template>
<script>
import {mapState,mapActions,mapMutations} from 'vuex'
 let year = new Date().getUTCFullYear()
let month = new Date().getUTCMonth()+1
  month = month < 10 ? "0"+month : month ;
let day = new Date().getUTCDate()               
let hour = new Date().getHours()
hour = hour >= 10 ? hour : "0" + hour;
let min = new Date().getMinutes()
min = min >= 10 ? min : "0" + min;
let newDateFull = year+"-"+month+"-"+day+" "+hour+":"+min   
const getTimeNow = newDateFull     
export default {
    data(){
        return{
            notify_properties:{
                name:null,
                description:null,
                date_end:null,
                date_init:null,
                lapso:null,
            },
            model: getTimeNow
        }
    },
    methods:{
        ...mapMutations('nofity',['getNameNotify']),
        ...mapActions('notify',['CreateNotify','UpdateNotify','getStatus','getnewDateEnd']),
        onSubmit(){   
            //this.CreateNotify(this.notify_properties)
            this.getStatus("EN PROCESO");
            this.getnewDateEnd(this.model)
            
  
            
            this.UpdateNotify(this.notify_viewmore)
             .then(response =>{
                this.$socket.emit('recieve_date',this.notify_viewmore);
                this.onReset();
            })
            .catch(err =>{
                console.log(err)
                 this.onReset();
            })
            
        },
        onReset(){
          this.$router.replace({
            name:'NotifyGetAll'
          })
        },
    },  
    computed:{
        ...mapState('notify',['notify_viewmore']),
        getDate(){

        },
        getNameNoti:{       
            get: function() {
            return this.$store.state.notify.notify_viewmore.name;
            },
            set: function (newTitle) {
                this.$store.commit("notify/getNameNotify", newTitle);
            }
        },
         getDescriptionNoti:{       
            get: function() {
            return this.$store.state.notify.notify_viewmore.description;
            },
            set: function (newTitle) {
                this.$store.commit("notify/getDescriptionNotify", newTitle);
            }
        },
         getIntervalo:{       
            get: function() {
            return this.$store.state.notify.notify_viewmore.lapso;
            },
            set: function (newTitle) {
                this.$store.commit("notify/getLapsoNotify", newTitle);
            }
        },       
    }
}
</script>