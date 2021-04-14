<template>
  <div class="q-pa-md">
    <q-card style="width: 90%; margin: auto">
      <div class="q-pa-sm">
        <!-- BTN CLOSE INIT -->

        <!--FORM TEXTFILE INIT -->
        <div class="row">
          <div class="col-11">
            <q-file
              v-model="files"
              label="Seleccione un archivo a subir, luego precione el boton ->"
              filled
              counter
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
        </div>
        <!-- IMAGEN TAG INIT -->
        <div class="img-content">
          <img
            v-if="image == null"
            src="../../../public/image/No-image-found-1.jpg"
          />
          <img v-if="image != null" :src="imageUploaded" />
        </div>
        <!-- BOTOM GET DATA IMAGE -->
        <div class="btn-content">
          <div class="row">
            <div class="col">
              <q-btn
                color="primary"
                @click="OCRGoogleService()"
                label="Obtener datos de la imagen"
                style="height: 56px"
                class="full-width"
              />
            </div>
          </div>
        </div>
        <!-- transition="transition" -->
        <!-- IMAGE DATA  -->
        <div class="dataimage-content">
          <div class="row">
            <div class="col">
              <DataimageContent v-bind="dtlink" />
            </div>
          </div>
        </div>
      </div>
    </q-card>
  </div>
</template>
<script>
import DataimageContent from "../../components/DataimageContent";
export default {
  components: { DataimageContent },
  data() {
    return {
      image: null,
      files: null,
      dtlink: null,
      id: null,
      dataImage: {
        id: null,
        code_document: null,
        crime: null,
        date_admission: null,
        hours_admission: null,
        imputados: null,
        process_type: null,
        querellantes: null,
        relevant_court: null,
        victimas: null,
      },
    };
  },
  methods: {
    NotifyError(message) {
      this.$q.notify({
        color: "red-5",
        textColor: "white",
        icon: "warning",
        message: message,
      });
    },
    NotifySucces(message) {
      this.$q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        message: message,
      });
    },
    OCRGoogleService() {
      if (this.image == null) {
        this.NotifyError("Escoja una imagen antes de evaluar");
      } else {
        this.$axios
          .post(`documents/takeImage/${this.urlImage.url_uploaded}`)
          .then((response) => {
            console.log("soy datos imagen", response);
            this.dataImage = {
              id: this.id,
              code_document: response.data.object.code_document,
              crime: response.data.object.crime,
              date_admission: response.data.object.date_admission,
              hours_admission: response.data.object.hours_admission,
              imputados: response.data.object.imputados,
              process_type: response.data.object.process_type,
              querellantes: response.data.object.querellantes,
              relevant_court: response.data.object.relevant_court,
              victimas: response.data.object.victimas,
            };
            this.dtlink = this.dataImage;
            console.log("SOY DATA IMG", this.dataImage);
          })
          .catch((err) => {
            console.log("ocurrio un error", err);
          });
      }
    },
    uploadImage() {
      console.log(this.files);
      if (this.file != null || this.files != undefined) {
        const file = this.files[0];
        const formData = new FormData();
        formData.append("file", file);
        this.$axios
          .post("documents/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log("this is image", response);
            this.image = response.data.image;
            this.urlImage = response.data.data;
            this.id = response.data.data._id;

            //this.OCRGoogleService(response.data.data.url_uploaded);
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        console.log("NO EXISTEN DATOS");
      }
    },
  },
  computed: {
    imageUploaded() {
      return this.image;
    },
  },
  created() {},
};
</script>
<style scoped>
.img-content {
  width: 100%;
  text-align: center;
}
.img-content img {
  width: 70%;
  /* height: 400px; */
  background-size: 100% 100%;
  display: block;
  margin: auto;
}
</style>
