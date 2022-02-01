<template>
  <div class="q-pa-md">
    <div class="row justify-center">
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
         <q-card class="my-card" v-for="(images_cover, index) in models_list" :key="index">
          <q-card-section>
            <div class="text-h6">{{ images_cover.name }}</div>            
          </q-card-section>
          <q-card-section class="q-pt-none text-doc">
           <q-card-section v-html="images_cover.documents_text" />
          </q-card-section>
          <q-card-section>
            <div class="row justify-end btn-content-docs">                 
              <q-btn round color="red" icon="fas fa-edit" size="10px" @click="UseModel(images_cover)"/>                
            </div>
          </q-card-section>
        </q-card>
       </div>
      <div v-if="!isSearching" class="content-cards2">
        <q-infinite-scroll @load="(index,done) => initDefaultData(index,done)" :offset="60" scroll-target=".content-cards2">        
        <!-- <div class="content-cards" > -->
          <q-card class="my-card" v-for="(images_cover, index) in models_list" :key="index">
            <q-card-section>
              <div class="text-h6">{{ images_cover.name }}</div>            
            </q-card-section>
            <q-card-section class="q-pt-none text-doc">
            <q-card-section v-html="images_cover.documents_text" />
            </q-card-section>
            <q-card-section>
              <div class="row justify-end btn-content-docs">                 
                  <q-btn round color="red" icon="fas fa-edit" size="10px" @click="UseModel(images_cover)"/>                
              </div>
            </q-card-section>
          </q-card>
          <template v-slot:loading>
            <div class="row justify-center q-my-md">
              <q-spinner-dots color="primary" size="40px" />
            </div>
        </template>
        <!-- </div> -->   
      </q-infinite-scroll>   
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
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi accusamus corporis magnam in soluta repudiandae.",
      page:0,
      size:5,
      filter:null
    };
  },
  methods: {
    ...mapMutations("memorials_decrets", ["ReloadModelsInList",'WritingDocumentText','ClearData'," IsNotSearching"]),
    ...mapMutations("tags_info",["IsSearching"]),    
    ...mapActions("memorials_decrets", ["GetMemorialsFromApi","GetModelsMemorials","GetMemorialsModelInList","FindDataFromMemorialsModels","GetDataFromMemorialsModelsSearch"]),
  CheckEmpty(e){   
      
      if(e == ''){
        this.isnotSearching = true
        
        this.page= 0; 
        this.page += 1;
           let props = {
             page:this.page,
             rowPerPage:this.size
           }
    this.ClearData();
    this.GetMemorialsModelInList(props)
     .then(response =>{
                
                this.ReloadModelsInList(response.data.data);
            })
            .catch(error =>{
                console.log(error);
            })   
   
        this.IsSearching(false)    
        
      }
    },

    GetPressEnter(e){      
      //TODO BUSCADOR
       if (e.keyCode === 13) {
         this.isnotSearching = false
         let querys = {                
                name:this.filter,
                description:this.filter,
                documents_text:this.filter,
         }  
         this.ClearData();   
          this.GetDataFromMemorialsModelsSearch(querys)          
          this.IsSearching(true)  
      }  
    },

     initDefaultData(index,done){
      
      setTimeout(()=>{
          
           this.page += 1;
           let props = {
             page:this.page,
             rowPerPage:this.size
           }
           this.GetMemorialsModelInList(props)
           .then(response =>{
                
                this.ReloadModelsInList(response.data.data);
            })
            .catch(error =>{
                console.log(error);
            })       
          done()
      },2000)     
      //done
      //done()
      
    },
    
    UseModel(model){    
      this.IsSearching(false); 
      this.WritingDocumentText(model.documents_text)      
      this.GotoJoinTagAndModel();
    },
    GotoJoinTagAndModel(){
      this.$router.push({
        name:'MemorialModelsLinking'
      })
    }
   
  },
  computed: {
    ...mapState("memorials_decrets", ["memorials_list", "memorial_properties","models_list","isSearching"]),
    ...mapState("tags_info",['isSearching'])
  },
  created() {   
  },
  mounted() {
     this.page += 1;
     //this.IsNotSearching();
           let props = {
             page:this.page,
             rowPerPage:this.size
           }
    this.ClearData();
    this.GetMemorialsModelInList(props)
     .then(response =>{                
                this.ReloadModelsInList(response.data.data);
            })
            .catch(error =>{
                console.log(error);
            })       
  },
  
};
</script>
<style scoped>
.my-card {
  width: 95%; 
  margin:auto;
  margin-bottom: 15px;  
  overflow: hidden;
}

.content-cards2{
    max-height: 300px;    
    overflow: auto;
}
.text-doc {
  height: 220px;
  overflow: hidden;
}
.btn-content-docs .q-btn {
  margin-right: 10px;
}
.content-tosearch{
  max-height: 300px;
  overflow: auto;
}
</style>
