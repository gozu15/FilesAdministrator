<template>
    <div class="q-pa-md">
          <q-form
      @submit="OnSubmit"
      @reset="OnReset"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="name_writing"
        label="Escribe el nombre del libro*"
        hint="Ingrese un dato"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Porfavor ingresa un dato valido']"
      />

      <q-input
         filled
        v-model="description_writing"
        label="Escribe una descripcion para el libro"
        hint="Ingrese un dato"        
      />     

      <div>
        
          <q-page-sticky position="bottom-right" :offset="[18, 122]">
            <q-btn type="submit" fab icon="fas fa-save" color="blue" padding="10px" />
          </q-page-sticky>         
          <q-page-sticky position="bottom-right" :offset="[18, 70]">
            <q-btn type="reset" fab icon="fas fa-times" color="red" padding="10px" />
          </q-page-sticky>
        <!-- <q-btn label="Guardar" type="submit" color="primary"/>
        <q-btn label="Cancelar" type="reset" color="red" flat class="q-ml-sm" /> -->
      </div>
    </q-form>
    </div>
</template>
<script>
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
    data(){
        return{
              
        }
    },
    methods:{
         ...mapMutations('library',[]),
        ...mapActions('library',['UpdatePDFSelected']),
        OnSubmit(){         
            this.UpdatePDFSelected(this.properties_bookpdf);
            this.onReset();
        },
        OnReset(){
            this.$router.replace({
                name:'LibraryLawsList'
            })
        }
    },
    computed:{
         ...mapState('library',['properties_bookpdf','GetNamePropertie','GetDescriptionPropertie']),
      name_writing: {
      get: function() {
        return this.$store.state.library.properties_bookpdf.name;
      },
      set: function(newTitle) {
        
        this.$store.commit("library/GetNamePropertie", newTitle);        
      }
      },
       description_writing: {
      get: function() {
        return this.$store.state.library.properties_bookpdf.description;
      },
      set: function(newTitle) {
        
        this.$store.commit("library/GetDescriptionPropertie", newTitle);        
      }
    },
    },
    mounted(){},
    created(){}
}
</script>