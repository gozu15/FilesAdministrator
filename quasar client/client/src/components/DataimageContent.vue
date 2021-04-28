<template>
  <div class="col">
    
  
       <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <div class="q-pa-sm">
        <div class="row">
          <!-- FIN PRIMERA ENTRADA -->
          <div class="col-4">
            <section>
              <h3>Crimen</h3>
              <p>{{ cover_image_information.crime || 'No se pudo obtener el dato correctamente'}}</p>
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
              <p>{{ cover_image_information.process_type || 'No se pudo obtener el dato correctamente'}}</p>
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
                    {{imputado || 'No se pudo obtener el dato correctamente'}}
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
                    {{querellante || 'No se pudo obtener el dato correctamente'}}
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
                <ul v-if="cover_image_information.victim != null">
                  <li v-for="(victima,index)  in cover_image_information.victim" :key="index">
                    {{victima}}
                  </li>
                </ul>
                <ul v-if="cover_image_information.victim == null">
                  <li>No se pudo obtener los datos correctamente</li>
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

      <q-page-sticky  position="bottom-right" :offset="[18, 173]">
            <q-btn fab icon="fas fa-eye" color="dark" padding="10px" />
          </q-page-sticky>
          <q-page-sticky position="bottom-right" :offset="[18, 122]">
            <q-btn type="submit" fab icon="fas fa-save" color="blue" padding="10px" />
          </q-page-sticky>
          <q-page-sticky position="bottom-right" :offset="[18, 70]">
            <q-btn  @click="enableInputs()" fab icon="fas fa-edit" color="green" padding="10px" />
          </q-page-sticky>
          <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn @click="DeleteImageMap()" fab icon="fas fa-times" color="red" padding="10px" />
          </q-page-sticky>

          <!-- <q-btn color="primary" @click="deleteSlotbyIndexinArray()">
            clickme
          </q-btn> -->
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
                @click="UpdateImageMap()"
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
            id: null,
            url_uploaded: null,
            code_document: null,
            crime: null,
            date_admission: null,
            hours_admission: null,
            appellant: null, //QUERELLANTES
            process_type: null,
            accused: null, //IMPUTADO
            relevant_court: null,
            victim: null, //VICTIMAS
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
        let check_data = this.data[element] != null ? true : false
        if(check_data)
        {                    
          isUpdatable = true;  
        }  
      }
      if(isUpdatable == true){
        this.BuildObjectToUpdateCover();
        this.UpdateImageMap()
        console.log(this.cover_image_information);
      }
      else{
        this.BuildObjectToUpdateCoverInitial();       
        this.UpdateImageMap() 
      }
    },
     onReset() {
      this.data = {
            id:null,
            url_uploaded:null,
            code_document:null,
            crime:null,
            date_admission:null,
            hours_admission:null,
            appellant:null,
            process_type:null,
            accused:null,
            relevant_court:null,
            victim:null,
      };
      this.disable = true;
    },
    enableInputs() {
         this.disable = false;
         this.GetInformationToEdit();
    },
    GetInformationToEdit(){
      this.data = {
            id: this.DeleteEmptyChar(this.cover_image_information.id),
            url_uploaded: this.DeleteEmptyChar(this.cover_image_information.url_uploaded),
            code_document: this.DeleteEmptyChar(this.cover_image_information.code_document),
            crime: this.DeleteEmptyChar(this.cover_image_information.crime),
            date_admission: this.DeleteEmptyChar(this.cover_image_information.date_admission),
            hours_admission: this.DeleteEmptyChar(this.cover_image_information.hours_admission),
            appellant: this.DeleteEmptyChar(this.cover_image_information.appellant), //QUERELLANTES
            process_type: this.DeleteEmptyChar(this.cover_image_information.process_type),
            accused: this.DeleteEmptyChar(this.cover_image_information.accused), //IMPUTADO
            relevant_court: this.DeleteEmptyChar(this.cover_image_information.relevant_court),
            victim: this.DeleteEmptyChar(this.cover_image_information.victim), //VICTIMAS
      };      
    },

    async BuildObjectToUpdateCover(){ 
      let appellant = this.BreakAndBuildToSaveInArray(this.data.appellant,',');
      let accused = this.BreakAndBuildToSaveInArray(this.data.accused,',');
      let victim = this.BreakAndBuildToSaveInArray(this.data.victim,',');     
      this.data.appellant = appellant;
      this.data.accused =accused;
      this.data.victim =victim;      
      this.getDataCoverImage(this.data);
      this.onReset();
    },
    BuildObjectToUpdateCoverInitial(){
      this.getDataCoverImage(this.cover_image_information);
    },
    BreakAndBuildToSaveInArray(string,criteryToBreak){
      string = ""+string;
      let newstring = string.split(criteryToBreak);      
      return newstring;
    },
    enabledBtns() {
      this.disabledIO = false;
    },
    submit() {
      //Setting the variable only when submitted
        //TODO press with enter function
      //this.disabledIO = true;
      console.log();
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
    UpdateImageMap() {
      this.$axios
        .put(`documents/update/${this.cover_image_information.id}`, this.cover_image_information)
        .then(result => {
          console.log("Respuesta actualizar", result);
          this.onReset();
          this.changeStepOne();
          this.clearCoverInformation();
           this.$router.replace({
            name:'UploadImage'
          })
        })
        .catch(err => {
          console.error(err);
        });
    },

    DeleteImageMap(){
      console.log("entro delete")
        this.$axios.delete(`documents/delete/${this.cover_image_information.id}`)
        .then(result => {
          console.log("Respuesta actualizar", result);
          this.onReset();
          this.changeStepOne();
          this.clearCoverInformation();
          this.$router.replace({
            name:'UploadImage'
          })
        })
        .catch(err => {
          console.error(err);
        });
    },


    DeleteEmptyChar(text) {      
      if(typeof text == 'object'){        
         for (let i = 0; i < text.length; i++) {
            let check_text = text[i];          
          if (text[i] == " ") {
            text.splice(i, 1);
          } 
          text[i] = check_text.trim();
          return text;          
      }
      }
      if(typeof text == 'string'){
         text = "" + text;
         let newtext = text.trim();
          console.log(newtext)
          return newtext;
      }
    },
    ...mapMutations('upload_image',['getDataCoverImage',
'changeStepOne',
'changeStepTwo',
'clearCoverInformation'])
  },
  computed:{
    ...mapState('upload_image',['cover_image_information'])
  },
  destroyed(){
    this.onReset();
    this.changeStepOne();
    this.clearCoverInformation();
  }
};
</script>
<style scoped>
h3 {
  font-size: 15px;
  font-family: sans-serif;
  font-weight: bold;
}
section {
   font-size: 0.85em;  
  max-width: 200px;
  white-space: normal;
  color: #555;
  margin-top: 4px;

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
