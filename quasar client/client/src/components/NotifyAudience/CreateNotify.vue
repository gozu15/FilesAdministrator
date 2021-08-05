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
        <q-btn label="Guardar" type="submit" color="primary"/>
        <q-btn label="Cancelar" type="reset" color="red" flat class="q-ml-sm" />
      </div>
    </q-form>
    </div>
</template>
<script>
import {mapState,mapActions,mapMutations} from 'vuex'
export default {
    data(){
        return{
            notify_properties:{
                name:null,
                description:null,
                date_end:null,
                date_init:null,                
            },
            model: '2021-02-22 21:02'
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
                console.log(response)
                 this.SendObject()
                 this.onReset()
            })
            .catch(err =>{
                console.log(err)
            })
           
           
            console.log(this.notify_properties);
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
            console.log("RESPONSE",response)               
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