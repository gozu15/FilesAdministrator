import Vue from 'vue'
import state from './module-example/state';
const vue = Vue.prototype;
export const MemorialsDecretsStore ={
    namespaced:true,
    state:{
        memorials_list:[],
        memorial_properties:{
            id:null,
            name:null,
            uid_image_object:null,
            description:null,
            documents_text:" ",
        },
        page:1
    },
    mutations:
    {
        ReloadListMemorials(state,payload){
            let arrayauxiliar = [];            
            payload.forEach(element => {
                arrayauxiliar.push(element)
            });
            state.memorials_list = payload//[...new Set(arrayauxiliar)];            
        },
        AddTagInToDocumentText(state,payload){
            console.log("addtag")
            state.memorial_properties.documents_text += payload;
        },
        ReloadMemorialProperties(state,payload){
            state.memorial_properties={
                id:payload._id,
                name:payload.name,
                uid_image_object:payload.uid_image_object,
                type_document:payload.type_document,
                description:payload.description,
                documents_text:payload.documents_text,
            }
        },
        ChangeNextPage(state){
            state.page += 1;
        },
        ClearData(state){
            state.memorial_properties={
                name:null,
                uid_image_object:null,
                description:null,
                documents_text:null,
            }
            state.page=1;
        }

    },
    actions:{
        GetMemorialsFromApi({commit,state}){
            vue.$axios.get('memorials_decrets/read/typememorials/from',{
                params:{
                    page:state.page,
                    type:'Decret/Memorial'
                }
            })
            .then(response =>{
                console.log("RESULTADO",response)
                commit('ReloadListMemorials',response.data.data);
            })
            .catch(error =>{
                console.log(error);
            })
            
        },
        GetModelsMemorials({commit,state}){
            vue.$axios.get('memorials_decrets/read/typememorials/from',{
                params:{
                    page:state.page,
                    type:'ModelDecret/ModelMemorial'
                }
            })
            .then(response =>{
                console.log(response.data)
                commit('ReloadListMemorials',response.data.data);
            })
            .catch(error =>{
                console.log(error);
            })
        }
    }
}