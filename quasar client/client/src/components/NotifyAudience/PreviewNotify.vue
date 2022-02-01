<template>
    <div class="q-pa-md">
        <q-card style="width: 500px; max-width: 60vw;">
            <div class="q-pa-md row justify-end">
                <q-btn @click="ClosePopup"  round icon="close" color="red"></q-btn>
            </div>
            <q-card-section>
                <div class="text-h6 text-center" style="text-decoration:underline black">{{notify_viewmore.name}}</div>
            </q-card-section>
            <q-card-section>
                <div class="q-pa-md row justify-between">
                    <div>Fecha de creacion</div>
                    <div>{{notify_viewmore.date_init}}</div>
                </div>
                <div class="q-pa-md row justify-between">
                    <div>Fecha de finalizacion</div>
                    <div>{{notify_viewmore.date_end}}</div>
                </div>
                <div class="q-pa-md row justify-between">
                    <div>Descripcion</div>
                    <div>{{notify_viewmore.description || 'No existe descripcion'}}</div>
                </div>
                <div class="q-pa-md row justify-between">
                    <div>Estado</div>
                    <div> 
                        <q-chip v-if="notify_viewmore.status == 'EN PROCESO'" color="green" text-color="white" icon="far fa-bell">
                            {{notify_viewmore.status}}
                        </q-chip>
                        <q-chip v-if="notify_viewmore.status == 'LLEGANDO A TERMINO'" color="blue" text-color="white" icon="far fa-bell">
                            {{notify_viewmore.status}}
                        </q-chip>
                        <q-chip v-if="notify_viewmore.status == 'TERMINADO'" color="red" text-color="white" icon="far fa-bell">
                            {{notify_viewmore.status}}
                        </q-chip>
                    </div>
                </div>               
                <q-btn v-if="notify_viewmore.status != 'TERMINADO'" @click="CloseAudience" color="black" class="full-width" label="CONCLUIR AUDIENCIA" />
            </q-card-section>
        </q-card>
    </div>
</template>
<script>
import {mapState,mapActions,mapMutations} from 'vuex'
export default {
    name:'PreviewNotify',
    data(){
        return{

        }
    },
    methods:{
        ...mapMutations('notify',['OpenOrCloseNotify','RealoadNotifyselected','NotifyCommingToEnd']),
        ...mapActions('notify',['UpdateNotify','GetAllNotify','GetAllNotifyInProcessStore','GetNotifyinQueue']),
        ClosePopup(){
            this.OpenOrCloseNotify(false);
            this.RealoadNotifyselected({});
        },
        CloseAudience(){
            this.getStatus = "TERMINADO";
            this.UpdateNotify(this.notify_viewmore)
            .then(response =>{
              
                this.SendObject();
                this.GetAllNotify();
                this.GetAllNotifyInProcessStore();
            })
            .catch(err =>{
                console.log(err);
            })
        },
         SendObject(){
       this.GetNotifyinQueue()
       .then(response =>{
          if(response.data == ""){
              let timeNow = new Date().getTime() - (1000 * 60 * 60 * 4);
              timeNow += 5000;
              this.RealoadNotifyselected({date_end:new Date(timeNow), id: null})
              this.$socket.emit('recieve_date',this.notify_viewmore)
              this.NotifyCommingToEnd(true)
            }
            else{
               this.RealoadNotifyselected(response.data);
                this.$socket.emit('recieve_date',this.notify_viewmore)
                this.NotifyCommingToEnd(true)
            }
                      
            })
        .catch(err =>{
                console.log(err);
            })
      }

    },
    computed:{
        ...mapState('notify',['notify_viewmore']),
        getStatus:{
             get: function() {
            return this.$store.state.notify.notify_viewmore.status;
            },
            set: function (newTitle) {
                this.$store.commit("notify/getStatusNotify", newTitle);
            }
        }
        
    },
    mounted(){

    },
    created(){

    }
}
</script>