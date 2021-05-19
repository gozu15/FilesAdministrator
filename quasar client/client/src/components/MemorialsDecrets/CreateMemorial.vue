<template>
  <div class="q-pa-md">
     <q-page-container>
          <q-page>
    <div class="row">
      <div class="content-editor" id="content-editor">
        <q-editor
          v-model="memorial_object.documents_text"
          :dense="$q.screen.lt.md"
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
            arial: 'Arial',
            arial_black: 'Arial Black',
            comic_sans: 'Comic Sans MS',
            courier_new: 'Courier New',
            impact: 'Impact',
            lucida_grande: 'Lucida Grande',
            times_new_roman: 'Times New Roman',
            verdana: 'Verdana'
          }"
        >
          <template v-slot:image>
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
          </template>
        </q-editor>
      </div>
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
                        <MemorialModelList/>
                      </q-tab-panel>
                    </q-tab-panels>
                  </div>
                </div>           
      </div>
    </div>
     <q-page-sticky position="bottom-right" :offset="[18, 220]">
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
  </div>
</template>
<script>
import TagsInformation from "../../components/TagsFromImage/GetAllTags";
import MemorialModelList from "../../components/MemorialsDecretsModels/ListToUse";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  components: { TagsInformation,MemorialModelList},
  data() {
    return {      
      memorial_object:{
        name:null,
        uid_image_object:null,
        type_document:null,
        description:null,
        documents_text:" ",
      },
      file: null,
      tab: "causas",      
    };
  },
  methods: {
    ...mapMutations("memorials_decrets", [
      "ReloadListMemorials",
      "ReloadMemorialProperties",
      "ChangeNextPage",
      "ClearData"
    ]),
    ...mapActions("memorials_decrets", []),
    Open(){
      
      document.getElementById('content-editor').style.width = '65%';
      document.getElementById('content-tabs').style.display = 'block';
      document.getElementById('content-tabs').style.width = '35%';
      console.log("Opem")
    },
    Close(){
      document.getElementById('content-tabs').style.display = 'none';
      document.getElementById('content-editor').style.width = '100%';
      console.log("close")
    },
    getMemorialList() {},
    onSubmit() {},
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
    ...mapState("memorials_decrets", ["memorials_list"])
  }
};
</script>
<style scoped>
.q-page-container{
  padding: 0 !important;
}
.content-tabs{
  display: none;
}
</style>

