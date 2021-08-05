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
      <q-date v-model="getDatefull" mask="YYYY-MM-DD HH:mm" color="blue" />
      <q-time v-model="getDatefull" mask="YYYY-MM-DD HH:mm" color="blue" />
    </div>

      <q-input
        filled
        type="number"
        v-model="getIntervalo"
        label="Ingrese cantidad de minutos antes de mandar notificacion *"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Ingrese un numero valido',
          val => val > 0 && val < 60 || 'Ingrese un numero valido'
        ]"
      />     
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
                lapso:null,
            },
            model: '2021-02-22 21:02'
        }
    },
    methods:{
        ...mapMutations('nofity',['getNameNotify']),
        ...mapActions('notify',['CreateNotify','UpdateNotify']),
        onSubmit(){   
            //this.CreateNotify(this.notify_properties)
            this.UpdateNotify(this.notify_selected)
             .then(response =>{
                console.log(response)
                this.onReset();
            })
            .catch(err =>{
                console.log(err)
                 this.onReset();
            })
            console.log(this.notify_selected);
        },
        onReset(){
          this.$router.replace({
            name:'NotifyGetAll'
          })
        },
    },  
    computed:{
        ...mapState('notify',['notify_selected']),
        getDate(){

        },
        getNameNoti:{       
            get: function() {
            return this.$store.state.notify.notify_selected.name;
            },
            set: function (newTitle) {
                this.$store.commit("notify/getNameNotify", newTitle);
            }
        },
         getDescriptionNoti:{       
            get: function() {
            return this.$store.state.notify.notify_selected.description;
            },
            set: function (newTitle) {
                this.$store.commit("notify/getDescriptionNotify", newTitle);
            }
        },
         getIntervalo:{       
            get: function() {
            return this.$store.state.notify.notify_selected.lapso;
            },
            set: function (newTitle) {
                this.$store.commit("notify/getLapsoNotify", newTitle);
            }
        },
         getDatefull:{       
            get: function() {
                let year = new Date(this.notify_selected.date_end).getUTCFullYear()
                let month = new Date(this.notify_selected.date_end).getUTCMonth()+1
                 month = month < 10 ? "0"+month : month ;
                console.log(month);
                let day = new Date(this.notify_selected.date_end).getUTCDate()               
                let hour = new Date(this.notify_selected.date_end).getUTCHours()
                hour = hour >= 10 ? hour : "0" + hour;
                let min = new Date(this.notify_selected.date_end).getUTCMinutes()
                min = min >= 10 ? min : "0" + min;
                let newDateFull = year+"-"+month+"-"+day+" "+hour+":"+min
                console.log(newDateFull);
            return newDateFull
            },
            set: function (newTitle) {
                this.$store.commit("notify/getDateFullNotify", newTitle);
            }
        }
    }
}
</script>