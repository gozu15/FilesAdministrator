<template>
    <div class="q-pa-md">
         <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="library_properties.name"
        label="Escribe el nombre del libro*"
        hint="Ingrese un dato"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Porfavor ingresa un dato valido']"
      />

      <q-input
         filled
        v-model="library_properties.description"
        label="Escribe una descripcion para el libro"
        hint="Ingrese un dato"        
      />

      <q-file color="teal" filled v-model="model" label="Seleccione un archivo">
        <template v-slot:prepend>
          <q-icon name="cloud_upload" />
        </template>
      </q-file>     

      <div class="btn-content">         
          <q-page-sticky position="bottom-right" :offset="[18, 122]">
            <q-btn type="submit" fab icon="fas fa-save" color="blue" padding="10px" />
          </q-page-sticky>
          <q-page-sticky position="bottom-right" :offset="[18, 70]">
            <q-btn  @click="ClearPropertiesBook" fab icon="fas fa-snowplow" color="green" padding="10px" />
          </q-page-sticky>
          <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn type="reset" fab icon="fas fa-times" color="red" padding="10px" />
          </q-page-sticky>
        <!-- <q-btn label="Guardar" type="submit" color="primary"/>
        <q-btn label="Limpiar" @click="ClearPropertiesBook" color="primary"/>
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
            library_properties:{
                name:null,
                description:null,
                pdf_properties:null
            },
            model:null
        }
    },
    methods:{
        ...mapMutations('library',[]),
        ...mapActions('library',['CreateandUploadPdf','GetAllPDFs']),
        async onSubmit(){
            if(this.model != null){               
                this.library_properties.pdf_properties = this.model;   
                await this.CreateandUploadPdf(this.library_properties);                
                this.onReset();
            }
            
        },
        ClearPropertiesBook(){
          for (const key in this.library_properties) {
            this.library_properties[key] = null
          }
          this.model= null;
        },
        onReset(){
          this.ClearPropertiesBook();
            this.$router.replace({
                name:'LibraryLawsList'
            })
        }
    },
    computed:{
        ...mapState('library',[])
    }
}
</script>
<style scoped>
.btn-content .q-btn{
  margin-right: 10px;
}
</style>