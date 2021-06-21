<template>
    <div class="q-pa-md">
        <div class="row row-content">            
            <div class="col-6">
                <div class="row justify-center">
                     <div class="content-image">                    
                    <img src="../../../public/image/decretos.jpg" alt="Decretos">                   
                    <div class="shadow-image" @click="GoToGenerateMemorialDocument()"></div>
                     <div class="text-image">
                        Generador de Documentos
                    </div>
                </div>
                </div>               
            </div>
            <div class="col-6">
                <div class="row justify-center">
                     <div class="content-image">                             
                    <img src="../../../public/image/decretos.jpg" alt="Decretos">   
                    <div class="shadow-image" @click="GoToMemorialsModels()"></div>  
                    <div class="text-image">
                        Generador de Modelos
                    </div>     
                </div>
                </div>
                
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        GoToMemorialsModels(){
            this.$router.push({
                name:'MemorialDecretModel'
            })
        },
        GoToGenerateMemorialDocument(){
             this.$router.push({
                name:'MemorialsDocuments'
            })
        }
    },
    computed:{

    },
    created(){}
}
</script>
<style scoped>
.content-image{
    width: 80%;
    height: 300px;
    position: relative;
    display: inline-block;
    text-align: center;
}
.row-content{
    height: 100%;    
    margin-top: 10%;
}
.shadow-image{
    background-color: rgba(0, 0, 0, 0.537) ;    
     position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;    
     cursor: pointer;
}
.content-image img{
    background-size: 100% 100%;
    width: 100%;
    height: 100%;   
}  
.text-image{
     position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    font-family: sans-serif;
    font-size: 20px;
    font-weight: bold;
     color: rgb(255, 255, 255);
    
}
.shadow-image:hover{
    background-color: rgba(0, 0, 0, 0.651) ;   
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
</style>