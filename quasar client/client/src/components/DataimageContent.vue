<template>
  <div class="col">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <div class="q-pa-sm">
        <div class="row">
          <!-- FIN PRIMERA ENTRADA -->
          <div class="col-4">
            <section>
              <h3>Crimen</h3>
              <p>{{ cover_image_information.crime }}</p>
            </section>
          </div>
          <div class="col-8">
            <div class="input-box">
              <q-input
                outlined
                :disable="disable"
                v-model="data.crime"
                label="Ingrese crimen"
                @keydown.enter.prevent="submitArrays()"
              />
            </div>
          </div>
          <!-- FIN SEGUNDA ENTRADA -->

          <div class="col-4">
            <section>
              <h3>Tipo de proceso</h3>
              <p>{{ cover_image_information.process_type }}</p>
            </section>
          </div>
          <div class="col-8">
            <div class="input-box">
              <q-input
                outlined
                :disable="disable"
                v-model="data.process_type"
                label="Ingrese tipo de proceso"
                @keydown.enter.prevent="submitArrays()"
              />
            </div>
          </div>          
          <div class="col-4">
            <section>
              <h3>Imputados</h3>
              <p>
                <ul>
                  <li v-for="(imputado,index)  in cover_image_information.accused" :key="index">
                    {{imputado}}
                  </li>
                </ul>
                <!-- {{ code_document }} -->
                </p>
            </section>
          </div>
          <div class="col-8">
            <div class="input-box">
              <q-input
                outlined
                :disable="disable"
                type="textarea"
                v-model="data.accused"
                hint="Utilice la coma ',' para separar las personas en este apartado"
                label="Ingrese el o los imputado(s)"
                @keydown.enter.prevent="submitArrays()"
              />
            </div>
          </div>
          <!-- FIN SEPTIMA ENTRADA -->
          <div class="col-4">
            <section>
              <h3>Querellantes</h3>
              <p><ul>
                  <li v-for="(querellante,index)  in cover_image_information.appellant" :key="index">
                    {{querellante}}
                  </li>
                </ul></p>
            </section>
          </div>
          <div class="col-8">
            <div class="input-box">
              <q-input
                outlined
                hint="Utilice la coma ',' para separar las personas en este apartado"
                :disable="disable"
                type="textarea"
                v-model="data.appellant"
                label="Ingrese el o los querellante(s)"
                @keydown.enter.prevent="submitArrays()"
              />
            </div>
          </div>
          <!-- FIN OCTAVA ENTRADA -->
          <div class="col-4">
            <section>
              <h3>Victimas</h3>
              <p>
                <ul>
                  <li v-for="(victima,index)  in cover_image_information.victim" :key="index">
                    {{victima}}
                  </li>
                </ul>
                </p>
            </section>
          </div>
          <div class="col-8">
            <div class="input-box">
                <q-input
                outlined
                type="textarea"
                hint="Utilice la coma ',' para separar las personas en este apartado"
                :disable="disable"
                v-model="data.victim"
                label="Ingrese la(s) victima(s)"
                @keydown.enter.prevent="submitArrays()"
              />


            </div>
          </div>
          <!-- FIN NOVENA ENTRADA -->
        </div>
      </div>

        <div class="q-pt-md">
      <q-btn
        @click="enableInputs()"
        color="negative"
        class="full-width"
        label="Modificar campos"
      />
    </div>
    <div class="q-pt-md">
      <q-btn
        @click="enableInputs()"
        color="positive"
        type="reset"
        class="full-width"
        label="Cancelar"
      />
    </div>

    <div class="row">
      <q-btn
        color="primary"

        label="Verificar y guardar"
        type="submit"
        style="height: 56px"
        class="full-width"
      />
      <!-- @click="alert = true" -->
    </div>

    </q-form>



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
                    <div>{{ data.code_document }}</div>
                  </div>
                  <div class="row justify-between" style="text-align: left">
                    <div>Crimen:</div>
                    <div>{{ data.crime }}</div>
                  </div>
                  <div class="row justify-between" style="text-align: left">
                    <div>Fecha de ingreso:</div>
                    <div>{{ data.date_admission }}</div>
                  </div>
                  <div class="row justify-between" style="text-align: left">
                    <div>Hora de ingreso</div>
                    <div>{{ data.hours_admission }}</div>
                  </div>
                  <div class="row justify-between" style="text-align: left">
                    <div>Tipo de proceso</div>
                    <div>{{ data.process_type }}</div>
                  </div>
                  <div class="row justify-between" style="text-align: left">
                    <div>Juzgado de turno:</div>
                    <div>
                      {{ data.relevant_court }}
                    </div>
                  </div>
                </div>

                <div class="col-12">
                  Imputados
                  <div>
                    <ul>
                      <li v-for="(element, index) in data.accused" :key="index">
                        {{ element }}
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="col-12">
                  Querellantes
                  <div>
                    <ul>
                      <li v-for="(element, index) in data.appellant" :key="index">
                        {{ element }}
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="col-12">
                  Victimas
                  <div>
                    <ul>
                      <li v-for="(element, index) in data.victim" :key="index">
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
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
  name: "DataimageContent", 
  data() {
    return {
      splitterModel: 50,
      selected: "Crimen",
      confirm: false,
      loading6: false,
      disable: true,
      imputadosaux:"",
      querellantesaux:"",
      victimasaux:"",
      name: null,
      accept: null,
      age: null,
      alert: false,
      data: {
        code_document: null,
        crime: null,
        date_admission: null,
        hours_admission: null,
        appellant: [],
        process_type: null,
        accused: [],
        relevant_court: null,
        victim: []
      },
      dataaux: {
        code_document: null,
        crime: null,
        date_admission: null,
        hours_admission: null,
        imputados: [],
        process_type: null,
        querellantes: [],
        relevant_court: null,
        victimas: []
      },

      victim: {
        index: null,
        text: null
      },
      quere: {
        index: null,
        text: null
      },
      imput: {
        index: null,
        text: null
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
              icon: "room_service"
            },
            {
              label: "Tipo de proceso",
              icon: "photo"
            },
            {
              label: "Juzgado a cargo",
              icon: "photo"
            },
            {
              label: "Victimas",
              icon: "photo"
            },
            {
              label: "Querellantes",
              icon: "photo"
            },
            {
              label: "Imputados",
              icon: "photo"
            }
          ]
        }
      ]
    };
  },
  methods: {
    onSubmit() {
      let isUpdatable = false;
      for (let element in this.data)
      {
        console.log(this.data[element])
        if(this.data[element] == null || this.data[element].length ==0)
        {
          console.log("ENTRO IF")
          isUpdatable = 1;
          break;
        }
        console.log(element);
      }
      if(isUpdatable == 1){
        console.log("IF")
        this.buildObject();
      }
      else{
        //let quere = this.querellantesaux.split(",");
        //this.data.querellantes = quere;
        //let other = this.querellantesaux.split(",");
        console.log("THIS IS ELSE ",this.data.querellantes)
      }


      //if()
      //this.buildObject()

    },
     onReset() {
      this.name = null;
      this.age = null;
      this.accept = false;
    },
    enableInputs() {
         this.disable = false;
         this.buildObject();
    },
    buildObject(){

      this.imputadosaux=this.imputados;
        this.querellantesaux=this.querellantes;
        this.victimasaux=this.victimas;
      this.data = {
        code_document: this.code_document,
        crime: this.crime,
        date_admission: this.date_admission,
        hours_admission: this.hours_admission,
        imputados: this.imputadosaux,
        process_type: this.process_type,
        querellantes: this.querellantesaux,
        relevant_court: this.relevant_court,
        victimas: this.victimasaux
      };
    },
    enabledBtns() {
      this.disabledIO = false;
    },
    submit() {
      //Setting the variable only when submitted

      //this.disabledIO = true;
      console.log();
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
          text: texto
        };
      }
      if (criterio == "querellantes") {
        this.quere = {
          index: index,
          text: texto
        };
      }
      if (criterio == "imputados") {
        this.imput = {
          index: index,
          text: texto
        };
      }
      console.log(index, texto);
    },
    updateImageMap() {
      this.$axios
        .put(`documents/update/${this.id}`, this.dataaux)
        .then(result => {
          console.log("Respuesta actualizar", this.result);
        })
        .catch(err => {
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
        victimas: this.deleteSlotbyIndexinArray(this.victimas)
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
    ...mapMutations('upload_image',['getDataCoverImage',
'changeStepOne',
'changeStepTwo',])
  },
  computed:{
    ...mapState('upload_image',['cover_image_information'])
  },
};
</script>
<style scoped>
h3 {
  font-size: 15px;
  font-family: sans-serif;
  font-weight: bold;
}
section {
  font-family: sans-serif;
}
.input-box {
  height: 100%;
  display: flex;
  width: 100%;
}
.input-box .q-field {
  width: 100% !important;
}
</style>
