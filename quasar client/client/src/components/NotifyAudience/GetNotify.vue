<template>
    <div class="q-pa-md">
         <q-table
        title="Lista de notificaciones"      
        :columns="columns"
        :data="list_notify"        
        :filter="filter"      
         table-header-class="bg-dark text-white"
    >
        <template v-slot:top-right>        
            <q-input borderless dense debounce="300" v-model="filter" placeholder="Buscar">
            <template v-slot:append>
                <q-icon name="search" />
            </template>
            </q-input>
            <div class="q-pl-md">
                <q-btn round color="positive" icon="add" @click="GotoCreate"></q-btn>
            </div>        
        </template>        
        <template v-slot:body-cell-status="props">
             <q-td :props="props">
                <q-badge v-if="props.value == 'EN PROCESO'" color="green" :label="props.value" />
                <q-badge v-if="props.value == 'LLEGANDO A TERMINO'" color="red" :label="props.value" />
                <q-badge v-if="props.value == 'TERMINADO'" color="black" :label="props.value" />
            </q-td>     
        </template>    
        <template v-slot:body-cell-options="props">
        <div class="row">
          <q-btn
            dense
            round
            flat
            color="grey"
            @click="ViewMore(props.row)"
            icon="fas fa-eye"
          ></q-btn>
          <q-btn
            dense
            round
            flat
            color="grey"
            @click="EditRow(props.row)"
            icon="edit"
          ></q-btn>
          <q-btn
            dense
            round
            flat
            color="grey"
            @click="GetRowToDelete(props.row)"
            icon="delete"
          ></q-btn>
           <q-btn
           v-if="props.row.status != 'TERMINADO'"
            dense
            round
            flat
            color="grey"
            @click="CloseNotifyinQueue(props.row)"
            icon="fas fa-check"
          ></q-btn>
        </div>
      </template>
    </q-table>
        <q-dialog v-model="notify_preview" persistent>
            <PreviewNotify/>
        </q-dialog>

        <q-dialog v-model="notify_delete" persistent>
            <DeleteNotify/>
        </q-dialog>
    </div>   
</template>
<script>
import {mapState,mapActions,mapMutations} from 'vuex'
import PreviewNotify from './PreviewNotify.vue'
import DeleteNotify from './DeleteNotify.vue'
export default {
    name:'GetallNotifies',
    components:{PreviewNotify,DeleteNotify},
    data(){
        return{
             filter:'',
             
            columns:[                
                {
                    name: 'name',                    
                    label: 'Nombre',
                    align: 'left',
                    field: row => row.name,
                    format: val => `${val}`,
                    sortable: true,
                    style: `font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size:13px;`,   
                },
                // { name: 'description', label: 'Descripcion', field: 'description' },
                { name: 'date_end', label: 'Fecha de termino', sortable: true, field: 'date_end', align: 'left',format: val => `${new Date(val)}`, },
                // { name: 'date_init', label: 'Fecha final', field: 'date_init', align: 'left', format: val => `${new Date(val)}`,},                
                { name: 'status', label: 'Estado', field: 'status', align: 'left', sortable: true,
                    style: `font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size:11px;`,   
                },
                { name: 'options', label: 'Opciones', field: 'options', align: 'left', headerStyle: 'width: 150px',sortable: true,},
 
            ],
        }
    },
    methods:{
        ...mapMutations('notify',['RealoadNotifyselected','OpenOrCloseNotify','DeleteNotify','NotifyCommingToEnd','CloseNotifySelectedOnApi']),
        ...mapActions('notify',['DeleteNotifySelected','GetAllNotify','TimeOutNotifyDate','UpdateNotify','GetNotifyinQueue','GetAllNotifyInProcessStore','ViewMoreNotifySelected']),
        ViewMore(row_selected){
            this.ViewMoreNotifySelected(row_selected);
            this.OpenOrCloseNotify(true);
        },
        EditRow(row_selected){
            this.ViewMoreNotifySelected(row_selected);
            this.$router.push({
                name:'NotifyUpdate'
            })
        },
        GetRowToDelete(row_selected){
            console.log("DELETE",row_selected)
            this.DeleteNotify(true); 
            this.ViewMoreNotifySelected(row_selected);  
        },
        GotoCreate(){
            this.$router.push({
                name:'NotifyCreate'
            })
        },       
        CloseNotify(){
            this.TimeOutNotifyDate(data)
            .then(response =>{               
                    })
            .catch(err =>{
                        console.log(err);
                    })
        },
        CloseNotifyinQueue(notify){  
            this.CloseNotifySelectedOnApi(notify);                
            this.UpdateNotify(this.notify_selected)
            .then(response =>{
                this.GetAllNotify().then((response) =>{
                     this.SendObject();
                     this.GetAllNotifyInProcessStore().then((response) =>{
                         this.$socket.emit('closing_notification');
                     })
                })                  
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
              this.RealoadNotifyselected({date_end:new Date(timeNow), id: null})
              this.$socket.emit('recieve_date',this.notify_selected)
              this.NotifyCommingToEnd(true)
            }
            else{
               this.RealoadNotifyselected(response.data);
                this.$socket.emit('recieve_date',this.notify_selected)
                this.NotifyCommingToEnd(true)
            }
                      
            })
        .catch(err =>{
                console.log(err);
            })
      }
    },
    computed:{
        ...mapState('notify',['list_notify','notify_preview','notify_delete','notify_selected']),
         data_selected:{       
            get: function() {
            return this.$store.state.notify.notify_selected;
            },
            set: function (newData) {
                this.$store.commit("notify/RealoadNotifyselected", newData);
            }
        },
    },
    mounted(){
        this.GetAllNotify();
    },
    created(){}
}
</script>
<style scoped>
.my-special-class{
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>