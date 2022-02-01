<template>
  <div class="col-12">
    <div class="row">
      <div class="col-9">
        <div class="q-pa-md q-gutter-sm">
          <q-editor
            v-model="qeditor"
            ref="editor"
            :definitions="{
              save: {
                tip: 'Save your work',
                icon: 'save',
                label: 'Save',
                handler: saveWork,
              },
            }"
            :dense="$q.screen.lt.md"
            :toolbar="[
              ['left', 'center', 'right', 'justify'],
              ['bold', 'italic', 'strike', 'underline'],

              ['print'],
              [
                {
                  label: 'Tamaño de texto',
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
                    'size-7',
                  ],
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
                    'verdana',
                  ],
                },
                'removeFormat',
              ],
              ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

              ['undo', 'redo'],
              ['fullscreen'],
              ['save'],
            ]"
            :fonts="{
              arial: 'Arial',
              arial_black: 'Arial Black',
              comic_sans: 'Comic Sans MS',
              courier_new: 'Courier New',
              impact: 'Impact',
              lucida_grande: 'Lucida Grande',
              times_new_roman: 'Times New Roman',
              verdana: 'Verdana',
            }"
          />
        </div>
      </div>
      <div class="col-3">
        <div v-for="(elements, index) in btns" :key="index" class="btn-content">
          <q-btn
            color="black"
            class="full-width"
            :label="elements.value"
            @click="addElement(elements.id)"
          />
        </div>
      </div>
    </div>
    <div>
      <q-btn color="yellow" label="check html" @click="check()" />
    </div>

    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Ingrese el nombre del modelo</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            dense
            v-model="name"
            autofocus
            @keyup.enter="prompt = false"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Confirmar" v-close-popup @click="createModel()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
export default {
  name: "WisiwigQuasar",
  data() {
    return {
      prompt: false,
      name: null,
      code_document: "EXAMPLE",
      qeditor:
        "<pre>Check out the two different types of dropdowns" +
        ' in each of the "Align" buttons.</pre> ',
      btns: [
        { value: "CODIGO NUREK", id: "code_document" },
        { value: "FECHA DE INGRESO", id: "date_admission" },
        { value: "HORA DE INGRESO", id: "hours_admission" },
        { value: "JUZGADO A CARGO", id: "relevant_court" },
        { value: "CRIMEN", id: "crime" },
        { value: "TIPO DE PROCESO", id: "process_type" },
        { value: "QUERELLANTES", id: "querellantes" },
        { value: "IMPUTADOS", id: "imputados" },
        { value: "VICTIMAS", id: "victimas" },
        { value: "CODIGO DE JUZGADO", id: "court_code" },
      ],
    };
  },
  methods: {
    notify() {
      this.$q.notify({
        message: "Saved your text to local storage",
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
      });
    },
    saveWork() {
      this.prompt = true;
    },
    addElement(txt) {
      //this.qeditor += `&nbsp;<p>{{${txt}}}</p>`;
      const edit = this.$refs.editor;
      edit.caret.restore();
      edit.runCmd("insertHTML", `&nbsp;{{${txt}}}`);    
    },
    createModel() {
      let body = {
        nombre: this.name,
        texto: this.qeditor,
      };          this.$axios
        .post("/models_documents/create", body)
        .then((result) => {
        
        })
        .catch((err) => {
          console.error(err);
        });
    },
    check() {
     
    },
  },
};
</script>
<style scoped>
.btn-content {
  margin: 10px 10px;
}
</style>
