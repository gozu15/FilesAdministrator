import Vue from 'vue'
const vue = Vue.prototype
export const TagsFromImage={
    namespaced:true,
    state:{
        list_tags:[],
        page:0,
        tag_selected:{
            url_uploaded:null,
            type_image:null,
            code_document:null,
            date_admission:null,
            hours_admission:null,
            relevant_court:null,
            crime:null,
            process_type:null,
            appellant:null,
            accused:null,
            victim:null,
            court_code:null,
        },
        document_text:null
    },
    mutations:{
        LoadAllTagsToList(state,payload){            
            payload.forEach(element =>{
                state.list_tags.push(element);
            })            
        },
        ClearDataTags(state){
            state.list_tags=[];
            state.page=0
        }
    },
    actions:{
        GetListTagsAndLoad({commit,state}){
            vue.$axios.get('documents/read',{
                query:state.page
            })
            .then(response =>{
                console.log("TAGS",response)
                commit('LoadAllTagsToList',response.data)
            })
            .catch(err =>{
                console.log("Err",err)
            })

        },
        UpdateTagSelected({commit},payload){
            let id = payload.id
            vue.$axios.put(`documents/update/${id}`,payload)
            .then(response =>{
                console.log(response);
            })
            .catch(err =>{
                console.log(err);
            })
        }
    }
}