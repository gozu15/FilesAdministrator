<template>
    <div class="q-pa-md">
        <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="fas fa-exclamation-circle" color="red" text-color="white" />          
          <span class="q-ml-sm">¿Estas seguro de borrar el documento?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="red" @click="ClosePopup" />
          <q-btn flat label="Borrar Libro" color="primary" @click="DeleteMemorialSelected" />
        </q-card-actions>
      </q-card>
    </div>
</template>
<script>
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
    name:'DeleteMemorial',
    data(){
        return{}
    },
    methods:{
        
        ...mapActions('memorials_decrets',['OpenDialogDelete',
        'CloseDialogDelete',
        'DeleteMemorial',
        "GetMemorialsFromApiAcusations",
        "GetMemorialsFromApiMemorials",
        "GetMemorialsFromApiResolutions",
        "GetMemorialsFromApiDecrets",
        "GetMemorialsFromApiAutos",
        "GetMemorialsFromApiSentence",
        "GetModelsMemorials"]),
        ...mapMutations('memorials_decrets',['ClearData']),
        DeleteMemorialSelected(){           
              this.DeleteMemorial(this.memorial_properties)
              .then(response =>{
                  console.log("DATA",response)        
                  if(response.type_document == "ModelDocument"){
                        console.log("entro");
                        this.ClearData();
                        this.GetModelsMemorials()
                        .then(()=>{
                            this.ClosePopup();
                        })
                    }          
                    if(response.type_document == "Memorial"){
                        console.log("entro");
                        this.ClearData();
                        this.GetMemorialsFromApiMemorials()
                        .then(()=>{
                            this.ClosePopup();
                        })
                    }
                    if(response.type_document == "Acusations"){
                        this.ClearData();
                        this.GetMemorialsFromApiAcusations()
                        .then(()=>{
                        this.ClosePopup()
                         })
                    }
                    if(response.type_document == "Resolutions"){
                        this.ClearData();
                        this.GetMemorialsFromApiResolutions()
                        .then(()=>{
                            this.ClosePopup();
                        })
                    }
                    if(response.type_document == "Decreto"){
                        this.ClearData();
                        this.GetMemorialsFromApiDecrets()
                        .then(()=>{
                            this.ClosePopup();
                        })
                    }
                    if(response.type_document == "Autos"){
                        this.ClearData();
                        this.GetMemorialsFromApiAutos()
                        .then(()=>{
                            this.ClosePopup();
                        })
                    }
                    if(response.type_document == "Sentence"){
                        this.ClearData();
                        this.GetMemorialsFromApiSentence()
                        .then(()=>{
                            this.ClosePopup();
                        })
                    }            
              })
              .catch(err =>{
                  
              })
        },
        ClosePopup(){
            this.CloseDialogDelete();
        }
    },
    computed:{
        ...mapState('memorials_decrets',['memorial_properties'])
    }
}
</script>