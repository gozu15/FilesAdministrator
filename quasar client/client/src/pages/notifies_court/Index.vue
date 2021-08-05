<template>
    <div class="q-pa-md">
        <GetallNotifies/>
    </div>
</template>
<script>
import GetallNotifies from '../../components/NotifyAudience/GetNotify.vue'
export default {
    components:{GetallNotifies},
    data(){
        return{
            socket:this.$socket
        }
    },
    methods:{
         
    },
    computed:{},
    mounted(){
       
    }
    
}
</script>