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
            console.log("RESPONSE",response)               
            })
        .catch(err =>{
                console.log(err);
            })
      }
  },
  sockets: {
   connect: function () {
     this.isConnected = true;
        console.log('socket connected')      
        
        },
    // customEmit: function (data) {
    //     console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
    // }, 
    dissconnect() {
      this.isConnected = false;
      console.log('socket desconnected')
    },
    checkPingFromServer(data){
      console.log("Check ping",data);
      this.SendObject();
    },
    timeout_notify(data){
      console.log(this.isNotifyCommingToEnd);
      if(this.isNotifyCommingToEnd){
        
        data.status="LLEGANDO A TERMINO"
        this.UpdateNotify(data)
        .then(response =>{
          console.log("CHECK UPDATE",response)
          if(response.data.nModified == 1){
             this.NotifyEndInterval(true);      
          this.CheckIfNotifyIsTimeout(data);          
          this.GetAllNotify()
          this.GetAllNotifyInProcessStore()
            this.NotifyCommingToEnd(false)
            //this.CheckIfNotifyIsTimeout(data)
          }
          else{
            this.NotifyCommingToEnd(false)
            this.CheckIfNotifyIsTimeout(data);
            this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'Conclusion de notificacion,Audiencia en curso...'
          })        
          }
         
        })
        .catch(err =>{
          console.log(err);
        })        
        //this.SendObject();
      }      
    }
  },
  computed:{
    ...mapState('notify',['list_notify','notify_selected','isNotifyCommingToEnd'])
  },
  mounted(){    
    // this.SendObject();
    // this.$socket.subscribe("recieve_date", function(data) {
    //     console.log("This event was fired by eg. sio.emit('kebab-case')", data)
    // })
  },
  destroyed(){
    this.$socket.emit('dissconnect');
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
