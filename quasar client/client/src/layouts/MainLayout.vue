<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="header-main" elevated>
      <!-- <q-toolbar style="background-color:green;"> -->
      <div class="q-pa-sm" style="width:100%;">
        <div class="row justify-between">
          <div>
            <q-btn
              flat
              dense
              round
              icon="menu"
              size="15px"
              aria-label="Menu"
              @click="leftDrawerOpen = !leftDrawerOpen"
            />
          </div>
          <div class="">
            <div class="tittle">
              <p>SECRETARIO DE JUZGADO</p>
            </div>
          </div>
          <div>
            <div class="row justify-end">
              <q-btn flat color="white" round icon="notifications" size="12px">
                <q-badge floating color="red" rounded :label="list_only_inprocess.length || countaux"/>
                <q-menu
                  transition-show="flip-right"
                  transition-hide="flip-left"
                >
                  <q-list  bordered separator style="min-width: 400px">
                    
                      <div v-if="list_only_inprocess.length == 0" >
                        <q-item>
                            <q-item-section class="">
                        <q-item-label>No existen notificaciones</q-item-label>
                        <q-item-label caption>Notificaciones en espera...</q-item-label>
                      </q-item-section>
                        </q-item>
                         
                      </div>
                      <div v-if="list_only_inprocess.length != 0">
                        <q-item clickable v-ripple v-for="(notify,index) in list_only_inprocess" :key="index">
                        <q-item-section avatar>
                                  <q-icon color="red" name="notifications" />
                                </q-item-section>                     
                                <q-item-section v-if="notify.isInTimeout == true" class="notifyinProcess">
                                <q-item-label>                                 
                                      {{notify.name}}                                  
                                </q-item-label>
                                <q-item-label caption>{{notify.date_end}}</q-item-label>
                                
                              </q-item-section>
                              <q-item-section v-if="notify.isInTimeout == false">
                                <q-item-label>{{notify.name}}</q-item-label>
                                <q-item-label caption>{{notify.date_end}}</q-item-label>
                              </q-item-section> 
                               <q-item-section avatar>
                                  <q-btn size="10px" round icon="fas fa-check" @click="CloseNotify(notify)"></q-btn>
                                </q-item-section>                                   
                              </q-item>
                      </div>        
                  </q-list>
                </q-menu>
              </q-btn>
            </div>
          </div>
        </div>
      </div>
    </q-header>

    <q-drawer
      class="drawer-main" 
      v-model="leftDrawerOpen"      
      show-if-above
      bordered
             
    >
    <div class="shadow-menu">
      <q-list>
        <q-item-label header class="text-center tittle-qdrawer">
          ADMINISTRADOR
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </div>
      
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import {mapState,mapActions, mapMutations} from 'vuex'
import EssentialLink from "components/EssentialLink.vue";

const linksData = [
  {
    type: "text",
    title: "Inicio",
    caption: "forum.quasar.dev",
    icon: "fas fa-home",
    link: "https://forum.quasar.dev",
    pathLink: "inicio",
    checkactive:"home"
  },
  {
    type: "text",
    title: "Leer textos en imagen",
    caption: "forum.quasar.dev",
    icon: "far fa-images",
    link: "https://forum.quasar.dev",
    pathLink: "upload-image",
    checkactive:"images"
  },
  {
    type: "array",
    new_array: [
      {
        title: "Memoriales",
        caption: "chat.quasar.dev",
        icon: "far fa-file-word",
        link: "https://chat.quasar.dev",
        pathLink: "memorials_documents"
      },
      {
        title: "Decretos",
        caption: "chat.quasar.dev",
        icon: "far fa-file-word",
        link: "https://chat.quasar.dev",
        pathLink: "decrets_documents"
      },
      {
        title: "Acusaciones",
        caption: "chat.quasar.dev",
        icon: "far fa-file-word",
        link: "https://chat.quasar.dev",
        pathLink: "acusations_documents"
      },
      {
        title: "Autos",
        caption: "chat.quasar.dev",
        icon: "far fa-file-word",
        link: "https://chat.quasar.dev",
        pathLink: "autos_documents"
      },
      {
        title: "Resoluciones",
        caption: "chat.quasar.dev",
        icon: "far fa-file-word",
        link: "https://chat.quasar.dev",
        pathLink: "resolutions_documents"
      },
      {
        title: "Sentencias",
        caption: "chat.quasar.dev",
        icon: "far fa-file-word",
        link: "https://chat.quasar.dev",
        pathLink: "sentence_documents"
      }
    ],
    title: "Documentos",
    caption: "chat.quasar.dev",
    icon: "far fa-file-alt",
    link: "https://chat.quasar.dev",
    pathLink: "none",
    checkactive:"documents"
  },

  {
    type: "text",
    title: "Libreria de leyes",
    caption: "chat.quasar.dev",
    icon: "fas fa-book",
    link: "https://chat.quasar.dev",
    pathLink: "library_laws_init",
    checkactive:"library"
  },
  {
    type: "text",
    title: "Notificaciones de Audiencias",
    caption: "quasar.dev",
    icon: "far fa-bell",
    link: "https://quasar.dev",
    pathLink: "notify_audience",
    checkactive:"notifications"
  },
  {
    type: "text",
    title: "Libros diarios",
    caption: "github.com/quasarframework",
    icon: "fas fa-book-open",
    link: "https://quasar.dev",
    pathLink: "books_diary",
    checkactive:"diarybooks"
  },

  // {
  //   title: "Logout",
  //   caption: "@quasarframework",
  //   icon: "rss_feed",
  //   link: "https://twitter.quasar.dev",
  //   pathLink: "login",
  // },
];

export default {
  name: "MainLayout",
  components: { EssentialLink },
  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData,
      countaux:0,
      link:'home'
    };
  },
  methods:{
    ...mapMutations('notify',['NotifyCommingToEnd','RealoadNotifyselected']),
    ...mapActions('notify',['GetNotifyinQueue','UpdateNotify','GetAllNotifyInProcessStore','GetAllNotify']),
    CloseNotify(props_selected){
      let notify_selected = props_selected
      console.log(notify_selected);
       notify_selected.status = "TERMINADO";
            this.UpdateNotify(notify_selected)
            .then(response =>{
                
                //this.NotifyCommingToEnd(true);
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
  computed:{
    ...mapState('notify',['list_only_inprocess','notify_selected']),
    
  },
  mounted(){
    this.GetAllNotifyInProcessStore();
  }
};
</script>
<style>
.notifyinProcess{
  background-color: rgba(117, 11, 11, 0.555);  
}
.q-drawer{
  /* background-color: rgb(0, 15, 0) !important; */
  color: rgb(209, 209, 209);
  background-image: url('../../public/image/poder-Judicial-1.jpg');
  background-size: cover !important;
  background-position-x: -200px;
  

}
.q-header{
  background-color: rgb(0, 121, 0) !important;
  font-family: serif;
}
.shadow-menu{
  background-color: rgba(0, 26, 0, 0.685) !important;  
  display: flex;
  height: 140vh;
  background-size: cover !important;  
}
.tittle-qdrawer{
  font-family: serif;
  color: white;
  font-size: 20px;
  font-weight: bold;
  margin-top: 23px;
  margin-bottom: 23px;
  
}
::-webkit-scrollbar{
  display: none;
}
.tittle{
  font-size: 20px;
}
.my-menu-link{

}
</style>
