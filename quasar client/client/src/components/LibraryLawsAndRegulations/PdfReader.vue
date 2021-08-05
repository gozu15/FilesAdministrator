<template>
    <div>
        <!-- https://cdn.rawgit.com/mozilla/pdf.js/c6e8ca86/test/pdfs/calrgb.pdf -->
        <vue-pdf-app style="height: 85vh;" :pdf="pdf"></vue-pdf-app>       
    </div>
</template>
<script>
import VuePdfApp from "vue-pdf-app";
import "vue-pdf-app/dist/icons/main.css";
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
    name:'LibraryOfLaws',   
    //pdf
    components:{VuePdfApp},
    data(){
        return{            
        }
    },
    methods:{
      ...mapMutations('library',[]),
      ...mapActions('library',['GetPDFSelected']),
    },
    computed:{
        ...mapState('library',['pdf'])
    },
    mounted(){        
    },
    created(){}
}
</script>
<style scoped>
div {
  width: 100%;   
}
</style>