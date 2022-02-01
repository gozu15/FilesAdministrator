<template>
  <div class="q-pa-md">
    <q-table
      grid
      ref="TableReference"
      title="Resoluciones"
      :data="isSearching == false ? memorials_list : memorials_list_searching"
      :columns="columns"
      row-key="name"     
      hide-header
    >
      <template v-slot:top-right>
        <div class="row">
          <div class="col-6">
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
          <div class="col-6">
            <div class="row justify-end">
              <q-btn
                @click="GoToRegisterAnImageTag()"
                round
                color="positive"
                icon="add"
              />
            </div>
          </div>
        </div>
      </template>

      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
          <q-card class="my-card">
            <q-card-section class="text-center">
              <strong>{{ props.row.name }}</strong>
            </q-card-section>
            <q-separator color="white" />
            <q-card-section class="flex flex-center">
              <div style="width:100%">
                TIPO DE DOCUMENTO: {{ props.row.type_document }}
              </div>
            </q-card-section>
            <q-card-section class="text-doc">
              <q-card-section v-html="props.row.documents_text" />
              <!-- <div style="width:100%; overflow:hidden">{{ props.row.documents_text | truncate(350) }}</div> -->
            </q-card-section>
            <q-card-section class="">
              <div class="row justify-end btn-content-docs">
                <q-btn
                  round
                  flat
                   size="10px"
                  color="positive"
                  icon="fas fa-file-download"
                  @click="Download(props.row)"
                ></q-btn>
                <q-btn
                  round
                  flat
                   size="10px"
                  color="positive"
                  icon="far fa-eye"
                  @click="ViewMore(props.row)"
                ></q-btn>
                <q-btn
                  round
                  flat
                   size="10px"
                  color="positive"
                  icon="far fa-edit"
                  @click="GetDocumentToEdit(props.row)"
                ></q-btn>
                  <q-btn
                  round
                  flat
                  size="10px"
                  color="positive"
                  icon="fas fa-trash-alt"
                  @click="Delete(props.row)"
                ></q-btn>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </template>

      <template class="bottom-table" style="width:100%" v-slot:bottom>
        <div class="row justify-end row-btn" style="width:100%">
          <p>Documentos por pagina:</p>
           <q-select
           style="margin-left:10px"
            outlined
            ref="select_RowsperPage"
            v-model="data_per_page"
            :options="options"
            @input="changeRowsPerPage"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  No results
                </q-item-section>
              </q-item>
            </template>
          </q-select>
          <q-btn flat round @click="prevPage" color="primary" icon="fas fa-backward"> </q-btn>
          <q-btn flat round @click="nextPage" color="primary" icon="fas fa-forward" > </q-btn>
          
         
        </div>
      </template>
    </q-table>
    <q-dialog v-model="view_more" full-width>
      <ViewMore />
    </q-dialog>
    <q-dialog v-model="open_dialog">
      <DeleteMemorial/>
    </q-dialog>
  </div>
