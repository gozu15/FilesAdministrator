<template>
  <div class="q-pa-md">
    <div class="row justify-center">
      <div class="content-cards" >
        <q-card class="my-card" v-for="(images_cover, index) in memorials_list" :key="index">
          <q-card-section>
            <div class="text-h6">{{ images_cover.name }}</div>            
          </q-card-section>
          <q-card-section class="q-pt-none text-doc">
           <q-card-section v-html="images_cover.documents_text" />
          </q-card-section>
          <q-card-section>
            <div class="row justify-end btn-content-docs"> 
                 <q-btn round color="primary" icon="fas fa-eye" size="10px"/>   
                 <q-btn round color="red" icon="fas fa-edit" size="10px" @click="UseModel(images_cover)"/>                
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "MemorialModelList",
  data() {
    return {
      lorem:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi accusamus corporis magnam in soluta repudiandae."
    };
  },
  methods: {
    ...mapMutations("memorials_decrets", ['WritingDocumentText','ClearData']),
    ...mapActions("memorials_decrets", ["GetMemorialsFromApi","GetModelsMemorials"]),
    UseModel(model){
      this.WritingDocumentText(model.documents_text)
      this.GotoJoinTagAndModel();
      console.log('checkmodel',model)
    },
    GotoJoinTagAndModel(){
      this.$router.push({
        path:'tags_and_models'
      })
    }
   
  },
  computed: {
    ...mapState("memorials_decrets", ["memorials_list", "memorial_properties"])
  },
  created() {   
  },
  mounted() {
    this.ClearData();
    this.GetModelsMemorials();
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
    height: 400px;    
    overflow: auto;
}
.text-doc {
  height: 220px;
  overflow: hidden;
}
.btn-content-docs .q-btn {
  margin-right: 10px;
}
</style>
