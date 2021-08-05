<template>
    <div class="q-pa-md">       
        <LibraryOfLaws/>    
    </div>
</template>
<script>
import LibraryOfLaws from './PdfReader.vue'
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
    name:'GetPDFinEditor',
    components:{LibraryOfLaws},
    data(){
        return{

        }
    },
    methods:{
        ...mapMutations('library',['getPdf','OpenCloseDialog']),       
    },
    computed:{
        ...mapState('library',[])
    },
    created(){},
    mounted(){}
    
}
</script>
<style scoped>
div{
    width: 100%;
}
</style>