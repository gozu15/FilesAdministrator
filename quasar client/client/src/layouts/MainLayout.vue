<template>
  <q-layout view="hHh Lpr lff">
    <q-header class="header-main" elevated>
      <!-- <q-toolbar style="background-color:green;"> -->
      <div class="q-pa-sm" style="width:100%;">
        <div class="row">
          <div class="col-6">
            <div class="row">
              <div class="col-2">
                  <q-btn
              flat
              dense
              round
              icon="menu"
              size="15px"
              aria-label="Menu"
              color="positive"
              @click="leftDrawerOpen = !leftDrawerOpen"
            />
              </div>
              <div class="col-10">               
              <div class="tittle">
                <p> JUZGADO DE INSTRUCCION PENAL 3RO, QUILLACOLLO </p>
              </div>           
              </div>

            </div>
          
            
          </div>
          
          <div class="col-6">
            <div class="row justify-end">
              <q-btn flat color="positive" round icon="notifications" size="12px">
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
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      mini-to-overlay
             
    >
    <div class="box-drawer" >
      <q-list>
        <!-- <q-item-label header class="text-center tittle-qdrawer">
          <p>JUZGADO DE INSTRUCCION PENAL 3ERO, QUILLACOLLO</p> 
        </q-item-label> -->
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
        pathLink: "memorials_documents",
        checkactivemodel:"memorialdoc"
      },
      {
        title: "Decretos",
        caption: "chat.quasar.dev",
        icon: "far fa-file-word",
        link: "https://chat.quasar.dev",
        pathLink: "decrets_documents",
        checkactivemodel:"decretdoc"
      },
      {
        title: "Acusaciones",
        caption: "chat.quasar.dev",
        icon: "far fa-file-word",
        link: "https://chat.quasar.dev",
        pathLink: "acusations_documents",
        checkactivemodel:"acusationdoc"
      },
      {
        title: "Autos",
        caption: "chat.quasar.dev",
        icon: "far fa-file-word",
        link: "https://chat.quasar.dev",
        pathLink: "autos_documents",
        checkactivemodel:"autodoc"
      },
      {
        title: "Resoluciones",
        caption: "chat.quasar.dev",
        icon: "far fa-file-word",
        link: "https://chat.quasar.dev",
        pathLink: "resolutions_documents",
        checkactivemodel:"resolutiondoc"
      },
      {
        title: "Sentencias",
        caption: "chat.quasar.dev",
        icon: "far fa-file-word",
        link: "https://chat.quasar.dev",
        pathLink: "sentence_documents",
        checkactivemodel:"sentencedoc"
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
    title: "Documentos modelos",
    caption: "chat.quasar.dev",
    icon: "far fa-file-alt",
    link: "https://chat.quasar.dev",
    pathLink: "memorials_models",
    checkactive:"models"
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
      miniState:true,
      countaux:0,
      link:'home'
    };
  },
  methods:{
    ...mapMutations('notify',['NotifyCommingToEnd','RealoadNotifyselected','CloseNotifySelectedOnApi']),
    ...mapActions('notify',['GetNotifyinQueue','UpdateNotify','GetAllNotifyInProcessStore','GetAllNotify']),
    CloseNotify(props_selected){
      this.CloseNotifySelectedOnApi(props_selected);
            this.UpdateNotify(this.notify_selected)
            .then(response =>{
                
                //this.NotifyCommingToEnd(true);
                this.SendObject();
                this.GetAllNotify();
                this.GetAllNotifyInProcessStore();
                this.$socket.emit('closing_notification');
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
<style lang="sass">
@import '../css/quasar.variables.scss'
.notifyinProcess
  background-color: rgba(117, 11, 11, 0.555)  

.q-drawer  
  color: rgb(209, 209, 209)
  background-image: url('../../public/image/poder-Judicial-1.jpg')
  background-size: cover !important
  background-position-x: -200px    
  font-family: Source Sans Pro, Avenir, Helvetica, Arial, sans-serif  

.q-header
  background-color: $dark !important
  font-family: Source Sans Pro, Avenir, Helvetica, Arial, sans-serif

.box-drawer
 background-color: rgba($dark, 0.946) !important
 height: 100% 

.tittle-qdrawer 
  font-family: Source Sans Pro, Avenir, Helvetica, Arial, sans-serif
  color: $positive
  font-size: 15px
  font-weight: bold 
  margin-bottom: 23px 


.tittle
  font-family: Source Sans Pro, Avenir, Helvetica, Arial, sans-serif
  color: $positive
  font-weight: bold 
  font-size: 20px

.q-page
  min-height: auto

</style>
