<template>
    <div class="q-pa-md">
        <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="fas fa-exclamation-circle" color="red" text-color="white" />          
          <span class="q-ml-sm">¿Estas seguro de Borrar el libro?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="red" @click="ClosePopup" />
          <q-btn flat label="Borrar Libro" color="primary" @click="DeletePdfSelected" />
        </q-card-actions>
      </q-card>
    </div>
</template>
<script>
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
    name:'DeletePdfSelected',
    data(){
        return{}
    },
    methods:{
        ...mapMutations('library',['OpenCloseDialog']),
        ...mapActions('library',['DeletePDFSelected','GetAllPDFs']),
        DeletePdfSelected(){
            this.DeletePDFSelected(this.properties_bookpdf);
            this.ClosePopup();
            this.GetAllPDFs();
            
        },
        ClosePopup(){
            this.OpenCloseDialog(false);
        }
    },
    computed:{
        ...mapState('library',['properties_bookpdf'])
    }
}
</script>