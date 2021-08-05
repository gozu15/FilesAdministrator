<template>
  <div class="q-pa-sm">    
    <div v-if="tagIsSelected" class="row justify-center">     
      
        <q-list bordered separator>
      <q-item v-for="(tags,index) in listCoverProperties" :key="index" class="content-tags" clickable v-ripple @click="ClickOnTag(tags)">
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
            <q-item-label>{{tags.value}}</q-item-label>    
          </div>
        </div>
          </div>
          <div v-if="tags.title == 'Acusados'">
            <div class="row">
          <div class="col-12">
            <q-item-label overline>{{tags.title}}</q-item-label>
          </div>        
          <div class="col-12">
            <q-item-label>{{tags.value}}</q-item-label>    
          </div>
        </div>
          </div>
          <div v-if="tags.title == 'Victimas'">
            <div class="row">
          <div class="col-12">
            <q-item-label overline>{{tags.title}}</q-item-label>
          </div>          
          <div class="col-12">
            <q-item-label>{{tags.value}}</q-item-label>    
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
  name: "TagsInformation",
  data() {
    return {
      lorem:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi accusamus corporis magnam in soluta repudiandae.",
      tagIsSelected:true,
      tags_to_use:[],
      documents_image:{
           id: null,
            url_uploaded: null,
            code_document: null,
            crime: null,
            date_admission: null,
            hours_admission: null,
            appellant: null, //QUERELLANTES
            process_type: null,
            accused: null, //IMPUTADO
            relevant_court: null,
            victim: null, //VICTIMAS
      }
    };
  },
  methods: {
    ...mapMutations("tags_info", ['AddTagInDocumentText','ClearDataTags','LoadTagSelected']),
    ...mapActions("tags_info", ["GetListTagsAndLoad"]),
    ...mapMutations("memorials_decrets",['AddTagInToDocumentText','AddTagInDocumentText']),
    GetTagsAndLoadInTheList() {
      this.GetListTagsAndLoad();
    },
    getCoverImage(){  
        let info = {title:null,value:null}
        for (const key in this.documents_image) {
            if(key == 'code_document'){
                info ={
                    title:'Codigo NUREJ',
                    value:'REFERENCIA_TAG_NUREJ'
                }
                this.tags_to_use.push(info)
            }
            if(key == 'crime'){
                info ={
                    title:'Delito',
                    value:'REFERENCIA_TAG_DELITO'
                }
                this.tags_to_use.push(info)
            }
            if(key == 'relevant_court'){
                info ={
                    title:'Juzgado a Cargo',
                    value:'REFERENCIA_TAG_JUZGADO_A_CARGO'
                }
                this.tags_to_use.push(info)
            }
            if(key == 'process_type'){
                info ={
                    title:'Tipo de Proceso',
                    value:'REFERENCIA_TAG_TIPO_DE_PROCESO'
                }
                this.tags_to_use.push(info)
            }
            if(key == 'accused'){
                info ={
                    title:'Acusado',
                    value:'REFERENCIA_TAG_ACUSADO'
                }
                this.tags_to_use.push(info)
            }
            if(key == 'appellant'){
                info ={
                    title:'Querellantes',
                    value:'REFERENCIA_TAG_QUERELLANTE'
                }
                this.tags_to_use.push(info)
            }
            if(key == 'victim'){
                info ={
                    title:'Victima',
                    value:'REFERENCIA_TAG_VICTIMA'
                }
                this.tags_to_use.push(info)
            }
        }
        console.log("ARRAY",this.tags_to_use);
         
    },
    ClickOnTag(tag_selected){
      //TODO funcionalidad para enviar el valor al editor de texto wisiwig
      console.log("Click tag",tag_selected)
      this.document_writing = tag_selected.value;  
      //this.AddTagInToDocumentText(tag_selected.value);

    },
    ClickOnCancel(){
      console.log("Click cancel")
      //TODO funcionalidad para cerrar los tags del documento seleccionado
      this.tagIsSelected = false;
      this.ClearDataTags()
    }
  },
  computed: {
    ...mapState("tags_info", ["list_tags", "tag_selected",'document_text']),
    listCoverProperties(){
        return this.tags_to_use;
    },
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
    this.getCoverImage();
  }
};
</script>
<style scoped>
.my-card {
  width: 95%;
  /* height: 200px; */
  margin-bottom: 15px;  
}
.content-cards{
    height: 400px;    
    overflow: auto;
}
.btn-content .q-btn{
    margin-right: 10px;
}
.btn-content-cancel{
  width: 100%;
}
</style>
