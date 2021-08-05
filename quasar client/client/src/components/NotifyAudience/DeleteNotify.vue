<template>
    <div class="q-pa-md">
        <q-card class="q-pa-md" style="width: 500px; max-width: 60vw;">           
            <q-card-section>                
                <div class="text-h6 text-center" style="font-size:15px">
                    <div class="row justify-start">
                        <q-icon name="warning" class="text-red" style="font-size: 4rem;" />
                    </div>
                    ¿Esta seguro de eliminar el dato?
                </div>
            </q-card-section>
            <q-card-section>
                <div class="row justify-end">                    
                     <div class="q-pr-md">
                        <q-btn @click="DeleteNotifyInRow" label="Borrar" color="blue"></q-btn>
                    </div>
                    <div class="q-pr-md">
                        <q-btn @click="ClosePopup" label="Cancelar" color="red"></q-btn>
                    </div>
                </div>
            </q-card-section>
        </q-card>
    </div>
</template>
<script>
import {mapActions,mapMutations,mapState} from 'vuex';
export default {
    name:'DeleteNotify',
    data(){
        return{}
    },
    methods:{
        ...mapMutations('notify',['DeleteNotify']),
        ...mapActions('notify',['DeleteNotifySelected','GetAllNotify']),
        ClosePopup(){
            this.DeleteNotify(false);
        },
        DeleteNotifyInRow(){
            console.log(this.notify_selected);
            this.DeleteNotifySelected(this.notify_selected)
            .then(response =>{
                console.log(response);                
                this.GetAllNotify();
                this.ClosePopup();
            })  
            .catch(err =>{
                console.log(err);
            })
        }
    },
    computed:{
        ...mapState('notify',['notify_selected'])
    },
    mounted(){}
}
</script>