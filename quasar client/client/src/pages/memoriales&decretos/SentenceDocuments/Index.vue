<template>
  <div class="q-pa-md">
    <q-table
      grid
      ref="TableReference"
      title="Sentencias"
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
                color="primary"
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
            <q-separator />
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
                  color="dark"
                  icon="fas fa-file-download"
                  @click="Download(props.row)"
                ></q-btn>
                <q-btn
                  round
                  color="dark"
                  icon="far fa-eye"
                  @click="ViewMore(props.row)"
                ></q-btn>
                <q-btn
                  round
                  color="green"
                  icon="far fa-edit"
                  @click="GetDocumentToEdit(props.row)"
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
  </div>
</template>
<script>
import ViewMore from "../../../components/MemorialsDecrets/ViewMore";
import { mapState, mapMutations, mapActions } from "vuex";
const stringOptions = ["5", "8", "10", "15", "20", "30"];
export default {
  components: { ViewMore },
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
      "ClearListFromSearch"
    ]),
    ...mapActions("memorials_decrets", ["GetMemorialsFromApiSentence","FindDataFromMemorialsDocs"]),
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
          this.FindDataFromMemorialsDocs(querys)
         console.log("SEARCH",this.memorials_list_searching)
          this.IsSearching()
      }  
    },
    CheckEmpty(e){   
      console.log("No empty",e)   
      if(e == ''){
        console.log("THIS IS EMPTY",e);
         this.ClearListFromSearch()
        this.GetMemorialsFromApiSentence()
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
      if (this.memorials_list.length  >= this.data_per_page) {
        console.log("ENTRO IF");
        this.ChangeNextPage();
        params = {
          page: this.page,
          rowPerPage: this.data_per_page
        };
        
        await this.GetMemorialsFromApiSentence(params);   
        setTimeout(()=>{
          this.$refs.TableReference.nextPage();
        },1000)   
        
      } else {
        console.log("NEXT");
        this.$refs.TableReference.nextPage();
      }
      }
      else{
          let params;
        if (this.data_per_page >= this.memorials_list_searching.length) {
          console.log("ENTRO IF");
          this.ChangeNextPage();
          params = {
            page: this.page,
            rowPerPage: this.data_per_page,
             name:this.filter,
          description:this.filter,
          documents_text:this.filter,
          };
          this.FindDataFromMemorialsDocs(params);
          this.data= this.memorials_list_searching
          this.$refs.TableReference.nextPage();
        } else {
          this.$refs.TableReference.nextPage();
        }
      }     
    },
    prevPage() {
      this.$refs.TableReference.prevPage();
      console.log("PREF");
    },

    changeRowsPerPage() {
      if(this.isSearching == false){
         let pagination = {
        rowsPerPage: this.data_per_page
      };
      let params;
      if (this.data_per_page >= this.memorials_list.length) {
        console.log("ENTRO IF");
        this.ChangeNextPage();
        params = {
          page: this.page,
          rowPerPage: this.data_per_page
        };
        this.GetMemorialsFromApiSentence(params);
        this.data = this.memorials_list;
        this.$refs.TableReference.setPagination(pagination);
      } else {
        console.log("ENTRO ELSE");
        this.$refs.TableReference.setPagination(pagination);
      }
      }
      else{
           let pagination = {
        rowsPerPage: this.data_per_page
      };
      let params;
      if (this.data_per_page >= this.memorials_list_searching.length) {
        console.log("ENTRO IF");
        this.ChangeNextPage();
        params = {
          page: this.page,
          rowPerPage: this.data_per_page,
          name:this.filter,
          description:this.filter,
          documents_text:this.filter,
        };
        this.FindDataFromMemorialsDocs(params);
        this.data = this.memorials_list_searching;
        this.$refs.TableReference.setPagination(pagination);
      } else {
        console.log("ENTRO ELSE");
        this.$refs.TableReference.setPagination(pagination);
      }
      }
     
    },

    GetMemorials() {
      this.GetMemorialsFromApiSentence();
     
    },
    GoToRegisterAnImageTag() {
      this.$router.push({
        name: "CreateMemorialsDocuments"
      });
    },
    GetDocumentToEdit(doc_selected) {
      console.log(doc_selected);
      this.ReloadMemorialProperties(doc_selected);
      this.$router.push({
        name: "UpdateMemorialsDocuments"
      });
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
      "isSearching"
    ]),
    GetListMemorials(){
      return this.data;
    }, 
  },
  created() {
     this.GetMemorials();
      this.data = this.memorials_list;
  },
  mounted() {
   

    console.log("EQWEQEQWE");
  }
};
</script>
<style scoped>
.my-card {
  height: 100%;
}
.text-doc {
  height: 210px;
  overflow: hidden;
}
.btn-content-docs .q-btn {
  margin-right: 10px;
}
.bottom-table{
  width: 100% !important ;
}
.row-btn .q-btn{
  margin-left: 10px;
}
</style>
