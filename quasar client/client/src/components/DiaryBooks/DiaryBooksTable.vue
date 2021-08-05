<template>
  <div class="q-pa-md">
        <q-table
        grid
        card-class="bg-primary text-white"
        title="Libros registrados"
        :data="list_diary_books"
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
              <strong>{{ props.row.book_name | truncate(30)}}</strong>
            </q-card-section>            
            <q-card-section class="flex flex-center">
              <div>{{ props.row.year_of_management | truncate(20) }}</div>
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
    <q-dialog v-model="delete_open">
      <DeleteComponent/>
    </q-dialog>
  </div>
</template>
<script>
import {mapActions,mapState,mapMutations} from 'vuex'
import DeleteComponent from './Delete.vue'
export default {
  name: "DiarybookTable",
  components:{DeleteComponent},
  data() {
    return {    
      filter: null, 
      columns: [
        {
          name: "book_name",
          required: true,
          label: "Nombre de libro",
          align: "left",
          field: (row) => row.book_name,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "year_of_management",
          align: "center",
          label: "N° Documentos registrados",
          field: "year_of_management",
          sortable: true,
        },        
        {
          name: "options",
          label: "Opciones",
          field: "options",
        },
      ],
      data: [],
    };
  },
  methods: {
    ...mapActions('diary_books',['GetListDiaryBooks']),
    ...mapMutations('diary_books',['ReloadDiarySelected','DeleteOpenClose']),
    GotoCreate(){
      this.$router.push({
        name:'CreateDiarybooks'
      })
    },
    GetDiaryBooks(){
      this.GetListDiaryBooks();
    },
    GetDate() {
      let month =
        new Date().getMonth() + 1 >= 10
          ? new Date().getMonth()
          : "0" + (new Date().getMonth() + 1);
      let year = new Date().getFullYear();
      let date =
        new Date().getDate() >= 10
          ? new Date().getDate()
          : "0" + new Date().getDate();
      let date_complete = "" + year + "/" + month + "/" + date;
      console.log(date_complete);
      return date_complete;
    },
    ViewMore(row_selected){
      this.ReloadDiarySelected(row_selected)
      this.$router.push({
        name:'GetContentDiarybook'
      })
    },
    GetDocumentToEdit(row_selected){      
      console.log("EDIT",row_selected);
      this.ReloadDiarySelected(row_selected);
      this.$router.push({
        name:'UpdateDiarybooks'
      })
    },
    Delete(row_selected){
      this.DeleteOpenClose(true);
      this.ReloadDiarySelected(row_selected)
    },
  },
  computed:{
    ...mapState('diary_books',['list_diary_books','diary_selected','delete_open'])
  },
  filters:{
      truncate: function(data,num){
            let checkend = num > data.length ? "" : "..."
            const reqdString = 
              data.split("").slice(0, num).join("")+checkend;
            return reqdString;
        }
    },
  mounted() {
    this.GetDiaryBooks();
    this.date = this.GetDate();
  },
};
</script>
