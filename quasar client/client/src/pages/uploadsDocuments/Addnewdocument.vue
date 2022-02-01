<template>
  <div class="q-pa-md">
    <div class="q-pa-sm">
      <div v-if="step_one" class="box-coverimage">
        <div class="row">
          <div class="col-11">
            <q-file
              v-model="files"
              label="Seleccione un archivo a subir, luego precione el boton ->"
              filled
              counter
              accept="image/*"
              multiple
              style="max-width: 100%"
            />
          </div>
          <div class="col-1">
            <q-btn
              color="primary"
              @click="uploadImage()"
              icon="upload"
              style="height: 56px"
            />
          </div>
          <div class="img-content">
            <img
              v-if="image == null"
              src="../../../public/image/No-image-found-1.jpg"
            />
            <img v-if="image != null" :src="imageUploaded" />
          </div>
        </div>
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn @click="DeleteImageMap()" fab icon="fas fa-times" color="red" padding="10px" />
          </q-page-sticky>
      </div>    
      <div v-if="step_two" class="dataimage-content">
        <div class="row">
          <div class="col">
            <DataimageContent />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
import DataimageContent from "../../components/DataimageContent";
export default {
  components: { DataimageContent },
  data() {
    return {
      image: null,
      files: null,
      dtlink: null,
      urlImage:null,
      id: null,
      dataImage: {
        id: null,
        code_document: null,
        crime: null,
        date_admission: null,
        hours_admission: null,
        accused: null,
        process_type: null,
        appellant: null,
        relevant_court: null,
        victim: null
      }
    };
  },
  methods: {
    NotifyError(message) {
      this.$q.notify({
        color: "red-5",
        textColor: "white",
        icon: "warning",
        message: message
      });
    },
    NotifySucces(message) {
      this.$q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        message: message
      });
    },
    OCRGoogleService() {
      if (this.image == null) {
        this.NotifyError("Escoja una imagen antes de evaluar");
      } else {
        this.$axios
          .post(`documents/takeImage/${this.urlImage.url_uploaded}`)
          .then(response => {
            this.dataImage = {        
              id:this.id,       
              url_uploaded:this.urlImage.url_uploaded,
              code_document: response.data.object.code_document,
              crime: response.data.object.crime,
              date_admission: response.data.object.date_admission,
              hours_admission: response.data.object.hours_admission,
              accused: response.data.object.accused,
              process_type: response.data.object.process_type,
              appellant: response.data.object.appellant,
              relevant_court: response.data.object.relevant_court,
              victim: response.data.object.victim
            };       
              
             this.getDataCoverImage(this.dataImage);      
             this.changeStepTwo();              
              this.$q.loading.hide()          
            this.NotifySucces("Solicitud concretada")})
          .catch(err => {
            //  this.dataImage = {
            //   id: this.id            
            // };
            this.getDataCoverImage(this.dataImage);
              this.changeStepTwo();
            this.$q.loading.hide()
            this.NotifyError("Error al realizar la operacion")            
          });
      }
    },
    uploadImage() {
      
      if (this.file != null || this.files != undefined) {
        const file = this.files[0];
        const formData = new FormData();
        formData.append("file", file);
        this.$axios
          .post("documents/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
          .then(async response => {
            
            this.image = await response.data.image;
            this.urlImage = await response.data.data;
            this.id = await response.data.data._id;
            this.OCRGoogleService();
            this.$q.loading.show()
          })
          .catch(err => {
            console.error(err);
          });
      } else {
        
      }
    },
    DeleteImageMap(){
            this.$router.replace({
                name:'UploadImage'
            })
        },

    ...mapMutations("upload_image", ['getDataCoverImage',"changeStepOne",
"changeStepTwo",]),
...mapActions("upload_image",['CreateCoverDocument'])
  },
  computed: {
    ...mapState("upload_image", [
      "step_one",
      "step_two",
      "cover_image_information"
    ]),
    imageUploaded() {
      return this.image;
    }
  },
  created() {}
};
</script>
<style scoped>
.img-content {
  width: 100%;
  text-align: center;
}
.img-content img {
  width: 95%;
  height: 100%;
  background-size: 100% 100%;
  display: block;
  margin: auto;
}
.box-coverimage{
  width: 60%;  
  margin: auto;
}

@media screen and (max-width:760px){
    .box-coverimage{
      width: 80%;
      margin: auto;
    }
}
</style>