</template>
<script>
import ViewMore from "../../../components/MemorialsDecrets/ViewMore";
import DeleteMemorial from "../../../components/MemorialsDecrets/Delete.vue";
import { mapState, mapMutations, mapActions } from "vuex";
const stringOptions = ["5", "8", "10", "15", "20", "30"];
export default {
  components: { ViewMore,DeleteMemorial },
  data() {
    return {
      data_per_page: 5,
      options: stringOptions,  
      filter: "",
      columns: [
        {
          name: "name",
          required: true,
          label: "Nombre",
          align: "center",
          field: row => row.name,
          sortable: true
        },
        {
          name: "type_document",
          align: "left",
          label: "Tipo de modelo",
          field: "type_document",
          sortable: true
        },
        {
          name: "documents_text",
          align: "left",
          label: "Texto",
          field: "documents_text",
          sortable: true
        }
      ],
      data: []
    };
  },
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
    truncate: function(text, stop, clamp) {
      return text.slice(0, stop) + (stop < text.length ? clamp || "..." : "");
    }
  },
  methods: {
    ...mapMutations("memorials_decrets", [
      "ChangeNextPage",
      "ClearData",
      "ReloadMemorialProperties",
      "OpenPreviewDocument",
      "IsSearching",
      "IsNotSearching",
      "ReloadListMemorials",
      "ClearListFromSearch",
       "IdPropertieMemorial",
      "NamePropertieMemorial",
      "TypePropertieMemorial",
      "DescriptionPropertieMemorial",
      "DocumentTextPropertieMemorial",
       "ChangePrevPage",
       "WritingDocumentText"
    ]),
    ...mapActions("memorials_decrets", ["GetMemorialsFromApiResolutions","FindDataFromResolutionDocs","OpenDialogDelete"]),
    GetPressEnter(e){
      //TODO BUSCADOR
       if (e.keyCode === 13) {
         let querys = {
                page:this.page,
                rowPerPage:this.data_per_page,
                name:this.filter,
                description:this.filter,
                documents_text:this.filter,
         }        
          this.FindDataFromResolutionDocs(querys)
         
          this.IsSearching()
      }  
    },
    Delete(props){
      this.OpenDialogDelete()
      this.TypePropertieMemorial(props.type_document)
      this.IdPropertieMemorial(props._id)
    },
    CheckEmpty(e){   
      
      if(e == ''){
        
         this.ClearListFromSearch()
        this.GetMemorialsFromApiResolutions()
         .then(async response =>{
                
                this.ReloadListMemorials(response.data.data);
            })
            .catch(error =>{
                
            })
        this.IsNotSearching()
      }
    },
    OnRequest(props) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination;
      /// and lines
      this.pagination.page = page;

      this.pagination.rowsPerPage = rowsPerPage;

      this.pagination.sortBy = sortBy;

      this.pagination.descending = descending;
    },
    nextPage: async function() {
    
       if(this.isSearching == false){
        let params;
           this.ChangeNextPage();        
          params = {
            page: this.page,
            rowPerPage: this.data_per_page
          };
          this.GetMemorialsFromApiResolutions(params)
          .then(response =>{
            
            if(response.length == 0){
                 this.ChangePrevPage()
            }     
            else{
              this.$refs.TableReference.nextPage();
            }
             
          })
          .catch(err =>{
            console.error(err)
          })    
      
      }
      else{
          let params;
        if (this.data_per_page >= this.memorials_list_searching.length) {
          
          this.ChangeNextPage();
          params = {
            page: this.page,
            rowPerPage: this.data_per_page,
             name:this.filter,
          description:this.filter,
          documents_text:this.filter,
          };
          this.FindDataFromDecretsDocs(params);
          this.data= this.memorials_list_searching
          this.$refs.TableReference.nextPage();
        } else {
          this.$refs.TableReference.nextPage();
        }
      }

    },
    prevPage() {
       this.ChangePrevPage()
      this.$refs.TableReference.prevPage();
      
    },

    changeRowsPerPage() {
      if(this.isSearching == false){
         let pagination = {
        rowsPerPage: this.data_per_page
      };
      let params;
      if (this.data_per_page >= this.memorials_list.length) {
        
        this.ChangeNextPage();
        params = {
          page: this.page,
          rowPerPage: this.data_per_page
        };
        this.GetMemorialsFromApiResolutions(params)
         .then(async response =>{
                
                this.ReloadListMemorials(response.data.data);
                this.data = this.memorials_list;
                this.$refs.TableReference.setPagination(pagination);
            })
            .catch(error =>{
                
            })
        
      } else {
        
        this.$refs.TableReference.setPagination(pagination);
      }
      }
      else{
           let pagination = {
        rowsPerPage: this.data_per_page
      };
      let params;
      if (this.data_per_page >= this.memorials_list_searching.length) {
        
        this.ChangeNextPage();
        params = {
          page: this.page,
          rowPerPage: this.data_per_page,
          name:this.filter,
          description:this.filter,
          documents_text:this.filter,
        };
        this.FindDataFromResolutionDocs(params);
        this.data = this.memorials_list_searching;
        this.$refs.TableReference.setPagination(pagination);
      } else {
        
        this.$refs.TableReference.setPagination(pagination);
      }
      }
     
    },

    GetMemorials() {
      this.GetMemorialsFromApiResolutions() 
    },
    GoToRegisterAnImageTag() {
      this.$router.push({
        name: "CreateMemorialsDocuments"
      });
    },
    GetDocumentToEdit(doc_selected) {
      this.$router.push({
        name: "UpdateMemorialsDocuments"
      })
       .then(async () =>{
        await this.WritingDocumentText(doc_selected.documents_text)
        await this.IdPropertieMemorial(doc_selected._id)
        await this.NamePropertieMemorial(doc_selected.name)
        await this.TypePropertieMemorial(doc_selected.type_document)
        await this.DescriptionPropertieMemorial(doc_selected.description)
        await this.DocumentTextPropertieMemorial(doc_selected.documents_text) 
      })
      .catch((err)=>{
        console.error(err)
      })
    },
    ViewMore(doc_selected) {
      this.OpenPreviewDocument(doc_selected);
    },
    Download(doc_selected) {
      this.ReloadMemorialProperties(doc_selected);
      let element = this.memorial_properties.documents_text;
      let filename = this.memorial_properties.name;
      var preHtml =
        "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
      var postHtml = "</body></html>";
      var html = preHtml + element + postHtml;
      var blob = new Blob(["\ufeff", html], {
        type: "application/msword"
      });

      // Specify link url
      var url =
        "data:application/vnd.ms-word;charset=utf-8," +
        encodeURIComponent(html);

      // Specify file name
      filename = filename ? filename + ".doc" : "document.doc";

      // Create download link element
      var downloadLink = document.createElement("a");

      document.body.appendChild(downloadLink);

      if (navigator.msSaveOrOpenBlob) {
        navigator.msSaveOrOpenBlob(blob, filename);
      } else {
        // Create a link to the file
        downloadLink.href = url;

        // Setting the file name
        downloadLink.download = filename;

        //triggering the function
        downloadLink.click();
      }

      document.body.removeChild(downloadLink);
    },

    GetRowToDelete(row) {}
  },
  computed: {
    ...mapState("memorials_decrets", [
      "memorials_list",
      "memorial_properties",
      "view_more",
      "page",
      "memorials_list_searching",
      "isSearching",
      "open_dialog"
    ]),
    GetListMemorials(){
      return this.data;
    }, 
  },
  created() {
     this.GetMemorials();
      this.data = this.memorials_list;
  },
  destroyed(){
    
    this.ClearData();

  },
  mounted() { 
    this.ClearData();
     this.GetMemorials();   
  }
};
</script>
<style lang="sass" scoped>
@import '../../../css/quasar.variables.scss'
.my-card 
  height: 100%
  background-color:$bluedark !important
  color: white

.text-doc 
  height: 210px
  overflow: hidden

.btn-content-docs .q-btn 
  margin-right: 10px

.bottom-table
  width: 100% !important 

.row-btn .q-btn
  margin-left: 10px

</style>
