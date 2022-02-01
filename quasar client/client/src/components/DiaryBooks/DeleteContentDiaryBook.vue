<template>
    <div class="q-pa-md">
        <q-card>
            <q-card-section>               
                <div class="text-h6 text-center">
                    <q-btn round flat color="red" icon="fas fa-exclamation-triangle" size="20px"></q-btn>
                    ¿Esta seguro de borrar el dato?
                </div>
            </q-card-section>
            <q-card-section>
                <div class="row justify-end">
                    <q-btn class="q-ml-md" @click="DeleteContent" color="primary" label="Borrar"></q-btn>
                     <q-btn class="q-ml-md" @click="CerrarDialog" color="red" label="Cancelar"></q-btn> 
                </div>                
            </q-card-section>
        </q-card>
    </div>
</template>
<script>
import {mapState,mapActions,mapMutations} from 'vuex'
export default {
    name:'DeleteContentfromDiaryBook',
    data(){
        return{}
    },
    methods:{
        ...mapMutations('diary_books',['OpenCloseDeleteContentBook']),
        ...mapActions('diary_books',['GetDiaryBookById','DeleteContentDiaryBook']),
        DeleteContent(){           
            this.DeleteContentDiaryBook(this.diary_content_selected)
            this.GetDiaryBookById(this.diary_selected)
            this.CerrarDialog()
        },
        CerrarDialog(){
            this.OpenCloseDeleteContentBook(false)
        },
    },
    computed:{
        ...mapState('diary_books',['diary_content_selected','delete_open_content','diary_selected'])
    },
}
</script>