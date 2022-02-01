<template>
    <div class="q-pa-md">
        <q-form>
        <!-- <div class="row justify start">
            <q-btn round flat color="red" icon="fas fa-arrow-left" @click="CloseDialog"></q-btn>
        </div>     -->
          <q-page-sticky position="bottom-right" :offset="[18, 122]">
            <q-btn @click="CloseDialog" fab icon="fas fa-arrow-left" color="red" padding="10px" />
          </q-page-sticky>   
        <div class="library-box">
            <LibraryOfLaws/> 
        </div>
        
        </q-form>
          
    </div>
</template>
<script>
import LibraryOfLaws from './PdfReader.vue'
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
    name:'PreviewPDF',
    components:{LibraryOfLaws},
    data(){
        return{

        }
    },
    methods:{
        ...mapMutations('library',['getPdf','OpenCloseDialog']),
        CloseDialog(){
            this.$router.replace({
                name:'LibraryLawsList'
            })
        }
    },
    computed:{
        ...mapState('library',[])
    },
    created(){},
    mounted(){}
    
}
</script>
<style lang="sass" scoped>
.library-box
    padding-right:60px

</style>