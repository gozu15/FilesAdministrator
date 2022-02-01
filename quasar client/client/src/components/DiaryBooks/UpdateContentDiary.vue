<template>
  <div class="q-pa-md">
    <div>    
          <div class="text-h6 text-center" style="text-decoration: underline black;">
              MODIFICACION DEL CONTENIDO
          </div>
          <div style="font-size:14px;">
              En cuenta: Los campos con un '*' en la parte superior deben ser llenados obligatoriamente
          </div>
        <q-form @submit="OnSubmit" @reset="OnReset">
          <div class="q-ma-md" style="font-size:15px;">
            Seleccione la fecha de entrada *:
            <div class="q-gutter-md row items-start">
              <q-date v-model="getentry_date" mask="YYYY-MM-DD HH:mm" color="purple" />
              <q-time v-model="getentry_date" mask="YYYY-MM-DD HH:mm" color="purple" />
            </div>
          </div>
          <div class="q-ma-md" style="font-size:15px;">
            Seleccione la fecha de salida *:
            <div class="q-gutter-md row items-start">
              <q-date v-model="getdeparture_date" mask="YYYY-MM-DD HH:mm" color="purple" />
              <q-time v-model="getdeparture_date" mask="YYYY-MM-DD HH:mm" color="purple" />
            </div>
          </div>

          <q-input
            filled
            type="textarea"
            v-model="getaccused"
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
            v-model="getvictim"
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
            v-model="getappellant"
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
            v-model="getfojas_number"
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
            v-model="getdetail_sum"
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
            v-model="getnurek_number"
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
      
    </div>
  </div>
</template>
<script>

import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
    
      accused: null,
      victim: null,
      appellant: null,
      
    };
  },
  methods: {
    ...mapActions("diary_books", [
      "CreateDiaryBook",
      "GetListDiaryBooks",
      "CreateContentToDiaryBook",
      "GetDiaryBookById",
      "UpdateContentFromDiaryBook"
    ]),
    ...mapMutations("diary_books", ['ReloadDiaryContentSelected']),
    OnSubmit() {     
      let newaccused = this.diary_content_selected.accused.split(',')      
      let newvictim = this.diary_content_selected.victim.split(',')    
      let newappellant =this.diary_content_selected.appellant.split(',')    

      this.getaccused = newaccused;
      this.getvictim = newvictim;
      this.getappellant = newappellant;
      let dateinit = new Date(this.diary_content_selected.entry_date);
      let dateend = new Date(this.diary_content_selected.departure_date);
      this.getentry_date = dateinit;
      this.getdeparture_date = dateend;
     
     
      this.UpdateContentFromDiaryBook(this.diary_content_selected)
        .then(response => {
          this.GetDiaryBookById(this.diary_selected);
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
      /** id_diary_book: null,
        entry_date: null,
        departure_date: null,
        accused: [],
        victim: [],
        appellant: [],
        fojas_number: null,
        detail_sum: null,
        nurek_number: null */
    ...mapState("diary_books", ["diary_selected","diary_content_selected"]),
    getentry_date:{
        get:function(){
            
            return this.diary_content_selected.entry_date
        },
        set:function (newTitle) {
                this.$store.commit("diary_books/Getentry_date", newTitle);
            }
    },
    getdeparture_date:{
        get:function(){
          
            return this.diary_content_selected.departure_date
        },
        set:function (newTitle) {
                this.$store.commit("diary_books/Getdeparture_date", newTitle);
            }
    },
        getaccused:{
            get:function(){
                    return this.$store.state.diary_books.diary_content_selected.accused;
            },
            set:function(newdata){
                    this.$store.commit("diary_books/Getaccused",newdata)
            }
        },
        getvictim:{
            get:function(){
                return this.$store.state.diary_books.diary_content_selected.victim;
            },
            set:function(newdata){
                this.$store.commit("diary_books/Getvictim",newdata)
            }
        },
        getappellant:{
            get:function(){
                return this.$store.state.diary_books.diary_content_selected.appellant;
            },
            set:function(newdata){
                this.$store.commit("diary_books/Getappellant",newdata)
            }
        },
        getfojas_number:{
            get:function(){
                return this.$store.state.diary_books.diary_content_selected.fojas_number;
            },
            set:function(newdata){
                this.$store.commit("diary_books/Getfojas_number",newdata)
            }
        },
        getdetail_sum:{
            get:function(){
                return this.$store.state.diary_books.diary_content_selected.detail_sum;
            },
            set:function(newdata){
                this.$store.commit("diary_books/Getdetail_sum",newdata)
            }
        },
        getnurek_number:{
            get:function(){
                return this.$store.state.diary_books.diary_content_selected.nurek_number;
            },
            set:function(newdata){
                this.$store.commit("diary_books/Getnurek_number",newdata)
            }
        },
  }
};
</script>