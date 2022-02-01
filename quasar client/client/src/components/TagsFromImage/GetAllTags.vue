<template>
  <div class="q-pa-sm">
    <div v-if="!tagIsSelected" class="row justify-center">
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
      <div v-if="isSearching" class="content-tosearch">
         <q-card class="my-card" bordered v-for="(images_cover, index) in list_tags" :key="index">
          <q-card-section>
            <div class="text-h6">{{ images_cover.code_document }}</div>
            <div class="text-subtitle2">{{ images_cover.crime }}</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
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
      </div>
    
      <div v-if="!isSearching" class="content-cards1">
        <q-infinite-scroll @load="(index,done) => initDefaultData(index,done)" :offset="60" scroll-target=".content-cards1">
        <q-card class="my-card" bordered v-for="(images_cover, index) in list_tags" :key="index">
          <q-card-section>
            <div class="text-h6">{{ images_cover.code_document }}</div>
            <div class="text-subtitle2">{{ images_cover.crime }}</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
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

    <div v-if="tagIsSelected" class="row justify-center">     
      
    <q-list bordered separator>          
      <q-item v-for="(tags,index) in tags_to_use" :key="index" class="content-tags" clickable v-ripple @click="ClickOnTag(tags)">
        <div class="row" style="width:100%" v-if="tags.title != 'Querellantes' && tags.title != 'Acusados' && tags.title != 'Victimas'">
          <div class="col-12">
            <q-item-label overline>{{tags.title}}</q-item-label>
          </div>
          <div class="col-12">
            <q-item-label>{{tags.value}}</q-item-label>    
          </div>
        </div>
          <div v-if="tags.title == 'Querellantes'">
            <div class="row">
          <div class="col-12">
            <q-item-label overline>{{tags.title}}</q-item-label>
          </div>
          <div class="col-12">
            <q-item-label v-for="(quere, index) in tags.value" :key="index">*{{quere}}</q-item-label>    
          </div>
        </div>
          </div>
          <div v-if="tags.title == 'Acusados'">
            <div class="row">
          <div class="col-12">
            <q-item-label overline>{{tags.title}}</q-item-label>
          </div>
          <div class="col-12">
            <q-item-label v-for="(quere, index) in tags.value" :key="index">*{{quere}}</q-item-label>    
          </div>
        </div>
          </div>
          <div v-if="tags.title == 'Victimas'">
            <div class="row">
          <div class="col-12">
            <q-item-label overline>{{tags.title}}</q-item-label>
          </div>
          <div class="col-12">
            <q-item-label v-for="(quere, index) in tags.value" :key="index">*{{quere}}</q-item-label>    
          </div>
        </div>
          </div>
      </q-item>        
    </q-list>
        <!-- <q-chip clickable @click="ClickOnTag(tags)" color="teal" icon="far fa-bookmark" text-color="white" :label="tags.title" />            -->
      <div class="btn-content-cancel">
        <q-btn class="full-width" color="red" size="10px" label="Volver atras" @click="ClickOnCancel()">
        <q-tooltip>
          Click para ir atras y volver a elegir
        </q-tooltip>
      </q-btn>   
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
      scrollTarget:this.$refs.scrollTargetRef,
      pageaux: 0,
      filter:null
    };
  },
  methods: {
    ...mapMutations("tags_info", ['AddTagInDocumentText','ClearDataTags','LoadTagSelected','PassPage','IsSearching']),
    ...mapActions("tags_info", ["GetListTagsAndLoad","SearchDocumentTag"]),
    ...mapMutations("memorials_decrets",['AddTagInToDocumentText','AddTagInDocumentText']),
    CheckEmpty(e){   
   
      if(e == ''){
        this.isnotSearching = true     
         this.ClearDataTags()
        this.GetListTagsAndLoad()      
        .then(async response =>{
                 
                this.ReloadListMemorials(response.data.data);
                
            })
            .catch(error =>{
                console.log(error);
            });   
        this.IsSearching(false)    
        
      }
    },
    GetPressEnter(e){      
      //TODO BUSCADOR
       if (e.keyCode === 13) {
         this.isnotSearching = false
         let querys = {                
                victim:this.filter,
                accused:this.filter,
                appellant:this.filter,
                crime:this.filter,
                code_document:this.filter
         }  
         this.ClearDataTags()      
          this.SearchDocumentTag(querys)     
          this.IsSearching(true)  
      }  
    },
    GetTagsAndLoadInTheList() {
      this.GetListTagsAndLoad();
    },
    initDefaultData(index,done){  
      setTimeout(()=>{        
          this.pageaux += 1
          this.PassPage(this.pageaux);
          this.GetListTagsAndLoad();
          done()
      },2000)     
      //done
      //done()
      
    },   
    getCoverImage(cover_selected){
      this.tags_to_use = []     
      this.LoadTagSelected(cover_selected);
      let newobject = null;
      for (const key in cover_selected) {       
        if(key == 'relevant_court')
        {
          newobject={
            title:'Juzgado a cargo',
            value:cover_selected[key]           
          }
          this.tags_to_use.push(newobject)
        }

        if(key == 'code_document')
        {
          newobject={
            title:'Nurej',
            value:cover_selected[key]           
          }
          this.tags_to_use.push(newobject)
        }

        if(key == 'crime')
        {
          newobject={
            title:'Delito',
            value:cover_selected[key]
          }
          this.tags_to_use.push(newobject)
        }

        if(key == 'process_type')
        {
          newobject={
            title:'Tipo de proceso',
            value:cover_selected[key]
          }
          this.tags_to_use.push(newobject)
        }
        
        if(key == 'appellant')
        {
          newobject={
            title:'Querellantes',
            value:cover_selected[key]
          }
          this.tags_to_use.push(newobject)
        }

        if(key == 'accused')
        {
          newobject={
            title:'Acusados',
            value:cover_selected[key]
          }
          this.tags_to_use.push(newobject)
        }
        
        if(key == 'victim')
        {
          newobject={
            title:'Victimas',
            value:cover_selected[key]
          }
          this.tags_to_use.push(newobject)
        }
       
      }
       this.tagIsSelected = true;
      
      
    },
    ClickOnTag(tag_selected){      //TODO funcionalidad para enviar el valor al editor de texto wisiwig    
      this.document_writing = tag_selected.value;  
      //this.AddTagInToDocumentText(tag_selected.value);

    },
    ClickOnCancel(){   
      //TODO funcionalidad para cerrar los tags del documento seleccionado
      this.tagIsSelected = false;
      this.ClearDataTags()
    },
    CheckLocalStorage(){
      let local = window.localStorage.getItem('text_memorial');
      if(local == undefined || local == null){
        this.document_writing = "Ingrese un texto"
      }
      else{
        this.document_writing = local;
      }
    }
  },
  computed: {
    ...mapState("tags_info", ["list_tags", "tag_selected",'document_text','isSearching']),    
    document_writing: {
      get: function() {
        return this.$store.state.memorials_decrets.memorial_text_doc;
      },
      set: function(newTitle) {
        this.$store.commit("memorials_decrets/AddTagInDocumentText", newTitle);
      }
    },
     
  },
  created() {},
  mounted() {
    this.ClearDataTags();    
    this.GetListTagsAndLoad();
    //this.CheckLocalStorage();
  }
};
</script>
<style scoped>
.my-card {
  width: 95%;
  /* height: 200px; */
  margin-bottom: 15px;  
}
.content-cards1{
    max-height: 400px;    
    overflow: auto;
}
.btn-content .q-btn{
    margin-right: 10px;
}
.btn-content-cancel{
  width: 100%;
}
</style>
