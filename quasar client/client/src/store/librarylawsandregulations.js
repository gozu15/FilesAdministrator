import Vue from 'vue'
const vue = Vue.prototype;
export const LibraryLawsAndRegulations ={
    namespaced:true,
    state:{
        list_books:[],
        pdf:null,
        open_delete_dialog: false,
        properties_bookpdf:{
            name:null,
            description:null,
            id:null
        }
    },
    mutations:{
        ReloadBooksList(state,payload){
            state.list_books=[];
            state.list_books= payload;
        },
        getPdf(state,payload){            
            state.pdf = payload
        },
        OpenCloseDialog(state,payload){
            state.open_delete_dialog = payload
        },
        GetPropertiesbookPDF(state,payload){
            state.properties_bookpdf={
                name:payload.name,
                description:payload.description,
                id:payload.id || payload._id
            }
        },
        GetNamePropertie(state,payload){
            state.properties_bookpdf.name = payload
        },
        GetDescriptionPropertie(state,payload){
            state.properties_bookpdf.description = payload
        }
    },
    actions:{   

        GetAllPDFs({commit}){
            vue.$axios.get('lawsandregulations/library_get')
            .then(response =>{
             
                commit('ReloadBooksList',response.data);
            })
            .catch(err =>{
                console.log(err);
            })
        },
        CreateandUploadPdf({commit,dispatch},payload){
            let data = {
                name:payload.name,
                description:payload.description,
                pdf_properties:payload.pdf_properties
            }
            const formData = new FormData();
            formData.append("file", data.pdf_properties);
           
            vue.$axios.post('lawsandregulations/uploadpdf',formData,{
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(response =>{
              
                vue.$axios.post('lawsandregulations/create/library',data)
                .then(response =>{                   
                    dispatch('GetAllPDFs')
                })
                .catch(err =>{
                    console.log(err)
                })
            })
            .catch(err =>{
                console.log(err)
            })
        },
        UpdatePDFSelected({commit},payload){
            let pdf_properties = payload;
         
            vue.$axios.put(`lawsandregulations/update/${pdf_properties.id}`,pdf_properties)
            .then(result =>{
              
            })
            .catch(err =>{
                console.log(err);
            })
        },
        DeletePDFSelected({commit},payload){
            let pdf_properties = payload;
            vue.$axios.delete(`lawsandregulations/delete/${pdf_properties.id}`)
            .then(response =>{
               
            })
            .catch(err =>{
                console.log(err);
            })
        },
        GetPDFSelected({commit},payload){
            let name_pdf = payload.pdf_name
           
            commit('getPdf',`http://localhost:3000/api/lawsandregulations/getpdf/${name_pdf}`)
           
        }
    }
}