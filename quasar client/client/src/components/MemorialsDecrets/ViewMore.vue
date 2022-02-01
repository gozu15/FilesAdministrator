<template>
<div class="q-pa-md">
  <q-card>
        <q-card-section>
          <div class="row">
            <div class="col-6">
              <div class="text-h6">Vista previa</div>
            </div>
            <div class="col-6">
              <div class="row justify-end">
                <q-btn round icon="fas fa-times" @click="ClosePreviewDocument()" />
              </div>              
            </div>            
          </div>
        </q-card-section>
        <q-card-section align="right" class="text-doc-btn">
          <!-- <q-btn  round icon="fas fa-print" @click="PrintPage()">
          </q-btn>  -->
           <q-btn round icon="fas fa-file-download" @click="Download(memorial_properties.documents_text)">
          </q-btn>          
        </q-card-section>
        <q-card-section id="content" class="text-doc">
               <q-card-section v-html="memorial_properties.documents_text" />             
        </q-card-section>      
      </q-card>            
</div>    
</template>
<script>
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
  name:'ViewMore',
  data(){
    return{}
  },
  computed:{
    ...mapState('memorials_decrets',['memorial_properties']),
  },
  methods:{
    ...mapActions('memorials_decrets',[]),
    ...mapMutations('memorials_decrets',['ClosePreviewDocument']),
   Download(element, filename = ''){         
     filename = this.memorial_properties.name;
    var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
    var postHtml = "</body></html>";
    var html = preHtml+element+postHtml;
    var blob = new Blob(['\ufeff', html], {
        type: 'application/msword'
    });
    
    // Specify link url
    var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
    
    // Specify file name
    filename = filename?filename+'.doc':'document.doc';
    
    // Create download link element
    var downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);
    
    if(navigator.msSaveOrOpenBlob ){
        navigator.msSaveOrOpenBlob(blob, filename);
    }else{
        // Create a link to the file
        downloadLink.href = url;
        
        // Setting the file name
        downloadLink.download = filename;
        
        //triggering the function
        downloadLink.click();
    }
    
    document.body.removeChild(downloadLink);

    },
    PrintPage(){
      window.print()
    }
  },
  mounted(){    
  },
  created()
  {
    
    //  let recaptchaScript = document.createElement('script'); 
    //   recaptchaScript.setAttribute('src','../../settings/jquery.min.js')    
    //   document.body.appendChild(recaptchaScript)
      // let recaptchaScript1 = document.createElement('script')    
      // recaptchaScript1.setAttribute('src','../../settings/FileSaver.js')    
      // document.head.appendChild(recaptchaScript1)
      // let recaptchaScript2 = document.createElement('script')    
      // recaptchaScript2.setAttribute('src','../../settings/jquery.wordexport.js')    
      // document.head.appendChild(recaptchaScript2)
  }

}
</script>
<style scoped>
.text-doc-btn .q-btn{
  margin-right: 10px;
}
@media print {
  /* Contenido del fichero print.css */
  .text-doc-btn{
    display: none;
  }
  .text-doc{
    border: none;
  }
}
</style>