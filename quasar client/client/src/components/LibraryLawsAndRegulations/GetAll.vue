<template>
    <div class="q-pa-md">
        <q-table
        grid
        card-class="bg-primary text-white"
        title="Libros registrados"
        :data="list_books"
        :columns="columns"
        row-key="name"
        :filter="filter"
        hide-header
        >
      <template v-slot:top-right>        
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Buscar">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <div class="q-pl-md">
            <q-btn round color="primary" icon="add" @click="GotoCreate"></q-btn>
        </div>
        
      </template>

      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-12 col-sm-3 col-md-3">
          <q-card class="my-card">
            <img src="../../../public/image/book.png" alt="">
            <q-card-section class="text-center tittle">              
              <br>
              <strong>{{ props.row.name | truncate(35)}}</strong>
            </q-card-section>            
            <q-card-section class="flex flex-center">
              <div>{{ props.row.description | truncate(20) }}</div>
            </q-card-section>
            <q-separator />
            <q-card-section>
              <div class="row justify-end btn-content-docs">                
                <q-btn
                  round
                  color="dark"
                  icon="far fa-eye"
                  size="10px"
                  @click="ViewMore(props.row)"
                ></q-btn>
                <q-btn
                  round
                  color="green"
                  icon="far fa-edit"
                  size="10px"
                  @click="GetDocumentToEdit(props.row)"
                ></q-btn>
                <q-btn
                  round
                  color="red"
                  icon="fas fa-times"
                  size="10px"
                  @click="Delete(props.row)"
                ></q-btn>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </template>
    </q-table>    

    <q-dialog v-model="open_delete_dialog" persistent>
      <DeletePdfSelected/>
    </q-dialog>

    </div>
</template>
<script>
import DeletePdfSelected from './DeleteInfo.vue'
import PreviewPDF from './PreviewPdf.vue'
import {mapState,mapActions,mapMutations} from 'vuex'
export default {
  components:{PreviewPDF,DeletePdfSelected},
    data(){
        return{
            filter:'',
            columns:[
                { name: 'name', label: 'Nombre', field: 'name' },
                { name: 'description', label: 'Descripcion', field: 'description' }
            ],
            
        }
    },
    methods:{
        ...mapMutations('library',['getPdf','OpenCloseDialog','GetPropertiesbookPDF']),
        ...mapActions('library',['GetAllPDFs','GetPDFSelected']),
        Delete(book_selected){
          console.log(book_selected);
          this.GetPropertiesbookPDF(book_selected);
          this.OpenCloseDialog(true)
        },
        ViewMore(book_selected){
          console.log(book_selected);          
          this.GetPDFSelected(book_selected)
          this.$router.push({
            path:'library_laws_preview'
          })

        },
        GetDocumentToEdit(book_selected){
          this.GetPropertiesbookPDF(book_selected);
          this.$router.push({
            name:'LibraryLawsUpdatePDF'
          })
          console.log(book_selected);
        },
        GotoCreate(){
          this.$router.push({
            name:'LibraryLawsAdd'
          })
        }
    },
    computed:{
        ...mapState('library',['list_books','open_delete_dialog'])
    },
    filters:{
      truncate: function(data,num){
            let checkend = num > data.length ? "" : "..."
            const reqdString = 
              data.split("").slice(0, num).join("")+checkend;
            return reqdString;
        }
    },
    mounted(){
      this.GetAllPDFs();
    },
    created(){
      
    }
}
</script>
<style scoped>
.my-card img{
    background-size: 100% 100%;
    width: 50%;    
    height: 100px;
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