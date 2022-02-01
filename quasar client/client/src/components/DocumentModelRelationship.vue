<template>
  <div class="q-pa-md">
    <div class="row">
      <div
        v-for="(caratula, index) in caratulasData"
        :key="index"
        class="col-xs-12 col-sm-6 col-md-4"
      >
        <q-card class="my-card">
          <q-card-section>
            <q-editor
              v-model="caratula.texto"
              :dense="$q.screen.lt.md"
              :toolbar="[['viewsource']]"
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
          </q-card-section>
          <q-btn
            color="primary"
            class="full-width"
            label="Check Relevant Data"
            @click="getdatacovertoRelasionship(caratula)"
          />
        </q-card>
      </div>
    </div>

    <!-- DIALOG -->
    <div
      v-model="persistent"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="" style="width: 300px">
        <q-card-section>
          <div class="text-h6">DOCUMENTOS A ENLAZAR</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="row">
            <div
              v-for="(document, index) in documentsData"
              :key="index"
              class="col-12"
            >
              <q-card class="my-card">
                <q-card-section>
                  <p style="font-weight: bold">JUZGADO A CARGO:</p>
                  {{ document.relevant_court }}
                  <p style="font-weight: bold">CRIMEN:</p>
                  {{ document.crime }}
                  <div
                    v-for="(imputado, index1) in document.imputados"
                    :key="index1"
                  >
                    <p style="font-weight: bold">IMPUTADOS:</p>
                    {{ imputado }}
                  </div>

                  <div
                    v-for="(imputado, index2) in document.querellantes"
                    :key="index2"
                  >
                    <p style="font-weight: bold">QUERELLANTES</p>
                    ES: {{ imputado }}
                  </div>

                  <div
                    v-for="(imputado, index3) in document.victimas"
                    :key="index3"
                  >
                    <p style="font-weight: bold">VICTIMAS:</p>
                    {{ imputado }}
                  </div>
                  <q-btn
                    color="primary"
                    class="full-width"
                    label="Check Relevant Data"
                    @click="relasionship(document)"
                  />
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>
<script>
export default {
  name: "DocumentModelRelationship",
  data() {
    return {
      caratulas: [],
      documents: [],
      persistent: false,
      querellantes: [],
      victimas: [],
      imputados: [],
      relasionshipData: {},
    };
  },
  methods: {
    getCover() {
      this.$axios
        .get("models_documents")
        .then((result) => {
        
          this.caratulas = result.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getDocuments() {
      this.$axios
        .get("documents/read")
        .then((result) => {
       
          this.documents = result.data;
          this.imputados = result.data.imputados;
          this.querellantes = result.data.querellantes;
          this.victimas = result.data.victimas;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getdatacovertoRelasionship(data) {
      this.persistent = true;
      this.relasionshipData.texto = data;
    },
    relasionship(data) {
      this.relasionshipData.jsondata = data;
      for (let index in this.relasionshipData.jsondata) {
        //this.relasionshipData.jsondata[index]
        this.relasionshipData.texto.replace(
          "" + index,
          this.relasionshipData.jsondata[index]
        );
      }
    },
  },
  computed: {
    caratulasData() {
      return this.caratulas;
    },
    documentsData() {
      return this.documents;
    },
  },
  mounted() {
    this.getCover();
    this.getDocuments();
  },
};
</script>
<style scoped>
.my-card {
  margin: 10px !important;
  font-weight: bold;
}
</style>
