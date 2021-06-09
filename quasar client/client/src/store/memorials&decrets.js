import Vue from 'vue'
import state from './module-example/state';
const vue = Vue.prototype;
export const MemorialsDecretsStore ={
    namespaced:true,
    state:{
        memorials_list_searching:[],
        isSearching:false,
        memorials_list:[],
        memorial_properties:{
            id:null,
            name:null,            
            description:null,
            documents_text:" ",
        },
        page:1,
        rowPerPage:5,
        memorial_text_doc:'Editor de texto',
        view_more:false,
        checkParamSearch:null,
    },
    mutations:
    {   
        OpenPreviewDocument(state,payload){
            state.view_more = true;
            state.memorial_properties={
                id:payload.id || payload._id,
                name:payload.name,            
                description:payload.description,
                documents_text:payload.documents_text,
            }
        },
        ClosePreviewDocument(state){
            state.view_more = false;
            state.memorial_properties={
                id:null,
                name:null,
                description:null,
                documents_text:" "
            }
        },

        WritingDocumentText(state, payload){
            state.memorial_text_doc = payload
        },
        AddTagInDocumentText(state,payload){
            let checkifitistheend = false
            let getlength = state.memorial_text_doc.length;
            console.log(typeof state.memorial_text_doc)
            console.log("LENGTH",getlength)
            state.memorial_text_doc += payload;
            // while(!checkifitistheend){
            //     if(state.memorial_text_doc[getlength - 1] == '/'){
            //         console.log("THIS IS",state.memorial_text_doc[getlength - 1])
            //         if(state.memorial_text_doc[getlength - 3] != '>'){                        
            //             state.memorial_text_doc[getlength - 4] += payload[2]
            //             checkifitistheend= true;
            //         }
            //     }
            //     else{                    
            //         if(getlength == 0){
            //             checkifitistheend = true;
            //             state.memorial_text_doc += payload;
            //         }                    
            //     }
            //     getlength -= 1;
            // }
            

            console.log("CHECK DOC",state.memorial_text_doc);
            //this.$refs.editor_ref.runCmd('insertText', payload)
        },
        ReloadListMemorials(state,payload){
            if(state.memorials_list.length != 0){                      
                payload.forEach(element => {
                    state.memorials_list.push(element)
                });               
            }
            else{
                state.memorials_list = payload;
            }
                      
        },
        ReloadListToSearchMemorials(state,payload){           
            if(state.memorials_list_searching.length != 0){                      
                payload.forEach(element => {
                    state.memorials_list_searching.push(element)
                });               
            }
            else{
                state.memorials_list_searching = payload;
            }
                      
        },
        OnLoadParamToSearch(state,payload){
            state.checkParamSearch = payload;
        },
        AddTagInToDocumentText(state,payload){
            console.log("addtag")
            state.memorial_properties.documents_text += payload;
        },
        ReloadMemorialProperties(state,payload){
            state.memorial_properties={
                id:payload._id || payload.id,
                name:payload.name,                
                type_document:payload.type_document,
                description:payload.description,
                documents_text:payload.documents_text,
            }
        },
        IsSearching(state){
            state.isSearching = true;
        },
        IsNotSearching(state){
            state.isSearching = false;
        },
        ChangePage(state,payload){
            state.page = payload;
        },
        ChangeNextPage(state){
            state.page += 1;
        },
        changeRowsPerPage(state,payload){
            state.rowPerPage = payload;
        },
        ClearListFromSearch(state){
            state.memorials_list_searching = [];
            state.memorials_list =[]
            state.page=1;
            state.rowPerPage=5
        },

        ClearData(state){
            state.memorial_properties={
                name:null,
                uid_image_object:null,
                description:null,
                documents_text:null,
            }
            state.page=1;
            state.rowPerPage=5,
            state.memorial_text_doc='Editor de texto'
        }

    },
   
    actions:{
        FindDataFromMemorialsDocs({commit,state},payload){
            let check = payload.name;
            if(payload != undefined || payload != null)
            {
                commit('ChangePage',payload.page);
                commit('changeRowsPerPage',payload.rowPerPage);
                console.log("memopayload",payload);
            }   
            if(state.checkParamSearch != check){
                commit('ClearListFromSearch')
                commit('OnLoadParamToSearch',check)
                vue.$axios.get('memorials_decrets/read/memorials/from/search',{
                    params:{
                        page:state.page,
                        size:state.rowPerPage,
                        name:payload.name,
                        description:payload.description,
                        documents_text:payload.documents_text,
                        type:'Decreto/Memorial'
                    }
                })
                .then(response =>{
                    console.log(response)
                    commit('ReloadListToSearchMemorials',response.data.data);
                })
                .catch(err =>{
                    console.log(err)
                })
            }
            else{
                vue.$axios.get('memorials_decrets/read/memorials/from/search',{
                    params:{
                        page:state.page,
                        size:state.rowPerPage,
                        name:payload.name,
                        description:payload.description,
                        documents_text:payload.documents_text,
                        type:'Decreto/Memorial'
                    }
                })
                .then(response =>{
                    console.log(response)
                    commit('ReloadListToSearchMemorials',response.data.data);
                })
                .catch(err =>{
                    console.log(err)
                })
            }
            
            

        },
        async GetMemorialsFromApi({commit,state},payload){
            if(payload != undefined || payload != null)
            {
                commit('ChangePage',payload.page);
                commit('changeRowsPerPage',payload.rowPerPage);
                console.log("memopayload",payload);
            }   
           
            vue.$axios.get('memorials_decrets/read/typememorials/from',{
                params:{
                    page:state.page,
                    size:state.rowPerPage,
                    type:'Decreto/Memorial'
                }
            })
            .then(async response =>{
                console.log("RESULTADO",response)
                commit('ReloadListMemorials',await response.data.data);
            })
            .catch(error =>{
                console.log(error);
            })
            
        },
        CreateMemorialNewDocument({commit,state},payload){
            commit('ReloadMemorialProperties',payload)
            vue.$axios.post('memorials_decrets/create',state.memorial_properties)
            .then(response =>{
                console.log(response)
            })
            .catch(err =>{
                console.log(err);
            })
        },
        GetModelsMemorials({commit,state}){
            vue.$axios.get('memorials_decrets/read/typememorials/from',{
                params:{
                    page:state.page,
                    type:'DecretosModel/MemorialesModel'
                }
            })
            .then(response =>{
                console.log(response.data)
                commit('ReloadListMemorials',response.data.data);
            })
            .catch(error =>{
                console.log(error);
            })
        },

        UpdateModelMemorial({commit,state},payload){
            commit('ReloadMemorialProperties',payload);
            let id = state.memorial_properties.id
            vue.$axios.put(`memorials_decrets/update/${id}`,state.memorial_properties)
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