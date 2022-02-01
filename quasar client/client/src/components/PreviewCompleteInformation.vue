<template>
    <div class="q-pa-md">
        <div class="row">
            <div class="col-md-5">
                <div class="row justify-evenly">
                    <q-input v-model="cover_image_information.code_document" hint="Codigo NUREK" :dense="dense" readonly />
                    <q-input v-model="cover_image_information.crime" hint="Crimen" :dense="dense" readonly />
                    <q-input v-model="cover_image_information.process_type" hint="Tipo de proceso" :dense="dense" readonly />
                </div>
                <div class="row justify-evenly">
                    <q-input v-model="cover_image_information.relevant_court" hint="Juzgado a cargo" :dense="dense" readonly />
                <q-input v-model="cover_image_information.date_admission"  hint="Fecha de ingreso" :dense="dense" readonly />
                </div>

                <div class="row">
                    <section class="sections-array">
                        <p>VICTIMAS</p>
                        <ul>
                            <li v-for="(victima, index) in cover_image_information.victim" :key="index">
                                {{victima}}
                            </li>
                        </ul>
                    </section>
                    </div>
                    <div class="row">
                    <section class="sections-array">
                        <p>IMPUTADOS</p>
                        <ul>
                            <li v-for="(imputado, index) in cover_image_information.accused" :key="index">
                                {{imputado}}
                            </li>
                        </ul>
                    </section>                   
                </div> 

                <div class="row">
                    <section class="sections-array">
                        <p>QUERELLANTES</p>
                        <ul>
                            <li v-for="(querellantes, index) in cover_image_information.appellant" :key="index">
                                {{querellantes}}
                            </li>
                        </ul>
                    </section>                    
                </div>
                
            </div>
            <div class="col-md-7">
                <div class="q-pa-md">
                    <div class="content-image">
                        <img :src="image_cover_image" alt="Cover image" style="width:90%">
                    </div>                    
                </div>
            </div>  
          <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn @click="DeleteImageMap()" fab icon="fas fa-times" color="red" padding="10px" />
          </q-page-sticky>
        </div>
    </div>
</template>
<script>
import {mapState,mapActions,mapMutations} from 'vuex'
export default {
    name:'PreviewCompleteInformationCover',
    data(){
        return{
           image_cover_image:null,
            dense: false
        }
    },
    methods:{
        ...mapActions('upload_image',[]),
        ...mapMutations('upload_image',[]),
        getImagePreview(){
            this.$axios.get(`documents/image/${this.cover_image_information.url_uploaded}`)
             .then(response =>{    
          this.image_cover_image = response.data.image;
       })
       .catch(error =>{
         console.log(error);
       })
        },
        PreviewImage(){},
        enableInputs(){},
        DeleteImageMap(){
            this.$router.replace({
                name:'UploadImage'
            })
        },
    },
    computed:{
        ...mapState('upload_image',['cover_image_information'])
    },
    created(){
        this.getImagePreview();
    }
}
</script>
<style scoped>
.sections-array{
    border-bottom: dotted;
    padding: 10px;    
    margin: 10px;
}

.content_image {
    width: 300px;
}
.content_image img{       
    background-size: 100% 100%;        
    width: 90%;
    display: block;
    margin: auto;
}
</style>