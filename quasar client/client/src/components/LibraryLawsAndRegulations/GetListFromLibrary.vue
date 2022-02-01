<template>
    <div class="q-pa-md">    
      <div class="container">
        <div v-for="(pdf,index) in list_books" :key="index" class="q-pa-md col-xs-12">
          <q-card class="my-card">
            <img src="../../../public/image/book.png" alt="">
            <q-card-section class="text-center tittle">              
              <br>
              <strong>{{ pdf.name | truncate(35)}}</strong>
            </q-card-section>            
            <q-card-section class="flex flex-center">
              <div>{{ pdf.description | truncate(20) }}</div>
            </q-card-section>
            <q-separator />
            <q-card-section>
              <div class="row justify-end btn-content-docs">                
                <q-btn
                  round
                  color="dark"
                  icon="far fa-eye"
                  @click="ViewMore(pdf)"
                ></q-btn>               
              </div>
            </q-card-section>
          </q-card>
        </div>
        </div>         
    </div>
</template>
<script>
import {mapState,mapActions,mapMutations} from 'vuex'
export default {
    name:'ListBooksFromLibrary',
    data(){
        return{}
    },
    methods:{
        //TODO Enviar todas las listas de los libros y utilizarlo en un editor de texto. AUTOS, RESOLUCIONES SENTENCIAS
        ...mapMutations('memorials_decrets',['changeViewMorePdfFromEditor']),
        ...mapActions('library',['GetAllPDFs','GetPDFSelected']),
        ViewMore(selected_pdf){           
             this.GetPDFSelected(selected_pdf)
             this.changeViewMorePdfFromEditor(true);
        }
    },
     filters:{
      truncate: function(data,num){
            let checkend = num > data.length ? "" : "..."
            const reqdString = 
              data.split("").slice(0, num).join("")+checkend;
            return reqdString;
        }
    },
    computed:{
         ...mapState('library',['list_books','open_delete_dialog'])
    },
    mounted(){
      this.GetAllPDFs()
    }
}
</script>
<style scoped>
.container{
  height: 380px;
}
.my-card img{
    background-size: 100% 100%;
    width: 50%;    
    height: 80px;
    padding-top: 10px;
    margin: auto;
}  
.my-card{
  width: 100%;
  
}
.btn-content-docs .q-btn {
  margin-right: 10px;
}
.tittle{
  height: 80px;
}
</style>