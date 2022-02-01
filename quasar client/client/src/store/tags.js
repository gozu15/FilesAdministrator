import Vue from 'vue'
const vue = Vue.prototype
export const TagsFromImage={
    namespaced:true,
    state:{
        list_tags:[],
        page:0,
        isSearching:true,
        tagsinmodel:false,
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
            _id:null
        },
        document_text:null
    },
    mutations:{
        IstagInModel(state,payload){
            state.tagsinmodel = payload
        },
        IsSearching(state,payload){
            state.isSearching = payload;
        },
        LoadTagSelected(state,payload){
            state.tag_selected={
                url_uploaded:payload.url_uploaded,
                type_image:payload.type_image,
                code_document:payload.code_document,
                date_admission:payload.date_admission,
                hours_admission:payload.hours_admission,
                relevant_court:payload.relevant_court,
                crime:payload.crime,
                process_type:payload.process_type,
                appellant:payload.appellant,
                accused:payload.accused,
                victim:payload.victim,
                court_code:payload.court_code,
                _id:payload._id
            }
        },
        LoadAllTagsToList(state,payload){       
            //state.list_tags = []          
            // payload.forEach(element =>{
            //     state.list_tags.push(element);
            // })            
            let check = true;
            if(state.list_tags.length != 0){
                for (let index = 0; index < payload.length; index++) {
                    for (let j = 0; j < state.list_tags.length; j++) {
                        if(payload[index]._id == state.list_tags[j]._id){
                            check = false;
                            break;
                        }
                    }
              }
              if(check){
               state.list_tags = [...state.list_tags,...payload]
              }                                 
            }
            else{
                state.list_tags = payload;
            }  
           
        },
        PassPage(state,payload){
            state.page = payload;
        },
        ClearDataTags(state){
            state.list_tags=[];
            state.isSearching= false;
            state.page=0;
            state.tag_selected={
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
                _id:null
            }
        }
    },
    actions:{
        GetListTagsAndLoad({commit,state}){
            vue.$axios.get('documents/read',{
                query:state.page
            })
            .then(response =>{
              
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
               
            })
            .catch(err =>{
                console.log(err);
            })
        },
        SearchDocumentTag({commit},payload){            
            vue.$axios.get(`documents/search/cover_image`,{               
                params:
                {
                        page:1,
                        victim:payload.victim,
                        accused:payload.accused,
                        appellant:payload.appellant,
                        crime:payload.crime,
                        code_document:payload.code_document
                }
            })
            .then(response =>{ 
                commit('LoadAllTagsToList',response.data.message)
            })
            .catch(err =>{
                console.log("error",err);
            })
        }
    }
}