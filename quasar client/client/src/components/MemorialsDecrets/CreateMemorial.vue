<template>
  <div class="q-pa-md">
    <q-page-container>
      <q-page>
        <div class="row">
          <div class="content-tabs" id="content-tabs">
            <div>
              <q-tabs
                v-model="tab"
                align="justify"
                narrow-indicator
                class="q-mb-sm"
              >
                <q-tab class="text-purple" name="causas" label="Causas" />
                <q-tab class="text-orange" name="models" label="Modelos" />
              </q-tabs>
              <div class="q-gutter-y-sm">
                <q-tab-panels
                  v-model="tab"
                  animated
                  transition-prev="scale"
                  transition-next="scale"
                  class="text-center"
                >
                  <q-tab-panel name="causas">
                    <div class="text-h6">Causas</div>
                    <TagsInformation />
                  </q-tab-panel>

                  <q-tab-panel name="models">
                    <div class="text-h6">
                      Modelos de Decretos y Memoriales
                    </div>
                    <MemorialModelList />
                  </q-tab-panel>
                </q-tab-panels>
              </div>
            </div>
          </div> 
          <div class="content-editor" id="content-editor">
            <q-editor
              ref="editor_ref"
              v-model="document_writing"
              :dense="$q.screen.lt.md"
              @keypress ="InputText($event)"
              :toolbar="[
                ['bold', 'italic', 'strike', 'underline'],
                ['print', 'fullscreen'],
                [
                  {
                    label: 'Tamaño de letra',
                    icon: $q.iconSet.editor.fontSize,
                    fixedLabel: true,
                    fixedIcon: true,
                    list: 'no-icons',
                    options: [
                      'size-1',
                      'size-2',
                      'size-3',
                      'size-4',
                      'size-5',
                      'size-6',
                      'size-7'
                    ]
                  },
                  {
                    label: 'Tipo de letra',
                    icon: $q.iconSet.editor.font,
                    fixedIcon: true,
                    list: 'no-icons',
                    options: [
                      'default_font',
                      'arial',
                      'arial_black',
                      'comic_sans',
                      'courier_new',
                      'impact',
                      'lucida_grande',
                      'times_new_roman',
                      'verdana'
                    ]
                  },
                  'removeFormat'
                ],
                [
                  {
                    label: $q.lang.editor.align,
                    icon: $q.iconSet.editor.align,
                    fixedLabel: true,
                    options: ['left', 'center', 'right', 'justify']
                  }
                ],
                ['unordered', 'ordered', 'outdent', 'indent'],
                ['image'],

                ['undo', 'redo'],
                ['viewsource']
              ]"
              :fonts="{
                bookman_old_style:'Bookman Old Style',
                century_gothic:'Century Gothic',
                arial: 'Arial',
                arial_black: 'Arial Black',
                comic_sans: 'Comic Sans MS',
                courier_new: 'Courier New',
                impact: 'Impact',
                lucida_grande: 'Lucida Grande',
                times_new_roman: 'Times New Roman',
                verdana: 'Verdana',
                
              }"
            >
              <!-- <template v-slot:image>
            <q-file
              v-model="file"
              ref="token"
              unelevated
              color="white"
              text-color="primary"
              label="Token"
              size="sm"
              style="width:100px"
              @input="CheckFile()"
            />
          </template> TODO Obtener imagen y subirlo a editor-->
            </q-editor>
          </div>                   
        </div>

        <q-page-sticky position="bottom-right" :offset="[18, 130]">
          <q-btn
            round
            size="18px"
            color="primary"            
            icon="save"
            direction="left"          
            @click="VerifyDocument()"
          >
          </q-btn>
        </q-page-sticky>
        <q-page-sticky position="bottom-right" :offset="[18, 70]">
          <q-btn
            round
            size="18px"
            color="red"            
            icon="fas fa-times-circle"            
            direction="left"    
            @click="GobackInit()"       
          >
          </q-btn>
        </q-page-sticky>

        <q-page-sticky position="bottom-right" :offset="[18, 250]">
          <q-fab
            color="amber"
            text-color="black"
            icon="keyboard_arrow_left"
            direction="left"
            @show="Open()"
            @hide="Close()"
          >
          </q-fab>
        </q-page-sticky>
      </q-page>
    </q-page-container>

    <q-dialog v-model="save_change">
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h5">Guardar cambios</div>
        </q-card-section>
            <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="memorial_object.name"
        label="Ingrese nombre del documento *"
        hint="Name and surname"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

       <q-select outlined v-model="memorial_object.type_document" :options="options" label="Selecciona tipo de documento"
       />      
      <q-input
        filled        
        v-model="memorial_object.description"
        label="Una descripcion "              
      />     

      <div>
        <q-btn label="Guardar" type="submit" color="primary"/>
        <q-btn label="Cancelar" type="reset" color="red" flat class="q-ml-sm" v-close-popup/>
      </div>
    </q-form>
        </q-card>      
     
    </q-dialog>

    <!-- DIALOG TO CHECK DOCUMENT BEFORE LEAVE -->
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="signal_wifi_off" color="red" text-color="white" />
          <span class="q-ml-sm">¿Esta seguro salir sin guardar?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="red" v-close-popup />
          <q-btn flat label="Salir" color="primary" v-close-popup @click="GobackInit()"/>
        </q-card-actions>
      </q-card>
    </q-dialog>



  </div>
