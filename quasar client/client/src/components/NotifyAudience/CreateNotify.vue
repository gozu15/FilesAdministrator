<template>
    <div class="q-pa-md">
         <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="notify_properties.name"
        label="Ingrese nombre *"
        hint="Ingrese un nombre respectivo"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
       <q-input
        filled
        v-model="notify_properties.description"
        label="Ingrese una descripcion"
        hint="descripcion para la notificacion"       
      />
      <div class="q-gutter-md row items-start">
      <q-date v-model="model" mask="YYYY-MM-DD HH:mm" color="purple" />
      <q-time v-model="model" mask="YYYY-MM-DD HH:mm" color="purple" />
    </div>

      <!-- <q-input
        filled
        type="number"
        v-model="notify_properties.lapso"
        label="Ingrese cantidad de minutos antes de mandar notificacion *"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Ingrese un numero valido',
          val => val > 0 && val < 60 || 'Ingrese un numero valido'
        ]"
      />      -->
      <div>
        <!-- <q-btn label="Guardar" type="submit" color="primary"/>
        <q-btn label="Cancelar" type="reset" color="red" flat class="q-ml-sm" /> -->
          <q-page-sticky position="bottom-right" :offset="[18, 130]">
          <q-btn
            round
            size="18px"
            color="primary"
            icon="save"
            direction="left"
            type="submit"
          >
          </q-btn>
        </q-page-sticky>
        <q-page-sticky position="bottom-right" :offset="[18, 70]">
          <q-btn
            round
            size="18px"
            color="red"
            icon="fas fa-times-circle"
            direction="left"
            type="reset"
          >
          </q-btn>
        </q-page-sticky>
      </div>
    </q-form>
    </div>
</template>
<script>
import {mapState,mapActions,mapMutations} from 'vuex'
let year = new Date().getFullYear()
let month = new Date().getMonth() +1
month = (month < 10 ? "0"+month : month)
let date = new Date().getDate() 
date = (date < 10 ? "0"+date : date)
let hours = new Date().toLocaleTimeString()
let newDate = year + "-" +month+"-"+date+" "+ hours
console.log("TIME",newDate);
export default {
    data(){
        return{
            notify_properties:{
                name:null,
                description:null,
                date_end:null,
                date_init:null,                
            },
            model: newDate
        }
    },
    methods:{
      ...mapMutations('notify',['RealoadNotifyselected','NotifyCommingToEnd']),
        ...mapActions('notify',['CreateNotify','GetNotifyinQueue']),
        onSubmit(){            
            this.notify_properties.date_init = new Date();
            this.notify_properties.date_end = new Date(this.model);
            this.CreateNotify(this.notify_properties)
            .then(response =>{
            
                 this.SendObject()
                 this.onReset()
                 this.$socket.emit('created-notify',{message:"Created"})
            })
            .catch(err =>{
                console.error(err)
            })           
        },
        onReset(){
          this.$router.replace({
            name:'NotifyGetAll'
          })
        },
         SendObject(){
       this.GetNotifyinQueue()
       .then(response =>{
          if(response.data == ""){
              let timeNow = new Date().getTime() - (1000 * 60 * 60 * 4);
              timeNow += 5000;
              this.RealoadNotifyselected({date_end:new Date(timeNow), id: null})
              this.$socket.emit('recieve_date',this.notify_selected)
              this.NotifyCommingToEnd(true);
            }
            else{
               this.RealoadNotifyselected(response.data);
                this.$socket.emit('recieve_date',this.notify_selected)
                this.NotifyCommingToEnd(true);
            }
                   
            })
        .catch(err =>{
                console.log(err);
            })
      }
    },  
    computed:{

    }
}
</script>