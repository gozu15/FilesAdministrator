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

          <!-- FECHA DE INGRESO -->
          <div class="col-4">
            <section>
              <h3>Fecha de ingreso</h3>
              <p>{{ cover_image_information.date_admission || 'No se pudo obtener el dato correctamente'}}</p>
            </section>
          </div>
          <div class="col-8">           
              <div class="q-gutter-md row items-start">
                <q-input v-model="data.date_admission" filled type="date" hint="Fecha de ingreso del documento" :disable="disable"/>    
                <!-- <q-btn flat color="primary" label="clickme" @click="check"></q-btn>          -->
              </div>
          </div>    
          <!-- FECHA END -->

          <!-- HORA DE INGRESO -->
           <div class="col-4">
            <section>
              <h3>Hora de ingreso</h3>
              <p>{{ cover_image_information.hours_admission || 'No se pudo obtener el dato correctamente'}}</p>
            </section>
          </div>
          <div class="col-8">
            <div class="q-gutter-md row items-start">            
              <q-input v-model="data.hours_admission" filled type="time" hint="Hora de ingreso" :disable="disable"/>    
            </div>
          </div>    
          <!-- HORA DE INGRESO END -->

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
            <q-btn @click="PreviewImage()" fab icon="fas fa-eye" color="dark" padding="10px" />
          </q-page-sticky>
          <q-page-sticky position="bottom-right" :offset="[18, 122]">
            <q-btn type="submit" fab icon="fas fa-save" color="blue" padding="10px" />
          </q-page-sticky>
          <q-page-sticky position="bottom-right" :offset="[18, 70]">
            <q-btn  @click="enableInputs()" fab icon="fas fa-edit" color="green" padding="10px" />
          </q-page-sticky>
          <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn @click="CancelUpdate()" fab icon="fas fa-times" color="red" padding="10px" />
          </q-page-sticky>

          <!-- <q-btn color="primary" @click="deleteSlotbyIndexinArray()">
            clickme
          </q-btn> -->
    </q-form>

    <!-- DIALOG TO PREVIEW IMAGE COVER -->
    <q-dialog v-model="onImage">
      <div class="q-pa-md image-cover-background" >
        <img :src="image_cover" alt="Imagen del documento">
      </div>
    </q-dialog>
    </div>
</template>
<script>
import {mapState,mapActions,mapMutations} from 'vuex';
export default {
    name:"UpdateCoverInformation",
    data(){
        return{
          onImage:false,
          image_cover:null,
          model1:'01:51 PM',
          date:'2019/02/01',
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
        ...mapMutations('upload_image',['getDataCoverImage','clearCoverInformation','changeStepOne',
        'changeStepTwo']),
        ...mapActions('upload_image',[]),
    onSubmit() {
      let isUpdatable = false;
      for (let element in this.data)
      {       
        let check_data = this.data[element] != null ? true : false
        if(check_data)
        {                    
          isUpdatable = true;  
        }  
      }
      if(isUpdatable == true){       
        this.BuildObjectToUpdateCover();
        this.UpdateImageMap()
        
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
     BuildObjectToUpdateCoverInitial(){
      this.getDataCoverImage(this.cover_image_information);
    },
     BreakAndBuildToSaveInArray(string,criteryToBreak){      
      string = ""+string;
      let newstring
      if(string != null && criteryToBreak != null){
        newstring = string.split(criteryToBreak);
      }
      else{
        newstring = [];
      }
            
      return newstring;
    },
    enableInputs(){
      this.GetInformationToEdit();
      this.disable = false;
    },
    GetInformationToEdit(){
       let baddate = this.DeleteEmptyChar(this.cover_image_information.date_admission)
      baddate = baddate.split('/');
      let rebuilddate= baddate[2]+"-"+baddate[1]+"-"+baddate[0]
      let aux= new Date(rebuilddate)
      let year = aux.getFullYear()
      let month = aux.getMonth() +1
      month = (month < 10 ? "0"+month : ""+month)
      let date = aux.getDate() +1
      date = (date < 10 ? "0"+date : ""+date);
      let formatdate = year+"-"+month+"-"+date;      
      this.data = {
            id: this.DeleteEmptyChar(this.cover_image_information.id),
            url_uploaded: this.DeleteEmptyChar(this.cover_image_information.url_uploaded),
            code_document: this.DeleteEmptyChar(this.cover_image_information.code_document),
            crime: this.DeleteEmptyChar(this.cover_image_information.crime),
            date_admission: formatdate,
            hours_admission: this.DeleteEmptyChar(this.cover_image_information.hours_admission),
            appellant: this.DeleteEmptyChar(this.cover_image_information.appellant), //QUERELLANTES
            process_type: this.DeleteEmptyChar(this.cover_image_information.process_type),
            accused: this.DeleteEmptyChar(this.cover_image_information.accused), //IMPUTADO
            relevant_court: this.DeleteEmptyChar(this.cover_image_information.relevant_court),
            victim: this.DeleteEmptyChar(this.cover_image_information.victim), //VICTIMAS
      };      
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
    UpdateImageMap() {
      this.$axios
        .put(`documents/update/${this.cover_image_information.id}`, this.cover_image_information)
        .then(result => {
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

    PreviewImage(){
     
      let image_name= this.cover_image_information.url_uploaded;
       this.$axios.get(`documents/image/${image_name}`)
       .then(response =>{ 
         this.onImage = true;
          this.image_cover = response.data.image;
       })
       .catch(error =>{
         console.log(error);
       })
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
      else{
         if(typeof text == 'string'){
         text = "" + text;
         let newtext = text.trim();         
          return newtext;
      }
      else{        
        return text
      }
      }
     
    },
    CancelUpdate(){     
      this.$router.replace({
                name:'UploadImage'
            })
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
.image-cover-background img{
  width: 90%;
    background-size: 100% 100%;
  display: block;
  margin: auto;
}
</style>