</template>
<script>
import TagsInformation from "../../components/TagsFromImage/GetAllTags";
import MemorialModelList from "../../components/MemorialsDecretsModels/ListToUse";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
export default {
  components: { TagsInformation, MemorialModelList },
  data() {
    return {
      memorial_object: {
        name: null,
        uid_image_object: null,
        type_document: null,
        description: null,
        documents_text: " "
      },
      confirm:false,
      options:['Decreto',
'Memorial',
'Acusaciones',
'Autos de inicio',        
      ],
      save_change:false,
      file: null,
      tab: "causas"
    };
  },
  methods: {
    ...mapMutations("memorials_decrets", [
      "ReloadListMemorials",
      "ReloadMemorialProperties",
      "ChangeNextPage",
      "ClearData",
      "AddTagInToDocumentText"
    ]),
    ...mapActions("memorials_decrets", ['CreateMemorialNewDocument']),
    InputText(e){      
      if(e.key === 9 || e.key === 11){
        console.log('TAB')
      }
    },
    Open() {
      document.getElementById("content-editor").style.width = "65%";
      document.getElementById("content-tabs").style.display = "block";
      document.getElementById("content-tabs").style.width = "35%";
      console.log("Opem");
    },
    Close() {
      document.getElementById("content-tabs").style.display = "none";
      document.getElementById("content-editor").style.width = "100%";
      console.log("close");
    },
    getMemorialList() {},
    VerifyDocument() {      
      //this.$refs.editor_ref.runCmd('insertText', "THIS IS A EXAMPLE")
      console.log(this.memorial_text_doc);
      console.log("TAG SELECTED",this.tag_selected);
      this.save_change = true;
      //this.pasteCapture();
    },    
    onSubmit(){
      let typevalue= this.memorial_object.type_document;      
      this.memorial_object.documents_text=this.memorial_text_doc
      this.memorial_object.type_document = typevalue;
      this.CreateMemorialNewDocument(this.memorial_object);   
      this.GoToMemorialsTable();
    }, 
    GobackInit(){
        this.GoToMemorialsTable()
    },
    GoToMemorialsTable(){
      this.$router.replace({
        name:'MemorialsDocuments'
      })
    },
    onReset() {},
    getImage() {},
    CheckFile() {
      this.$q.notify({
        message: "Saved your text to local storage",
        color: "green-4",
        textColor: "white",
        icon: "cloud_done"
      });
    }
  },
  computed: {
    ...mapState("memorials_decrets", [
      "memorials_list",
      "memorial_properties",
      "memorial_text_doc"
    ]),
    ...mapState("tags_info",['tag_selected']),
    document_writing: {
      get: function() {
        return this.$store.state.memorials_decrets.memorial_text_doc;
      },
      set: function(newTitle) {
        this.$store.commit("memorials_decrets/WritingDocumentText", newTitle);
      }
    }
  },
  mounted() {
    console.log(this.$store);
  },
  beforeDestroy(){
    this.ClearData();
    console.log("Destroyed");
  }
  
};
</script>
<style scoped>
.q-page-container {
  padding: 0 !important;
}
.content-editor {
  width: 100%;
}
.content-tabs {
  display: none;
}
.my-card{
  width: 400px;  
  padding: 25px;
}
</style>
