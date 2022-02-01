<template>
  <div class="q-pa-sm">
    <div  v-if="!tagIsSelected" class="row justify-center">
      <div class="content-cards" >
         <div class="row">
          <div class="col-12">
           <q-input
              borderless
              dense
              debounce="300"
              @input="CheckEmpty($event)"
              @keypress="GetPressEnter($event)"
              v-model="filter"
              placeholder="Search"              
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
      </div>
       <div v-if="!isSearching" class="content-tosearch">
         <q-card class="my-card" bordered v-for="(images_cover, index) in list_tags" :key="index">
          <q-card-section>
            <div class="text-h6">{{ images_cover.code_document }}</div>
            <div class="text-subtitle2">{{ images_cover.crime }}</div>
          </q-card-section>
          <q-card-section class="q-pt-none text-doc">
              Proceso:
          {{images_cover.process_type}}
          </q-card-section>
          <q-card-section>
            <div class="row justify-end btn-content">
              <q-btn round color="primary" icon="fas fa-eye" size="10px">
                <q-tooltip>
          Click para ver mas datos del documento
        </q-tooltip>
        </q-btn>   
              <q-btn round color="red" icon="fas fa-edit" size="10px" @click="getCoverImage(images_cover)">
                <q-tooltip>
                  Click para obtener los datos relevantes del documento
                </q-tooltip>
              </q-btn>                
            </div>
          </q-card-section>
        </q-card>
       </div>
      <div v-if="isSearching" class="content-cards3">
      <q-infinite-scroll @load="(index,done) => initDefaultData(index,done)" :offset="60" scroll-target=".content-cards3">        
        <q-card class="my-card" bordered v-for="(images_cover, index) in list_tags" :key="index">
          <q-card-section>
            <div class="text-h6">{{ images_cover.code_document }}</div>
            <div class="text-subtitle2">{{ images_cover.crime }}</div>
          </q-card-section>
          <q-card-section class="q-pt-none text-doc">
              Proceso:
          {{images_cover.process_type}}
          </q-card-section>
          <q-card-section>
            <div class="row justify-end btn-content">
              <!-- <q-btn round color="primary" icon="fas fa-eye" size="10px">
                <q-tooltip>
          Click para ver mas datos del documento
        </q-tooltip>
        </q-btn>    -->
              <q-btn round color="red" icon="fas fa-edit" size="10px" @click="getCoverImage(images_cover)">
                <q-tooltip>
                  Click para obtener los datos relevantes del documento
                </q-tooltip>
              </q-btn>                
            </div>
          </q-card-section>
        </q-card>
         <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
      </template>
      </q-infinite-scroll>
      </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "TagsInformationToModel",
  data() {
    return {
      lorem:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi accusamus corporis magnam in soluta repudiandae.",
      tagIsSelected:false,
      tags_to_use:[],
      filter:null,
      page:0,
    };
  },
  methods: {
    ...mapMutations("tags_info", ['AddTagInDocumentText','ClearDataTags','LoadTagSelected','PassPage','IsSearching']),
    ...mapActions("tags_info", ["GetListTagsAndLoad","SearchDocumentTag"]),
    ...mapMutations("memorials_decrets",['AddTagInToDocumentText',
    'AddTagInDocumentText',
    'ChangeModelWithTag','WritingDocumentTextToJoinModel']),
    GetTagsAndLoadInTheList() {
      this.GetListTagsAndLoad();
    },      
    getCoverImage(cover_selected){
     //TODO Rellenar el texto con los tags correspondientes
     let newacussed = ""
     let newapellant = ""
     let newvictim = ""
     cover_selected.accused.forEach(element =>{
       newacussed += element
     })
     cover_selected.appellant.forEach(element =>{
       newapellant += element
     })
     cover_selected.victim.forEach(element =>{
       newvictim += element+', '
     })
     
     let text = ""+this.memorial_text_doc;
      
       text=text.replace(/REFERENCIA_TAG_NUREJ/g,cover_selected.code_document);
       text=text.replace(/REFERENCIA_TAG_DELITO/g,cover_selected.crime);
        text=text.replace(/REFERENCIA_TAG_JUZGADO_A_CARGO/g,cover_selected.relevant_court);
       text=text.replace(/REFERENCIA_TAG_TIPO_DE_PROCESO/g,cover_selected.process_type);
        text=text.replace(/REFERENCIA_TAG_ACUSADO/g,newacussed);
       text=text.replace(/REFERENCIA_TAG_QUERELLANTE/g,newapellant);
       text=text.replace(/REFERENCIA_TAG_VICTIMA/g,newvictim);
       
    this.WritingDocumentTextToJoinModel(text)
     this.LoadTagSelected(cover_selected);    
     this.ChangeModelWithTag(true);
     
    },

    ClickOnTag(tag_selected){
      //TODO funcionalidad para enviar el valor al editor de texto wisiwig
      
      this.document_writing = tag_selected.value;  
      //this.AddTagInToDocumentText(tag_selected.value);

    },
    ClickOnCancel(){
      
      //TODO funcionalidad para cerrar los tags del documento seleccionado
      this.tagIsSelected = false;
      this.ClearDataTags()
    },
    CheckEmpty(e){
 
      if(e == ''){
        this.isnotSearching = true
        
        this.page= 0; 
        this.page += 1;
        this.PassPage(this.page);          
    this.ClearDataTags();
    this.GetListTagsAndLoad()
    this.IsSearching(false)    
        
      }
    },
    GetPressEnter(e){
       if (e.keyCode === 13) {
         this.isnotSearching = false
         let querys = {     
                victim:this.filter,
                accused:this.filter,
                appellant:this.filter,
                crime:this.filter,
                code_document:this.filter,
         }  
         this.ClearDataTags();   
          this.SearchDocumentTag(querys)          
          this.IsSearching(true)  
      }  
    },
    initDefaultData(index,done){
      
      setTimeout(()=>{
          
           this.page += 1;
            this.PassPage(this.page); 
           this.GetListTagsAndLoad()

          done()
      },2000)     
      //done
      //done()
      
    },
  },
  computed: {
    ...mapState("tags_info", ["list_tags", "tag_selected",'document_text','isSearching']),
    ...mapState("memorials_decrets", ["memorial_text_doc"]),
    document_writing: {
      get: function() {
        return this.$store.state.memorials_decrets.memorial_text_doc;
      },
      set: function(newTitle) {
        this.$store.commit("memorials_decrets/AddTagInDocumentText", newTitle);
      }
    }
  },
  created() {},
  mounted() {
    this.ClearDataTags();
    this.GetListTagsAndLoad();
  }
};
</script>
<style scoped>
.my-card {
  width: 95%; 
  margin:auto;
  margin-bottom: 15px;  
  overflow: hidden;
}
.content-cards{
  width: 100%;
  margin: auto;
}
.content-cards3{
    max-height: 400px;    
    overflow: auto;
}
.text-doc {  
}
.btn-content-docs .q-btn {
  margin-right: 10px;
}
</style>
