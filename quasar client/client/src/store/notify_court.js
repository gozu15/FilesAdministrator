import Vue from 'vue'
// import io from 'socket.io-client'
// const SOCKET= Vue.prototype.$mysocket = io("http://localhost:3000/api")

const vue = Vue.prototype
export const NotifyAudience ={
    namespaced:true,
    state:{
        list_notify:[],
        list_only_inprocess:[],
        notify_selected:{},
        socket : null,
        isNotifyend:false,
        notify_preview:false,
        notify_delete:false,
        isNotifyCommingToEnd:true
    },
    mutations:{
        NotifyCommingToEnd(state,payload){
            state.isNotifyCommingToEnd = payload;
        },
        CheckIfNotifyIsTimeout(state,payload){
            let id = payload.id || payload._id
            state.list_only_inprocess.forEach(element =>{
                if(element._id == id || element.id == id){
                    element.isInTimeout = true;
                }
            })
        },
        ReloadListOnlyProcess(state,payload){
            state.list_only_inprocess = payload
        },
        RealoadNotifyselected(state,payload){
            state.notify_selected = payload;
        },
        ReloadingListnotify(state, payload){
            state.list_notify = payload;            
        },
        clearListNotify(state){
            state.list_notify = [];
        },
        NotifyEndInterval(state,payload){
            state.isNotifyend = payload;
        },
        OpenOrCloseNotify(state,payload){
            state.notify_preview = payload;
        },
        DeleteNotify(state,payload){
            state.notify_delete = payload
        },
        getStatusNotify(state,payload){
            state.notify_selected.status = payload;
        },
        getNameNotify(state,payload){
            state.notify_selected.name = payload;
        },
        getDescriptionNotify(state,payload){
            state.notify_selected.description = payload;
        },
        getLapsoNotify(state,payload){
            state.notify_selected.lapso = payload;
        },
        getDateFullNotify(state,payload){
            state.notify_selected.date_end = payload;
        }
    },
    actions:{
        GetNotifyinQueue({commit}){
            return vue.$axios.get('notify_audience/notify/get/inprocess')
            
        },
        GetAllNotifyInProcessStore({commit}){
            vue.$axios.get('notify_audience/notify',{
                params:{
                    status:"LLEGANDO A TERMINO"
                }
            })
            .then(response =>{
                console.log(response);
                response.data.forEach(element => {
                    element.isInTimeout = false
                });
                commit('ReloadListOnlyProcess',response.data)
            })
            .catch(err =>{
                console.log(err);
            })
        },
        TimeOutNotifyDate({commit},payload){
            let id = payload.id
            payload.status = "TERMINADO"
            return vue.$axios.put(`notify_audience/update/${id}`,payload)            
        },
        GetAllNotify({commit}){
            vue.$axios.get('notify_audience/notify',{
                params:{
                    status:"EN PROCESO/TERMINADO/LLEGANDO A TERMINO"
                }
            })
            .then(response =>{  
                console.log("GETALL",response)
                if(response.data ==""){
                    let data =[]
                    commit('ReloadingListnotify',data);
                }
                else{
                    let date_init = response.data.date_init
                    //TODO Convertir fecha/hora legible al usuario
                    commit('ReloadingListnotify',response.data);
                }
                
            })
            .catch(err =>{
                console.log(err)
            })
        },
        CreateNotify({commit},payload){
            return vue.$axios.post('notify_audience/create',payload)            
        },        
        UpdateNotify({commit},payload){
            let id= payload.id || payload._id;
            return vue.$axios.put(`notify_audience/update/${id}`,payload)
           
        },
        DeleteNotifySelected({commit},payload){
            let id= payload.id || payload._id;
            return vue.$axios.delete(`notify_audience/delete/${id}`)
        }
    }
}