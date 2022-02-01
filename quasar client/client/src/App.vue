<template>
  <div id="q-app">
    <div class="notify_panel">
      
    </div>
    <router-view />
  </div>
</template>
<script>
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
  name: 'App',
  data(){
    return{
      isConnected : null
    }
  },
  methods:{
    ...mapMutations('notify',['RealoadNotifyselected','NotifyEndInterval','CheckIfNotifyIsTimeout','NotifyCommingToEnd']),
    ...mapActions('notify',['GetNotifyinQueue','TimeOutNotifyDate','UpdateNotify','GetAllNotify','GetAllNotifyInProcessStore']),
     SendObject(){
       this.GetNotifyinQueue()
       .then(response =>{        
          if(response.data == ""){           
              let timeNow = new Date().getTime() - (1000 * 60 * 60 * 4);
              timeNow += 5000;
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
      },
      GetNotifyToEndFromAPI(data){
         if(data.status == "LLEGANDO A TERMINO"){
             this.NotifyCommingToEnd(false);
            this.CheckIfNotifyIsTimeout(data);
            this.GetAllNotifyInProcessStore();
            this.GetAllNotify();
            this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'Conclusion de notificacion,Audiencia en curso...'
          })        
        }
        else{
          data.status="LLEGANDO A TERMINO"
          this.UpdateNotify(data)
          .then((response) =>{
            console.log("Res",response)
            this.NotifyEndInterval(true);      
            this.CheckIfNotifyIsTimeout(data);          
            this.GetAllNotify()
            this.NotifyCommingToEnd(false)
            this.GetAllNotifyInProcessStore()
            this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'Conclusion de notificacion,Audiencia en curso...'
          })        
          })
          .catch(err =>{
            console.log(err);
          })        
        }
      }
  },
  sockets: {
   connect: function () {
     this.isConnected = true;
        console.log('socket connected')
    }, 
    checkPingFromServer(data){   
      this.SendObject();
    },
    postcreate_notify(){
      this.GetAllNotify();
    },
    finished_notification(data){
      console.log("Finalizando notificacion",data);
      this.GetAllNotify();
      this.GetAllNotifyInProcessStore()
    },
    timeout_notify(data){ 
       this.GetNotifyToEndFromAPI(data)
    }
  },
  computed:{
    ...mapState('notify',['list_notify','notify_selected','isNotifyCommingToEnd'])
  },
  mounted(){ 
  },
  destroyed(){
    console.log("DESTROY")
    this.$socket.disconnect();
  }
}
</script>
<style scoped>
.notify_panel{
  position: absolute;
  background:#00000036 ;
  width: 100%;
  height: 700px;
  z-index: 1000;
  display: none;
}
</style>
