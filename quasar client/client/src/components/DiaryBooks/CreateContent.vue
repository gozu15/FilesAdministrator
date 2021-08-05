<template>
  <div class="q-pa-md">
    <q-page-container>
      <q-page>
          <div class="text-h6 text-center" style="text-decoration: underline black;">
              REGISTRO DE CONTENIDO PARA EL LIBRO
          </div>
          <div style="font-size:14px;">
              En cuenta: Los campos con un '*' en la parte superior deben ser llenados obligatoriamente
          </div>
        <q-form @submit="OnSubmit" @reset="OnReset">
          <div class="q-ma-md" style="font-size:15px;">
            Seleccione la fecha de entrada *:
            <div class="q-gutter-md row items-start">
              <q-date v-model="date" mask="YYYY-MM-DD HH:mm" color="purple" />
              <q-time v-model="date" mask="YYYY-MM-DD HH:mm" color="purple" />
            </div>
          </div>
          <div class="q-ma-md" style="font-size:15px;">
            Seleccione la fecha de salida *:
            <div class="q-gutter-md row items-start">
              <q-date v-model="date" mask="YYYY-MM-DD HH:mm" color="purple" />
              <q-time v-model="date" mask="YYYY-MM-DD HH:mm" color="purple" />
            </div>
          </div>

          <q-input
            filled
            type="textarea"
            v-model="accused"
            label="Ingresa los acusados *"
            hint="registre acusados separandolos por comas"
            lazy-rules
            :rules="[
              val =>
                (val && val.length > 0) || 'Porfavor ingresa un dato valido'
            ]"
          />

          <q-input
            filled
            type="textarea"
            v-model="victim"
            label="Ingresa la(s) victima(s) *"
            hint="ingrese las victimas separandolos por comas"
            lazy-rules
            :rules="[
              val =>
                (val && val.length > 0) || 'Porfavor ingresa un dato valido'
            ]"
          />

          <q-input
            filled
            type="textarea"
            v-model="appellant"
            label="Ingrese lo(s) querellante(s) *"
            hint="Ingrese querellantes del caso, separandolos por comas"
            lazy-rules
            :rules="[
              val =>
                (val && val.length > 0) || 'Porfavor ingresa un dato valido'
            ]"
          />

          <q-input
            filled
            v-model="diary_book_properties.fojas_number"
            label="Ingresa numero de fojas*"
            hint="ingrese cantidad de las fojas del documento"
            lazy-rules
            :rules="[
              val =>
                (val && val.length > 0) || 'Porfavor ingresa un dato valido'
            ]"
          />

          <q-input
            filled
            v-model="diary_book_properties.detail_sum"
            label="Ingrese los detalles o suma *"
            hint="Ingrese un detalle o suma valida"
            lazy-rules
            :rules="[
              val =>
                (val && val.length > 0) || 'Porfavor ingresa un dato valido'
            ]"
          />

          <q-input
            filled
            v-model="diary_book_properties.nurek_number"
            label="Ingrese el numero Nurej del documento*"
            hint="Condigo Nurej es necesario para el registro"
            lazy-rules
            :rules="[
              val =>
                (val && val.length > 0) || 'Porfavor ingresa un dato valido'
            ]"
          />                

        <q-page-sticky position="bottom-right" :offset="[18, 130]">
          <q-btn
            round
            size="18px"
            color="primary"
            icon="save"
            direction="left"
            type="submit"
          >
          </q-btn>
        </q-page-sticky>
        <q-page-sticky position="bottom-right" :offset="[18, 70]">
          <q-btn
            round
            size="18px"
            color="red"
            icon="fas fa-times-circle"
            direction="left"
            type="reset"
          >
          </q-btn>
        </q-page-sticky>
        </q-form>
      </q-page>
    </q-page-container>
  </div>
</template>
<script>
let year = new Date().getUTCFullYear();
let month = new Date().getUTCMonth() + 1;
month = month < 10 ? "0" + month : month;
let day = new Date().getUTCDate();
let hour = new Date().getUTCHours() - 4;
hour = hour >= 10 ? hour : "0" + hour;
let min = new Date().getUTCMinutes();
min = min >= 10 ? min : "0" + min;
let newDateFull = year + "-" + month + "-" + day + " " + hour + ":" + min;
console.log(newDateFull);
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      diary_book_properties: {
        id_diary_book: null,
        entry_date: null,
        departure_date: null,
        accused: [],
        victim: [],
        appellant: [],
        fojas_number: null,
        detail_sum: null,
        nurek_number: null
      },
      accused: null,
      victim: null,
      appellant: null,
      date: newDateFull
    };
  },
  methods: {
    ...mapActions("diary_books", [
      "CreateDiaryBook",
      "GetListDiaryBooks",
      "CreateContentToDiaryBook",
      "GetDiaryBookById"
    ]),
    ...mapMutations("diary_books", []),
    OnSubmit() {
      let id = this.diary_selected.id || this.diary_selected._id;
      this.diary_book_properties.id_diary_book = id;
      let newaccused = this.accused.split(",");
      let newvictim = this.victim.split(",");
      let newappellant = this.appellant.split(",");
      this.diary_book_properties.accused = newaccused;
      this.diary_book_properties.victim = newvictim;
      this.diary_book_properties.appellant = newappellant;
      let dateinit = new Date(this.date);
      let dateend = new Date(this.date);
      this.diary_book_properties.entry_date = dateinit;
      this.diary_book_properties.departure_date = dateend;
      console.log("diary selected", this.diary_selected);
      console.log("diary properties", this.diary_book_properties);
      this.CreateContentToDiaryBook(this.diary_book_properties)
        .then(response => {
          console.log(response);
          this.GetDiaryBookById(this.diary_book_properties);
          this.OnReset();
        })
        .catch(err => {
          console.log(err);
        });
    },
    OnReset() {
      this.$router.replace({
        name: "GetContentDiarybook"
      });
    }
  },
  computed: {
    ...mapState("diary_books", ["diary_selected"])
  }
};
</script>
