<template>
  <div class="q-pa-sm">
    <div  v-if="!tagIsSelected" class="row justify-center">
      <div class="content-cards" >
        <q-card class="my-card" bordered v-for="(images_cover, index) in list_tags" :key="index">
          <q-card-section>
            <div class="text-h6">{{ images_cover.code_document }}</div>
            <div class="text-subtitle2">{{ images_cover.crime }}</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            {{ lorem }}
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
    </div>

    <div v-if="tagIsSelected" class="row justify-center">     
      <div v-for="(tags,index) in tags_to_use" :key="index" class="content-tags">
        <q-chip clickable @click="ClickOnTag(tags)" color="teal" icon="far fa-bookmark" text-color="white" :label="tags.title" />           
      </div>

       <div>
        <q-btn round color="red" icon="close" size="10px" @click="ClickOnCancel()">
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
      tagIsSelected:false,
      tags_to_use:[],
    };
  },
  methods: {
    ...mapMutations("tags_info", []),
    ...mapActions("tags_info", ["GetListTagsAndLoad"]),
    ...mapMutations("memorials_decrets",['AddTagInToDocumentText']),
    GetTagsAndLoadInTheList() {
      this.GetListTagsAndLoad();
    },
    getCoverImage(cover_selected){
     
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
    ClickOnTag(tag_selected){
      //TODO funcionalidad para enviar el valor al editor de texto wisiwig
      console.log("Click tag",tag_selected)
      this.AddTagInToDocumentText(tag_selected.value);

    },
    ClickOnCancel(){
      console.log("Click cancel")
      //TODO funcionalidad para cerrar los tags del documento seleccionado
      this.tagIsSelected = false;
    }
  },
  computed: {
    ...mapState("tags_info", ["list_tags", "tag_selected",'document_text'],"memorials_decrets",["memorial_properties"])
  },
  created() {},
  mounted() {
    this.GetListTagsAndLoad();
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
</style>
