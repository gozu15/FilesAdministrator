<template>
  <div class="col">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <div class="q-pa-sm">
        <div class="row q-pa-sm">
          <div class="col-6">Codigo nurek:{{ code_document }}</div>
          <div class="col-6">
            <q-input
              filled
              v-model="dataaux.code_document"
              label="Codigo Nurek"
              @keydown.enter.prevent="submitArrays()"
            />
          </div>
        </div>
        <div class="row q-pa-sm">
          <div class="col-6">Crimen:{{ crime }}</div>
          <div class="col-6">
            <q-input
              filled
              v-model="dataaux.code_document"
              label="Codigo Nurek"
              @keydown.enter.prevent="submitArrays()"
            />
          </div>
        </div>
        <div class="row q-pa-sm">
          <div class="col-6">Fecha de ingreso:{{ date_admission }}</div>
          <div class="col-6">
            <q-input
              filled
              v-model="dataaux.code_document"
              label="Codigo Nurek"
              @keydown.enter.prevent="submitArrays()"
            />
          </div>
        </div>
        <div class="row q-pa-sm">
          <div class="col-6">Hora de ingreso:{{ hours_admission }}</div>
          <div class="col-6">
            <q-input
              filled
              v-model="dataaux.code_document"
              label="Codigo Nurek"
              @keydown.enter.prevent="submitArrays()"
            />
          </div>
        </div>
        <div class="row q-pa-sm">
          <div class="col-6">Tipo de proceso:{{ process_type }}</div>
          <div class="col-6">
            <q-input
              filled
              v-model="dataaux.code_document"
              label="Codigo Nurek"
              @keydown.enter.prevent="submitArrays()"
            />
          </div>
        </div>
        <div class="row q-pa-sm">
          <div class="col-6">Juzgado a cargo:{{ relevant_court }}</div>
          <div class="col-6">
            <q-input
              filled
              v-model="dataaux.code_document"
              label="Codigo Nurek"
              @keydown.enter.prevent="submitArrays()"
            />
          </div>
        </div>
        <div class="row q-pa-sm">
          <div class="col-6">Imputados:{{ code_document }}</div>
          <div class="col-6">
            <q-input
              filled
              v-model="dataaux.code_document"
              label="Codigo Nurek"
              @keydown.enter.prevent="submitArrays()"
            />
          </div>
        </div>

        <div class="row q-pa-sm">
          <div class="col-6">Querellantes:{{ code_document }}</div>
          <div class="col-6">
            <q-input
              filled
              v-model="dataaux.code_document"
              label="Codigo Nurek"
              @keydown.enter.prevent="submitArrays()"
            />
          </div>
        </div>

        <div class="row q-pa-sm">
          <div class="col-6">Victimas:{{ code_document }}</div>
          <div class="col-6">
            <q-input
              filled
              v-model="dataaux.code_document"
              label="Codigo Nurek"
              @keydown.enter.prevent="submitArrays()"
            />
          </div>
        </div>
      </div>
      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>

    <div class="row">
      <q-btn
        color="primary"
        @click="alert = true"
        label="Verificar y guardar"
        style="height: 56px"
        class="full-width"
      />
    </div>
    <!-- DIALOG -->

    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Informacion de la caratula a guardar</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-card>
            <q-card-section class="row items-center">
              <div class="row">
                <div class="col-12">
                  <div class="row justify-between" style="text-align: left">
                    <div>Codigo Nurek:</div>
                    <div>{{ dataaux.code_document }}</div>
                  </div>
                  <div class="row justify-between" style="text-align: left">
                    <div>Crimen:</div>
                    <div>{{ dataaux.crime }}</div>
                  </div>
                  <div class="row justify-between" style="text-align: left">
                    <div>Fecha de ingreso:</div>
                    <div>{{ dataaux.date_admission }}</div>
                  </div>
                  <div class="row justify-between" style="text-align: left">
                    <div>Hora de ingreso</div>
                    <div>{{ dataaux.hours_admission }}</div>
                  </div>
                  <div class="row justify-between" style="text-align: left">
                    <div>Tipo de proceso</div>
                    <div>{{ dataaux.process_type }}</div>
                  </div>
                  <div class="row justify-between" style="text-align: left">
                    <div>Juzgado de turno:</div>
                    <div>
                      {{ dataaux.relevant_court }}
                    </div>
                  </div>
                </div>

                <div class="col-12">
                  Imputados
                  <div>
                    <ul>
                      <li v-for="(element, index) in imputados" :key="index">
                        {{ element }}
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="col-12">
                  Querellantes
                  <div>
                    <ul>
                      <li v-for="(element, index) in querellantes" :key="index">
                        {{ element }}
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="col-12">
                  Victimas
                  <div>
                    <ul>
                      <li v-for="(element, index) in victimas" :key="index">
                        {{ element }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn
                flat
                label="Aceptar y Actualizar"
                @click="updateImageMap()"
                color="primary"
                v-close-popup
              />
              <q-btn flat label="Cancel" color="primary" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div></div>
  </div>
</template>
<script>
export default {
  name: "DataimageContent",
  props: {
    id: {
      type: String,
    },
    code_document: {
      type: String,
    },
    crime: {
      type: String,
    },
    date_admission: {
      type: String,
    },
    hours_admission: {
      type: String,
    },
    imputados: {
      type: Array,
    },
    process_type: {
      type: String,
    },
    querellantes: {
      type: Array,
    },
    relevant_court: {
      type: String,
    },
    victimas: {
      type: Array,
    },
  },
  data() {
    return {
      splitterModel: 50,
      selected: "Crimen",
      confirm: false,
      loading6: false,
      name: null,
      accept: null,
      age: null,
      alert: false,
      dataaux: {
        code_document: null,
        crime: null,
        date_admission: null,
        hours_admission: null,
        imputados: [],
        process_type: null,
        querellantes: [],
        relevant_court: null,
        victimas: [],
      },

      victim: {
        index: null,
        text: null,
      },
      quere: {
        index: null,
        text: null,
      },
      imput: {
        index: null,
        text: null,
      },
      disabledIO: true,
      dense: false,
      test: null,
      simple: [
        {
          label: "Datos obtenidos de la imagen",
          children: [
            {
              label: "Crimen",
              icon: "room_service",
            },
            {
              label: "Tipo de proceso",
              icon: "photo",
            },
            {
              label: "Juzgado a cargo",
              icon: "photo",
            },
            {
              label: "Victimas",
              icon: "photo",
            },
            {
              label: "Querellantes",
              icon: "photo",
            },
            {
              label: "Imputados",
              icon: "photo",
            },
          ],
        },
      ],
    };
  },
  methods: {
    onSubmit() {
      for (let iterator in this.dataaux) {
        if (this.dataaux[iterator] != null) {
          //TODO CAMBIAR ALGORITMO PARA CAMBIO DE DATOS
        }
        console.log(this.dataaux[iterator]);
      }
    },
    enabledBtns() {
      this.disabledIO = false;
    },
    submit() {
      //Setting the variable only when submitted
      this.disabledIO = true;
      console.log();
    },
    onReset() {
      this.name = null;
      this.age = null;
      this.accept = false;
    },
    submitArrays() {
      //Setting the variable only when submitted
      console.log("presionaste enter");
      // if (this.victim.text != null) {
      //   this.victimas[this.victim.index] = this.victim.text;
      //   this.disabledIO = true;
      //   this.victim = {
      //     index: null,
      //     text: null,
      //   };
      //   this.quere = {
      //     index: null,
      //     text: null,
      //   };
      //   this.imput = {
      //     index: null,
      //     text: null,
      //   };
      // }
      // if (this.quere.text != null) {
      //   this.querellantes[this.quere.index] = this.quere.text;
      //   this.disabledIO = true;
      //   this.victim = {
      //     index: null,
      //     text: null,
      //   };
      //   this.quere = {
      //     index: null,
      //     text: null,
      //   };
      //   this.imput = {
      //     index: null,
      //     text: null,
      //   };
      // }
      // if (this.imput.text != null) {
      //   this.imputados[this.imput.index] = this.imput.text;
      //   this.disabledIO = true;
      //   this.victim = {
      //     index: null,
      //     text: null,
      //   };
      //   this.quere = {
      //     index: null,
      //     text: null,
      //   };
      //   this.imput = {
      //     index: null,
      //     text: null,
      //   };
      // }

      // console.log();
    },
    getVictim(index, criterio, texto) {
      this.disabledIO = false;
      if (criterio == "victimas") {
        this.victim = {
          index: index,
          text: texto,
        };
      }
      if (criterio == "querellantes") {
        this.quere = {
          index: index,
          text: texto,
        };
      }
      if (criterio == "imputados") {
        this.imput = {
          index: index,
          text: texto,
        };
      }
      console.log(index, texto);
    },
    updateImageMap() {
      this.$axios
        .put(`documents/update/${this.id}`, this.dataaux)
        .then((result) => {
          console.log("Respuesta actualizar", this.result);
        })
        .catch((err) => {
          console.error(err);
        });
    },

    verifyDataImage() {
      this.confirm = true;
      this.dataaux = {
        code_document: this.code_document,
        crime: this.crime,
        date_admission: this.date_admission,
        hours_admission: this.hours_admission,
        imputados: this.deleteSlotbyIndexinArray(this.imputados),
        process_type: this.process_type,
        querellantes: this.deleteSlotbyIndexinArray(this.querellantes),
        relevant_court: this.relevant_court,
        victimas: this.deleteSlotbyIndexinArray(this.victimas),
      };
    },

    deleteSlotbyIndexinArray(array) {
      for (let i = 0; i < array.length; i++) {
        if (array[i] == "") {
          array.splice(i, 1);
        }
      }
      return array;
    },
  },
};
</script>
