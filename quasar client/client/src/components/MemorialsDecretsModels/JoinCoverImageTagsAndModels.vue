<template>
  <div class="q-pa-md">
    <q-page-container>    
        
          <div class="content-tabs" id="content-tabs">
            <div class="row">
              <div class="col-4">
              <q-tabs
                v-model="tab"
                align="justify"
                narrow-indicator
                class="q-mb-sm"
              >
                <q-tab class="text-purple" name="causas" label="Causas" />                
              </q-tabs>
              <div class="q-gutter-y-sm box-tag">
                <q-tab-panels
                  v-model="tab"
                  animated
                  transition-prev="scale"
                  transition-next="scale"
                  class="text-center"
                >
                  <q-tab-panel name="causas">
                    <div class="text-h6">Causas</div>
                    <TagsToJoinModel />
                  </q-tab-panel>                  
                </q-tab-panels>
              </div>
            </div>
            <div class="col-8">
               <div v-if="isReloadingModelWithTags == true" >
                  <EditorModelBuilding/>
                </div>
                <div v-if="isReloadingModelWithTags == false" style="height:100%;">
                  <div class="box-loading">                     
                       <div>
                        <p>CARGANDO DATOS...<q-spinner-gears color="cyan" style="font-size: 2em"/></p> 
                        <p>Escoja el documento que desea utilizar en el modelo.</p> 
                       </div> 
                  </div>             
                  
                </div>
            </div>               
            </div>
            
        
          </div>   
       
        <q-page-sticky position="bottom-right" :offset="[18, 130]">
          <q-btn
            round
            size="18px"
            color="primary"
            icon="save"
            direction="left"
            @click="VerifyDocument()"
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
            @click="GobackInit()"
          >
          </q-btn>
        </q-page-sticky>       
      
    </q-page-container>
      <q-dialog v-model="save_change">
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h5">Guardar cambios</div>
        </q-card-section>
            <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="memorial_object.name"
        label="Ingrese nombre del documento *"
        hint="Name and surname"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

       <q-select outlined v-model="memorial_object.type_document" :options="options" label="Selecciona tipo de documento"
       />      
      <q-input
        filled        
        v-model="memorial_object.description"
        label="Una descripcion "              
      />     

      <div>
        <q-btn label="Guardar" type="submit" color="primary"/>
        <q-btn label="Cancelar" type="reset" color="red" flat class="q-ml-sm" v-close-popup/>
      </div>
    </q-form>
        </q-card>      
     
    </q-dialog>
  </div>
</template>
<script>
import EditorModelBuilding from "./EditorModelBuilding.vue"
import TagsToJoinModel from "../../components/TagsFromImage/GetAllTagsToJoinModel";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
components:{TagsToJoinModel,EditorModelBuilding},
  name: "JoinTagsAndModels",
  data() {
    return {
      memorial_object: {
        name: null,        
        type_document: null,
        description: null,
        documents_text: " "
      },
      options:[  
        {label:'Decreto',value:'Decreto'},
        {label:'Memorial',value:'Memorial'},
        {label:'Acusaciones',value:'Acusations'},
        {label:'Autos de inicio',value:'Autos'},
        {label:'Resoluciones',value:'Resolutions'},
        {label:'Sentencias',value:'Sentence'}        
      ],
      tab: "causas",
      save_change:false
    };
  },
  methods: {
    ...mapMutations("tags_info",["IsSearching","ClearDataTags"]),
    ...mapMutations("memorials_decrets", [
      "ReloadListMemorials",
      "ReloadMemorialProperties",
      "ChangeNextPage",
      "ClearData",
      "AddTagInToDocumentText"
    ]),
    ...mapActions("memorials_decrets", ["CreateMemorialNewDocument"]),
    
    
      VerifyDocument() {            
      this.save_change=true;
    },    
    onSubmit(){
      let typevalue= this.memorial_object.type_document.value;      
      this.memorial_object.documents_text=this.memorial_model_to_join
      this.memorial_object.type_document = typevalue;
      
      this.CreateMemorialNewDocument(this.memorial_object)
      .then(response =>{
          this.onReset()
      })
      .catch(err =>{
        console.error(err)
      })
        
     
    }, 
    onReset() {
      this.GobackInit()
    },
     GobackInit(){      
       this.ClearDataTags();
       this.ClearData();
        this.GoToMemorialsTable();
    },
    GoToMemorialsTable(){
      this.$router.replace({
        name:'CreateMemorialsDocuments'
      })
    },
  },
  computed: {
    ...mapState("memorials_decrets", [
      "memorials_list",
      "memorial_properties",
      "memorial_text_doc",
      "isReloadingModelWithTags",
      "memorial_model_to_join"
    ]),
    ...mapState("tags_info", ["tag_selected"]),
    document_writing: {
      get: function() {
        return this.$store.state.memorials_decrets.memorial_text_doc;
      },
      set: function(newTitle) {
        this.$store.commit("memorials_decrets/WritingDocumentText", newTitle);
      }
    }
  },
  created() {},
  mounted() {
      //this.Open();
  }
};
</script>
<style scoped>
.q-page-container {
  padding: 0 !important;
}
.content-editor {
  width: 100%;
}
.content-tabs {
  display: block;
}
.my-card {
  width: 400px;
  padding: 25px;
}
.box-loading{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
.box-tag{
  height: 400px;
  overflow: auto;

}
</style>
