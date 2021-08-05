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
    name:'DiarybookTable',
    data(){
        return{}
    },
    methods:{
        ...mapMutations('diary_books',['DeleteOpenClose']),
        ...mapActions('diary_books',['DeleteDiaryBook','GetListDiaryBooks']),
        DeletePdfSelected(){
            this.DeleteDiaryBook(this.diary_selected)
            this.GetListDiaryBooks();
            this.DeleteOpenClose(false);
        },
        ClosePopup(){
            this.DeleteOpenClose(false);
        }

    },
    computed:{
        ...mapState('diary_books',['delete_open','diary_selected'])
    },
    
}
</script>