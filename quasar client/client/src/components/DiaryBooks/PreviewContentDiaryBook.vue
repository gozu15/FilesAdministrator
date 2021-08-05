<template>
    <div class="q-pa-md">
        <q-page-container>
            <q-page>
        <div class="row">
             <div class="col-3 q-ma-sm">
                <q-input v-model="diary_content_selected.entry_date" hint="Fecha de ingreso" disable />
            </div>
             <div class="col-3 q-ma-sm">
                <q-input v-model="diary_content_selected.departure_date" hint="Fecha de salida" disable />
            </div>
             <div class="col-3 q-ma-sm">
                <q-input v-model="diary_content_selected.detail_sum" hint="Detalles o Suma" disable />
            </div>
            <div class="col-3 q-ma-sm">
                <q-input type="textarea" v-model="diary_content_selected.accused" hint="Acusados" disable />
            </div>
            <div class="col-3 q-ma-sm">
                <q-input type="textarea" v-model="diary_content_selected.victim" hint="Victimas" disable />
            </div>
            <div class="col-3 q-ma-sm">
                <q-input type="textarea" v-model="diary_content_selected.appellant" hint="Apelantes" disable />
            </div>           
            <div class="col-3 q-ma-sm">
                <q-input v-model="diary_content_selected.fojas_number" hint="Numero de fojas" disable />
            </div>
            <div class="col-3 q-ma-sm">
                <q-input v-model="diary_content_selected.nurek_number" hint="Codigo Nurek" disable />
            </div>
        </div>        
        <q-page-sticky position="bottom-right" :offset="[18, 70]">
          <q-btn
            round
            size="18px"
            color="red"
            icon="fas fa-times-circle"
            direction="left"
            @click="GoBack"
          >
          </q-btn>
        </q-page-sticky>
        </q-page>
    </q-page-container>
    </div>
</template>
<script>
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
    data(){
        return{
            text:"This is a text"
        }
    },
    methods:{
        ...mapActions('diary_books',[]),
        ...mapMutations('diary_books',[]),
        GoBack(){
            this.$router.replace({
                name:'GetContentDiarybook'
            })
        }
    },
    computed:{
        ...mapState('diary_books',['diary_content_selected'])
    }
}
</script>