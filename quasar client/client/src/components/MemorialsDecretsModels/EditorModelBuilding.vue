<template>
    <div class="q-pa-md">
        <div class="content-editor" id="content-editor">
            
            <q-editor
              ref="editor_ref"
              v-model="text"
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
            </q-editor>
          </div>  
    </div>
</template>
<script>
import {mapActions,mapMutations,mapState } from 'vuex'
export default {
    name:'EditorModelBuilding',
    data(){
        return{           
        }
    },
    methods:{
        ...mapMutations("memorials_decrets", [
      "ReloadListMemorials",
      "ReloadMemorialProperties",
      "ChangeNextPage",
      "ClearData",
      "AddTagInToDocumentText",
      "ChangeModelWithTag"
    ]),
    ...mapActions("memorials_decrets", ['CreateMemorialNewDocument']),
    Goback(){
        this.ChangeModelWithTag(false)
    },
     GetModelTextToSave(){     
     },    
    },
    computed:{
        ...mapState("memorials_decrets", [
      "memorials_list",
      "memorial_properties",
      "memorial_text_doc",
      'memorial_model_to_join'
    ]),
    ...mapState("tags_info",['tag_selected']),
    text :{
         get: function() {
        return this.$store.state.memorials_decrets.memorial_model_to_join;
      },
      set: function(newTitle) {
        this.$store.commit("memorials_decrets/WritingDocumentTextToJoinModel", newTitle);
      }
    }
    },
    mounted(){
      this.GetModelTextToSave();
    },
    created(){}
}
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