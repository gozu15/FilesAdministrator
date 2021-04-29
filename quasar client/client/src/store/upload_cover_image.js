import Vue from 'vue'
export const CoverProperties = {
    namespaced: true,
    state: {
        id_cover:null,
        step_one: true,
        step_two: false,
        cover_image_information: {
            id: null,
            url_uploaded: null,
            code_document: null,
            crime: null,
            date_admission: null,
            hours_admission: null,
            appellant: null, //QUERELLANTES
            process_type: null,
            accused: null, //IMPUTADO
            relevant_court: null,
            victim: null, //VICTIMAS
        },
        cover_list:[],
    },
    mutations: {
        GetdataToCoverModule(state,payload){
            state.cover_list= payload;
        },
        GetId(state,payload){
            state.id_cover = payload.id;
        },
        getDataCoverImage(state, payload) {
            state.cover_image_information = {
                id:payload.id,
                url_uploaded:payload.url_uploaded,
                code_document:payload.code_document,
                crime:payload.crime,
                date_admission:payload.date_admission,
                hours_admission:payload.hours_admission,
                appellant:payload.appellant,
                process_type:payload.process_type,
                accused:payload.accused,
                relevant_court:payload.relevant_court,
                victim:payload.victim,
            }
           
        },
        clearCoverInformation(state){
            state.cover_image_information={
                id: null,
                url_uploaded: null,
                code_document: null,
                crime: null,
                date_admission: null,
                hours_admission: null,
                appellant: null, //QUERELLANTES
                process_type: null,
                accused: null, //IMPUTADO
                relevant_court: null,
                victim: null, //VICTIMAS
            }
        },
        changeStepOne(state){
            state.step_one = true;
            state.step_two = false;
        },
        changeStepTwo(state){
            state.step_one = false;
            state.step_two = true;
        }
    },
    actions: {
        GetDataFromApi({commit}){
            Vue.prototype.$axios.get('documents/read')
            .then(response =>{
                console.log(response)
                commit('GetdataToCoverModule',response.data);
            })
            .catch(error =>{
                console.log(error);
            })
            
        }
    }
}