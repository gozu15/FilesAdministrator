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
            <q-btn round color="positive" icon="add" @click="GotoCreate"></q-btn>
        </div>
        
      </template>

      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-12 col-sm-3 col-md-3">
          <q-card class="my-card">
            <div class="icon-box">
              <q-icon name="fas fa-gavel" class="text-red" style="font-size: 4rem;" />               
            </div>           
            <q-card-section class="text-center tittle">              
              <br>
              <div style="font-size:12px; color:white;"><strong>{{ props.row.name | truncate(35)}}</strong></div>
              
            </q-card-section>            
            <q-card-section class="flex flex-center">
              <div>{{ props.row.description | truncate(15) }}</div>
            </q-card-section>
            <q-separator color="white"/>
            <q-card-section>
              <div class="row justify-end btn-content-docs">                
                <q-btn
                  round
                  flat
                  color="positive"
                  icon="far fa-eye"
                  size="10px"
                  @click="ViewMore(props.row)"
                ></q-btn>
                <q-btn
                  round
                  flat
                  color="positive"
                  icon="far fa-edit"
                  size="10px"
                  @click="GetDocumentToEdit(props.row)"
                ></q-btn>
                <q-btn
                  round
                  flat
                  color="positive"
                  icon="fas fa-trash-alt"
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
          this.GetPropertiesbookPDF(book_selected);
          this.OpenCloseDialog(true)
        },
        ViewMore(book_selected){
            
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
<style lang="sass" scoped>
@import '../../css/quasar.variables.scss'
.my-card img
    background-size: 100% 100%
    width: 50%    
    height: 100px
    margin: auto
  
.my-card
  width: 100%
  color: white !important
  background-color: $bluedark

.btn-content-docs .q-btn 
  margin-right: 10px

.tittle
  height: 80px

.icon-box .q-icon
  text-align: center
  padding: 10px
  width: 100%  
  color: $positive !important

</style>