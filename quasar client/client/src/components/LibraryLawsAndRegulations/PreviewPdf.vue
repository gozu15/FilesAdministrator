<template>
    <div class="q-pa-md">
        <div class="row justify start">
            <q-btn round flat color="red" icon="fas fa-arrow-left" @click="CloseDialog"></q-btn>
        </div>    
        <LibraryOfLaws/>    
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