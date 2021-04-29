<template>
    <div class="q-pa-md">
        
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
    </div>
</template>
<script>
import {mapState,mapActions,mapMutations} from 'vuex';
export default {
    name:"UpdateCoverInformation",
    data(){
        return{
            disable:true,
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
        }
    },
    methods:{
        ...mapMutations('upload_image',['getDataCoverImage','clearCoverInformation']),
        ...mapActions('upload_image',[]),
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
     BreakAndBuildToSaveInArray(string,criteryToBreak){
      string = ""+string;
      let newstring = string.split(criteryToBreak);      
      return newstring;
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
    },
    computed:{
        ...mapState('upload_image',['cover_image_information'])
    },
    created(){}
}
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