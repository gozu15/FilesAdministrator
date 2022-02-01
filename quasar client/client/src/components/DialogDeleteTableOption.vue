<template>
    <div class="q-pa-md">         
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="fas fa-exclamation-circle" color="red" text-color="white" />
          <span class="q-ml-sm">¿Esta seguro de querer borrar el dato?</span>
        </q-card-section>

        <q-card-actions align="right">          
          <q-btn flat label="Borrar dato" color="primary" @click="DeleteCoverImageSelected()" v-close-popup />
          <q-btn  flat label="Cancelar" color="red" v-close-popup />
        </q-card-actions>
      </q-card>    
    </div>  
</template>
<script>
import {mapMutations,
mapState,mapActions} from 'vuex'
export default {
    name:"DialogDelete",   
    data(){
        return {

        }
    },
    methods:{
        ...mapMutations('upload_image',['getId']),
        ...mapActions('upload_image',['GetDataFromApi']),
        DeleteCoverImageSelected(){            
            this.$axios.delete(`documents/delete/${this.id_cover}`)
            .then(response =>{
              
                this.GetDataFromApi();
            })
            .catch(err =>{
                console.error(err);
            })
    }
        },
    computed:{
        ...mapState('upload_image',['id_cover','cover_list']),
        },
    created(){

    }
}
</script>