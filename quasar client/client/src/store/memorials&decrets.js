import Vue from 'vue'
const vue = Vue.prototype;
export const MemorialsDecretsStore ={
    namespaced:true,
    state:{
        open_dialog:false,
        models_list:[],
        memorials_list_searching:[],
        memorial_model_to_join:"Ingrese un dato",
        isReloadingModelWithTags:false,
        isSearching:false,
        openPDFfromeditor:false,
        closeeditor:false,        
        memorials_list:[],
        memorial_properties:{
            id:null,
            name:null,            
            description:null,
            documents_text:" ",
        },
        page:1,
        pageauxiliar:1,
        rowPerPage:5,
        memorial_text_doc:'Editor de texto',
        view_more:false,
        checkParamSearch:null,
    },
    mutations:
    {   OpenDialog(state){
            state.open_dialog = true;
        },
        CloseDialog(state){
            state.open_dialog = false;
        },
        changeEditorViewer(state,payload){
            state.closeeditor = payload
        },
        changeViewMorePdfFromEditor(state,payload){
            state.openPDFfromeditor = payload
        },
        ChangeModelWithTag(state,payload){
            state.isReloadingModelWithTags = payload
        },
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

        async WritingDocumentText(state, payload){          
            state.memorial_text_doc = payload
            let check =  state.memorial_text_doc
            check = check.replace(/;/g,'ascii59');
            window.localStorage.setItem('text_memorial',check)   
        },
        WritingDocumentTextToJoinModel(state, payload){
            state.memorial_model_to_join = payload
        },
        AddTagInDocumentText(state,payload){
            let checkifitistheend = false
            let getlength = state.memorial_text_doc.length;
           
            state.memorial_text_doc += payload;
        
        },
        ReloadModelsInList(state,payload){
            payload.forEach(element =>{
                state.models_list.push(element);
            })
        },     
        ReloadListMemorials(state,payload){
          
            let check = true;
            if(state.memorials_list.length != 0){
                for (let index = 0; index < payload.length; index++) {
                    for (let j = 0; j < state.memorials_list.length; j++) {
                        if(payload[index]._id == state.memorials_list[j]._id){
                            check = false;
                            break;
                        }
                    }
              }
              if(check){
               state.memorials_list = [...state.memorials_list,...payload]
              }                                 
            }
            else{
                state.memorials_list = payload;
            }  
           
           // state.memorials_list = [...state.memorials_list,...payload];
                      
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
           
            state.memorial_properties.documents_text += payload;
        },
        ReloadMemorialProperties(state,payload){                  
            state.memorial_properties={
                id: (payload._id != undefined ? payload._id : payload.id),
                name:payload.name,                
                type_document:payload.type_document,
                description:payload.description,
                documents_text:payload.documents_text,
            }            
        },

        IdPropertieMemorial(state,payload){
            state.memorial_properties.id = payload;
        },
        NamePropertieMemorial(state,payload){
            state.memorial_properties.name = payload;
        },
        TypePropertieMemorial(state,payload){
            state.memorial_properties.type_document = payload;
        },
        DescriptionPropertieMemorial(state,payload){
            state.memorial_properties.description = payload
        },
        DocumentTextPropertieMemorial(state,payload){
            state.memorial_properties.documents_text = payload
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
        ChangePrevPage(state){
            if(state.page >0){
                state.page -=1
            }            
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
            state.models_list = []
            state.memorial_properties={
                id:null,
                name:null,               
                description:null,
                documents_text:null,
            }
            state.isReloadingModelWithTags= false;
            state.page=1;
            state.rowPerPage=5,
            state.memorial_text_doc= window.localStorage.getItem('text_memorial') != undefined ? window.localStorage.getItem('text_memorial') : 'Editor de texto',
            state.memorial_model_to_join = window.localStorage.getItem('text_memorial') != undefined ? window.localStorage.getItem('text_memorial') : 'Editor de texto',
            state.memorials_list_searching = []
            state.memorials_list = []
            document.cookie ="text_memorial_model='ingrese texto'" 
            state.memorial_text_doc = state.memorial_text_doc.replace(/ascii59/g,';'); 
            state.memorial_model_to_join = state.memorial_model_to_join.replace(/ascii59/g,';');   
        }

    },
   
    actions:{
        OpenDialogDelete({commit}){
            commit('OpenDialog');
        },
        CloseDialogDelete({commit}){
            commit('CloseDialog');
        },
        FindDataFromMemorialsDocs({commit,state},payload){
            let check = payload.name;
            if(payload != undefined || payload != null)
            {
                commit('ChangePage',payload.page);
                commit('changeRowsPerPage',payload.rowPerPage);                
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
                        type:'Memorial'
                    }
                })
                .then(response =>{                   
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
                        type:'Memorial'
                    }
                })
                .then(response =>{
                  
                    commit('ReloadListToSearchMemorials',response.data.data);
                })
                .catch(err =>{
                    console.log(err)
                })
            }
        },
        
        FindDataFromAcusationsDocs({commit,state},payload){
            let check = payload.name;
            if(payload != undefined || payload != null)
            {
                commit('ChangePage',payload.page);
                commit('changeRowsPerPage',payload.rowPerPage);                
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
                        type:'Acusations'
                    }
                })
                .then(response =>{                   
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
                        type:'Acusations'
                    }
                })
                .then(response =>{
                  
                    commit('ReloadListToSearchMemorials',response.data.data);
                })
                .catch(err =>{
                    console.log(err)
                })
            }
        },

        FindDataFromResolutionDocs({commit,state},payload){
            let check = payload.name;
            if(payload != undefined || payload != null)
            {
                commit('ChangePage',payload.page);
                commit('changeRowsPerPage',payload.rowPerPage);                
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
                        type:'Resolutions'
                    }
                })
                .then(response =>{                   
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
                        type:'Resolutions'
                    }
                })
                .then(response =>{
                  
                    commit('ReloadListToSearchMemorials',response.data.data);
                })
                .catch(err =>{
                    console.log(err)
                })
            }
        },

        FindDataFromDecretsDocs({commit,state},payload){
            let check = payload.name;
            if(payload != undefined || payload != null)
            {
                commit('ChangePage',payload.page);
                commit('changeRowsPerPage',payload.rowPerPage);                
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
                        type:'Decreto'
                    }
                })
                .then(response =>{                   
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
                        type:'Decreto'
                    }
                })
                .then(response =>{
                  
                    commit('ReloadListToSearchMemorials',response.data.data);
                })
                .catch(err =>{
                    console.log(err)
                })
            }
        },

        FindDataFromAutosDocs({commit,state},payload){
            let check = payload.name;
            if(payload != undefined || payload != null)
            {
                commit('ChangePage',payload.page);
                commit('changeRowsPerPage',payload.rowPerPage);                
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
                        type:'Autos'
                    }
                })
                .then(response =>{                   
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
                        type:'Autos'
                    }
                })
                .then(response =>{
                  
                    commit('ReloadListToSearchMemorials',response.data.data);
                })
                .catch(err =>{
                    console.log(err)
                })
            }
        },

        
        FindDataFromSentencesDocs({commit,state},payload){
            let check = payload.name;
            if(payload != undefined || payload != null)
            {
                commit('ChangePage',payload.page);
                commit('changeRowsPerPage',payload.rowPerPage);                
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
                        type:'Sentence'
                    }
                })
                .then(response =>{                   
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
                        type:'Sentence'
                    }
                })
                .then(response =>{
                  
                    commit('ReloadListToSearchMemorials',response.data.data);
                })
                .catch(err =>{
                    console.log(err)
                })
            }
        },




        FindDataFromMemorialsModels({commit,state},payload){
            let check = payload.name;
            if(payload != undefined || payload != null)
            {
                commit('ChangePage',payload.page);
                commit('changeRowsPerPage',payload.rowPerPage);
               
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
                        type:'DecretosModel/MemorialesModel/AcusacionesModel/AutosModel/ResolucionesModel/SentenciasModel'
                    }
                })
                .then(response =>{
                   
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
                   
                    commit('ReloadListToSearchMemorials',response.data.data);
                })
                .catch(err =>{
                    console.log(err)
                })
            }
            
            

        },
        GetDataFromMemorialsModelsSearch({commit,state},payload){
            let check = payload.name;
            if(payload != undefined || payload != null)
            {
                commit('ChangePage',payload.page);
                commit('changeRowsPerPage',payload.rowPerPage);
               
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
                        type:'DecretosModel/MemorialesModel/AcusacionesModel/AutosModel/ResolucionesModel/SentenciasModel'
                    }
                })
                .then(response =>{
                
                    commit('ReloadModelsInList',response.data.data);
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
                        type:'DecretosModel/MemorialesModel/AcusacionesModel/AutosModel/ResolucionesModel/SentenciasModel'
                    }
                })
                .then(response =>{
              
                    commit('ReloadModelsInList',response.data.data);
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
             
            }   
           
            vue.$axios.get('memorials_decrets/read/typememorials/from',{
                params:{
                    page:state.page,
                    size:state.rowPerPage,
                    type:'Decreto/Memorial'
                }
            })
            .then(async response =>{
              
                commit('ReloadListMemorials',await response.data.data);
            })
            .catch(error =>{
                console.log(error);
            })
            
        },
        //OBTENER LISTA DE LOS MODELOS
        GetMemorialsModelInList({commit,state},payload){

           return vue.$axios.get('memorials_decrets/read/typememorials/from',{
                params:{                    
                    page:payload.page || 1,
                    size:payload.rowPerPage || 5,
                    type:'DecretosModel/MemorialesModel/AcusacionesModel/AutosModel/ResolucionesModel/SentenciasModel'
                }
            })
         
        },

        async GetMemorialsFromApiAutos({commit,state},payload){
            if(payload != undefined || payload != null)
            {
                commit('ChangePage',payload.page);
                commit('changeRowsPerPage',payload.rowPerPage);
               
            }   
           let promise;
           return promise = new Promise((resolve,reject) =>{
                vue.$axios.get('memorials_decrets/read/typememorials/from',{
                    params:{
                        page:state.page,
                        size:state.rowPerPage,
                        type:'Autos'
                    }
                })
                .then(response =>{
                    commit('ReloadListMemorials', response.data.data);
                    resolve(response.data)
                })
                .catch(err =>{
                    console.log(err);
                    reject(err)
                })
           })
          
            
            
        },

        async GetMemorialsFromApiMemorials({commit,state},payload){   
            if(payload != undefined || payload != null)
            {
                commit('ChangePage',payload.page);
                commit('changeRowsPerPage',payload.rowPerPage);
               
            }   
            let promise;
        return promise = new Promise((resolve,reject) =>{
             vue.$axios.get('memorials_decrets/read/typememorials/from',{
                params:{
                    page:state.page,
                    size:state.rowPerPage,
                    type:'Memorial'
                }
            })
            .then(response =>{
              
                commit('ReloadListMemorials', response.data.data);
                resolve(response.data)
            })
            .catch(err =>{
                console.error(err);
                reject()
            })
        })
        
            
            
        },

        async GetMemorialsFromApiDecrets({commit,state},payload){
            if(payload != undefined || payload != null)
            {
                commit('ChangePage',payload.page);
                commit('changeRowsPerPage',payload.rowPerPage);
               
            }   
            let promise
            return promise = new Promise((resolve,reject)=>{
                  vue.$axios.get('memorials_decrets/read/typememorials/from',{
                params:{
                    page:state.page,
                    size:state.rowPerPage,
                    type:'Decreto'
                }
            })
            .then(response =>{
                commit('ReloadListMemorials', response.data.data);
                resolve(response.data)
            })
            .catch(err =>{
                console.log(err)
                reject()
            })
            })
           
           
            
        },      
        async GetMemorialsFromApiResolutions({commit,state},payload){
            if(payload != undefined || payload != null)
            {
                commit('ChangePage',payload.page);
                commit('changeRowsPerPage',payload.rowPerPage);
             
            }   
            let promise
            return promise = new Promise((resolve,reject)=>{
                vue.$axios.get('memorials_decrets/read/typememorials/from',{
                    params:{
                        page:state.page,
                        size:state.rowPerPage,
                        type:'Resolutions'
                    }
                })
                .then(response =>{
                    commit('ReloadListMemorials', response.data.data);
                    resolve(response.data)
                })  
                .catch(err =>{
                    console.log(err)
                    reject()
                })  
            })  
            
        },

        async GetMemorialsFromApiSentence({commit,state},payload){
            if(payload != undefined || payload != null)
            {
                commit('ChangePage',payload.page);
                commit('changeRowsPerPage',payload.rowPerPage);
             
            }   
           let promise
           return promise = new Promise((resolve,reject) =>{
                vue.$axios.get('memorials_decrets/read/typememorials/from',{
                params:{
                    page:state.page,
                    size:state.rowPerPage,
                    type:'Sentence'
                }
            })
            .then(response =>{
                commit('ReloadListMemorials', response.data.data);
                resolve(response.data)
            })
            .catch(err =>{
                console.err(err)
                reject()
            })
           })
           
            
        },

        async GetMemorialsFromApiAcusations({commit,state},payload){
            if(payload != undefined || payload != null)
            {
                commit('ChangePage',payload.page);
                commit('changeRowsPerPage',payload.rowPerPage);
             
            }   
           let promise 
           return promise = new Promise((resolve, reject) =>{
                    vue.$axios.get('memorials_decrets/read/typememorials/from',{
                    params:{
                        page:state.page,
                        size:state.rowPerPage,
                        type:'Acusations'
                    }
                })
                .then(response =>{                
                    commit('ReloadListMemorials', response.data.data);
                    resolve(response.data)
                })
                .catch(error =>{
                    console.log(error);
                    reject()
                })
           })
           
            
        },

        GetMemorialProperties({commit},payload){
            commit('ReloadMemorialProperties',payload)
        },

        CreateMemorialNewDocument({commit,state},payload){
            
            let promise
            return promise = new Promise((resolve,reject) =>{
                vue.$axios.post('memorials_decrets/create',payload)
                .then(response =>{
                    //commit('ReloadMemorialProperties',payload)
                    resolve(payload)
                })
                .catch(err =>{
                    reject(err)
                })
            })
            
           
        },
        GetModelsMemorials({commit,state},payload){
            if(payload != undefined || payload != null)
            {
                commit('ChangePage',payload.page);
                commit('changeRowsPerPage',payload.rowPerPage);
             
            }   
            let promise;
            return promise = new Promise((resolve,reject)=>{
                vue.$axios.get('memorials_decrets/read/typememorials/from',{
                    params:{
                        page:state.page,
                        page:state.page,
                        size:state.rowPerPage,
                        type:'DecretosModel/MemorialesModel/AcusacionesModel/AutosModel/ResolucionesModel/SentenciasModel'
                    }
                })
                .then(response =>{                  
                    commit('ReloadListMemorials',response.data.data);
                    resolve(response.data)
                })
                .catch(error =>{
                    console.log(error);
                    reject()
                })
            })
           
        },

        UpdateModelMemorial({commit,state},payload){
            commit('ReloadMemorialProperties',payload);
            let id = state.memorial_properties.id
           return  vue.$axios.put(`memorials_decrets/update/${id}`,payload)
          
        },
        DeleteMemorial({commit},payload){
            let id = payload.id != undefined ? payload.id : payload._id;
            let promise;
            return promise = new Promise((resolve,reject) =>{
                vue.$axios.delete(`memorials_decrets/delete/${id}`)
                .then(()  =>{
                    resolve(payload)
                })
                .catch(err =>{
                    reject(err)
                })
            })
            
        }
    }
}